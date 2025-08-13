// SSE (Server-Sent Events) 관련 타입들

export interface SSEEvent {
  id?: string;
  event?: string;
  data: string;
  retry?: number;
}

export interface OrderStatusUpdate {
  orderId: number;
  status: string;
  message: string;
  timestamp: string;
}

export interface SSEConnection {
  eventSource: EventSource | null;
  isConnected: boolean;
  lastEvent?: SSEEvent;
  error?: Event;
}

export type SSEEventType =
  | "order-status-update"
  | "new-order"
  | "delivery-update"
  | "promotion"
  | "system-message";

export interface SSEMessage {
  type: SSEEventType;
  payload: any;
  timestamp: string;
}
