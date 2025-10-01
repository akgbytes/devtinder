export class ApiError<T = unknown> extends Error {
  public readonly success: boolean = false;

  constructor(
    public readonly statusCode: number,
    messsage: string,
    public readonly data: T | null = null
  ) {
    super(messsage);

    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}
