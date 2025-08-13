import { OrderResponse } from "@/types/order.types";

interface RabbitMQMessage {
  type: "NEW_ORDER" | "ORDER_STATUS_UPDATE" | "ORDER_CANCELLED";
  orderId: number;
  storeId: number;
  data: any;
  timestamp: string;
}

interface RabbitMQConnection {
  websocket: WebSocket | null;
  isConnected: boolean;
  listeners: Map<string, Set<(data: any) => void>>;
}

class RabbitMQApi {
  private connection: RabbitMQConnection = {
    websocket: null,
    isConnected: false,
    listeners: new Map(),
  };

  // WebSocket 연결 (RabbitMQ 서버 localhost:8081)
  connect(storeId?: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        const token = localStorage.getItem("storeUserAccessToken");
        let wsUrl = "ws://localhost:8081/ws/orders";

        if (storeId) {
          wsUrl += `?storeId=${storeId}`;
        }

        if (token) {
          wsUrl += storeId ? `&token=${token}` : `?token=${token}`;
        }

        this.connection.websocket = new WebSocket(wsUrl);

        this.connection.websocket.onopen = () => {
          console.log("RabbitMQ WebSocket 연결 성공");
          this.connection.isConnected = true;
          resolve(true);
        };

        this.connection.websocket.onmessage = (event) => {
          try {
            const message: RabbitMQMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error("RabbitMQ 메시지 파싱 실패:", error);
          }
        };

        this.connection.websocket.onerror = (error) => {
          console.error("RabbitMQ WebSocket 오류:", error);
          this.connection.isConnected = false;
          reject(error);
        };

        this.connection.websocket.onclose = () => {
          console.log("RabbitMQ WebSocket 연결 종료");
          this.connection.isConnected = false;

          // 자동 재연결 (5초 후)
          setTimeout(() => {
            if (!this.connection.isConnected) {
              console.log("RabbitMQ WebSocket 자동 재연결 시도...");
              this.connect(storeId);
            }
          }, 5000);
        };
      } catch (error) {
        console.error("RabbitMQ WebSocket 연결 실패:", error);
        reject(error);
      }
    });
  }

  // WebSocket 연결 종료
  disconnect(): void {
    if (this.connection.websocket) {
      this.connection.websocket.close();
      this.connection.websocket = null;
      this.connection.isConnected = false;
    }
  }

  // 메시지 처리
  private handleMessage(message: RabbitMQMessage): void {
    console.log("RabbitMQ 메시지 수신:", message);

    // 메시지 타입별 리스너 호출
    const listeners = this.connection.listeners.get(message.type);
    if (listeners) {
      listeners.forEach((callback) => {
        try {
          callback(message);
        } catch (error) {
          console.error("RabbitMQ 리스너 콜백 오류:", error);
        }
      });
    }

    // 전체 메시지 리스너 호출
    const allListeners = this.connection.listeners.get("ALL");
    if (allListeners) {
      allListeners.forEach((callback) => {
        try {
          callback(message);
        } catch (error) {
          console.error("RabbitMQ 전체 리스너 콜백 오류:", error);
        }
      });
    }
  }

  // 이벤트 리스너 등록
  addEventListener(eventType: string, callback: (data: any) => void): void {
    if (!this.connection.listeners.has(eventType)) {
      this.connection.listeners.set(eventType, new Set());
    }
    this.connection.listeners.get(eventType)!.add(callback);
  }

  // 이벤트 리스너 제거
  removeEventListener(eventType: string, callback: (data: any) => void): void {
    const listeners = this.connection.listeners.get(eventType);
    if (listeners) {
      listeners.delete(callback);
    }
  }

  // 연결 상태 확인
  isConnected(): boolean {
    return this.connection.isConnected;
  }

  // 메시지 전송 (주문 상태 업데이트 등)
  sendMessage(message: any): void {
    if (this.connection.websocket && this.connection.isConnected) {
      this.connection.websocket.send(JSON.stringify(message));
    } else {
      console.warn("RabbitMQ WebSocket이 연결되지 않았습니다.");
    }
  }
}

export const rabbitmqApi = new RabbitMQApi();
