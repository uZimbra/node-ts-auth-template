class ApiError {
  readonly message: string;

  readonly statusCode: number;

  constructor(message: string, status = 500) {
    this.message = message;
    this.statusCode = status;
  }
}

export default ApiError;
