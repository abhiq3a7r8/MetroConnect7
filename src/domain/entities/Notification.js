export class NotificationEntity {
  constructor(message, type = "info", duration = 3000) {
    this.message = message;
    this.type = type;
    this.duration = duration;
  }
}
