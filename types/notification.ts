type NotificationType = "success" | "danger";

interface Notification {
  message: string;
  type: NotificationType;
}

export type { Notification, NotificationType };
