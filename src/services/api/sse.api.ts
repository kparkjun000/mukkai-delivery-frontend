import { SSEConnection, SSEMessage, SSEEventType } from "@/types/sse.types";

class SSEApi {
  private eventSource: EventSource | null = null;
  private listeners: Map<SSEEventType, Set<(data: any) => void>> = new Map();

  // SSE 연결 시작
  connect(userId?: number): Promise<SSEConnection> {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem("accessToken");
        // Swagger 문서에 따라 /api/sse/connect 엔드포인트 사용
        const url = new URL("/sse/api/sse/connect", window.location.origin);

        if (userId) {
          url.searchParams.append("userId", userId.toString());
        }

        // 토큰 없이는 SSE 연결하지 않음 (인증 필요한 엔드포인트)
        if (!token || token === "undefined" || token === "null") {
          console.info("SSE connection skipped: User not authenticated");
          resolve({
            eventSource: null,
            isConnected: false,
            error: new Error("Authentication required for SSE"),
          });
          return;
        }

        // 토큰을 URL 파라미터로 전달 (EventSource는 커스텀 헤더 지원 안함)
        // 백엔드에서 어떤 파라미터명을 기대하는지에 따라 여러 방식 시도
        url.searchParams.append("token", token);
        url.searchParams.append("access_token", token);

        console.log(
          "SSE connecting with authentication to:",
          url.toString().replace(new RegExp(token, "g"), "***TOKEN***")
        );

        this.eventSource = new EventSource(url.toString(), {
          withCredentials: true,
        });

        // 연결 성공
        this.eventSource.onopen = () => {
          console.log("SSE connection opened");
          resolve({
            eventSource: this.eventSource,
            isConnected: true,
          });
        };

        // 메시지 수신
        this.eventSource.onmessage = (event) => {
          try {
            const message: SSEMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error("Failed to parse SSE message:", error);
          }
        };

        // 에러 처리 - CORS 및 네트워크 오류를 우아하게 처리
        this.eventSource.onerror = (error) => {
          console.warn("SSE connection failed (CORS or network issue):", error);
          console.info(
            "Continuing without real-time updates - all app features remain functional"
          );

          // CORS 오류나 네트워크 오류 시 연결 실패로 처리하되 reject하지 않음
          this.disconnect();
          resolve({
            eventSource: null,
            isConnected: false,
            error,
          });
        };

        // 연결 타임아웃 설정
        setTimeout(() => {
          if (this.eventSource?.readyState === EventSource.CONNECTING) {
            console.warn(
              "SSE connection timeout - continuing without real-time updates"
            );
            this.disconnect();
            resolve({
              eventSource: null,
              isConnected: false,
              error: new Error("Connection timeout"),
            });
          }
        }, 3000); // 3초 타임아웃

        // 커스텀 이벤트 리스너들
        this.setupCustomEventListeners();
      } catch (error) {
        reject(error);
      }
    });
  }

  // SSE 연결 종료
  disconnect(): void {
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.listeners.clear();
      console.log("SSE connection closed");
    }
  }

  // 이벤트 리스너 등록
  addEventListener(
    eventType: SSEEventType,
    callback: (data: any) => void
  ): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    this.listeners.get(eventType)!.add(callback);
  }

  // 이벤트 리스너 제거
  removeEventListener(
    eventType: SSEEventType,
    callback: (data: any) => void
  ): void {
    const listeners = this.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }

  // 메시지 처리
  private handleMessage(message: SSEMessage): void {
    const listeners = this.listeners.get(message.type);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(message.payload);
        } catch (error) {
          console.error("Error in SSE event listener:", error);
        }
      });
    }
  }

  // 커스텀 이벤트 리스너 설정
  private setupCustomEventListeners(): void {
    if (!this.eventSource) return;

    // 주문 상태 업데이트
    this.eventSource.addEventListener("order-status-update", (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage({
        type: "order-status-update",
        payload: data,
        timestamp: new Date().toISOString(),
      });
    });

    // 새 주문 알림
    this.eventSource.addEventListener("new-order", (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage({
        type: "new-order",
        payload: data,
        timestamp: new Date().toISOString(),
      });
    });

    // 배달 상태 업데이트
    this.eventSource.addEventListener("delivery-update", (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage({
        type: "delivery-update",
        payload: data,
        timestamp: new Date().toISOString(),
      });
    });

    // 프로모션 알림
    this.eventSource.addEventListener("promotion", (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage({
        type: "promotion",
        payload: data,
        timestamp: new Date().toISOString(),
      });
    });

    // 시스템 메시지
    this.eventSource.addEventListener("system-message", (event) => {
      const data = JSON.parse(event.data);
      this.handleMessage({
        type: "system-message",
        payload: data,
        timestamp: new Date().toISOString(),
      });
    });
  }

  // 에러 복구를 위한 재연결
  async reconnect(userId?: number, maxRetries: number = 3): Promise<void> {
    let retryCount = 0;

    while (retryCount < maxRetries) {
      try {
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * Math.pow(2, retryCount))
        ); // 지수 백오프
        await this.connect(userId);
        console.log("SSE reconnected successfully");
        break;
      } catch (error) {
        retryCount++;
        console.error(`SSE reconnection attempt ${retryCount} failed:`, error);

        if (retryCount >= maxRetries) {
          throw new Error("Failed to reconnect after maximum retries");
        }
      }
    }
  }

  // 헬스체크 (선택적 구현)
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch("/api/sse/componentDidCatch", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.ok;
    } catch (error) {
      console.error("SSE health check failed:", error);
      return false;
    }
  }
}

export const sseApi = new SSEApi();
