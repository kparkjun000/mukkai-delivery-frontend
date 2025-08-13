import { useEffect, useState, useCallback, useRef } from "react";
import { sseApi } from "@/services/api";
import { SSEConnection, SSEEventType } from "@/types/sse.types";

interface UseSSEOptions {
  userId?: number;
  autoConnect?: boolean;
  autoReconnect?: boolean;
  maxRetries?: number;
}

interface UseSSEReturn {
  isConnected: boolean;
  error: Event | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  addEventListener: (
    eventType: SSEEventType,
    callback: (data: any) => void
  ) => void;
  removeEventListener: (
    eventType: SSEEventType,
    callback: (data: any) => void
  ) => void;
}

export function useSSE(options: UseSSEOptions = {}): UseSSEReturn {
  const {
    userId,
    autoConnect = true,
    autoReconnect = true,
    maxRetries = 3,
  } = options;

  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef(0);

  const connect = useCallback(async () => {
    try {
      setError(null);

      // 로그인 상태 확인
      const token = localStorage.getItem("accessToken");
      if (!token || token === "undefined" || token === "null") {
        console.info("SSE connection not attempted: User not logged in");
        setIsConnected(false);
        setError(new Error("Login required for real-time updates"));
        return;
      }

      console.log("Attempting SSE connection with authentication...");
      const connection: SSEConnection = await sseApi.connect(userId);

      // 연결 성공 여부에 관계없이 결과 처리
      setIsConnected(connection.isConnected);

      if (connection.isConnected) {
        console.log("SSE connection successful");
        retryCountRef.current = 0; // 성공 시 재시도 카운트 리셋
      } else {
        console.warn(
          "SSE connection failed, continuing without real-time updates"
        );
        setError(connection.error || null);

        // CORS 오류는 재연결하지 않음 (설정 문제이므로)
        const errorMessage = connection.error?.toString() || "";
        const isCorsError =
          errorMessage.includes("CORS") ||
          errorMessage.includes("Access-Control");

        if (isCorsError) {
          console.info("CORS error detected - skipping reconnection attempts");
          console.info(
            "SSE disabled due to CORS - continuing without real-time updates"
          );
        } else if (autoReconnect && retryCountRef.current < maxRetries) {
          retryCountRef.current++;
          const delay = Math.min(
            1000 * Math.pow(2, retryCountRef.current - 1),
            30000
          ); // 최대 30초

          reconnectTimeoutRef.current = setTimeout(() => {
            console.log(
              `SSE 재연결 시도 ${retryCountRef.current}/${maxRetries}`
            );
            connect();
          }, delay);
        } else {
          console.info(
            "SSE max retries reached - continuing without real-time updates"
          );
        }
      }
    } catch (err: any) {
      console.error("SSE connection error:", err);
      setError(err.error || err);
      setIsConnected(false);

      // 예상치 못한 에러 시 재연결 시도
      if (autoReconnect && retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        const delay = Math.min(
          1000 * Math.pow(2, retryCountRef.current - 1),
          30000
        );

        reconnectTimeoutRef.current = setTimeout(() => {
          console.log(`SSE 재연결 시도 ${retryCountRef.current}/${maxRetries}`);
          connect();
        }, delay);
      }
    }
  }, [userId, autoReconnect, maxRetries]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    sseApi.disconnect();
    setIsConnected(false);
    setError(null);
    retryCountRef.current = 0;
  }, []);

  const addEventListener = useCallback(
    (eventType: SSEEventType, callback: (data: any) => void) => {
      sseApi.addEventListener(eventType, callback);
    },
    []
  );

  const removeEventListener = useCallback(
    (eventType: SSEEventType, callback: (data: any) => void) => {
      sseApi.removeEventListener(eventType, callback);
    },
    []
  );

  // 컴포넌트 마운트 시 자동 연결
  useEffect(() => {
    if (autoConnect) {
      connect();
    }

    // 페이지 가시성 변경 시 재연결 처리
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // 페이지가 숨겨질 때는 연결 유지
        return;
      } else {
        // 페이지가 다시 보일 때 연결 상태 확인
        if (!sseApi.isConnected() && autoReconnect) {
          connect();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 온라인/오프라인 상태 변경 시 재연결 처리
    const handleOnline = () => {
      if (autoReconnect && !sseApi.isConnected()) {
        connect();
      }
    };

    const handleOffline = () => {
      setIsConnected(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [connect, disconnect, autoConnect, autoReconnect]);

  return {
    isConnected,
    error,
    connect,
    disconnect,
    addEventListener,
    removeEventListener,
  };
}
