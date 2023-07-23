export class MessageDto {
  message: string;
  constructor(message: string) {
    this.message = message;
  }
}
export class PostMessageDto {
  id: number;
  message: string;
  constructor(id: number, message: string) {
    this.id = id;
    this.message = message;
  }
}
