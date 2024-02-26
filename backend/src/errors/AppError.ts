export class AppError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(messase: string, statusCode: 400) {
    this.message = messase;
    this.statusCode = statusCode;

  }
}