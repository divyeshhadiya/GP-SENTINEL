export class ApiError extends Error {
  statusCode: number;
  details?: any;

  constructor(message: string, statusCode = 500, details?: any) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class BadRequestError extends ApiError {
  constructor(message = "Bad Request", details?: any) {
    super(message, 400, details);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = "Unauthorized - Valid police credentials required", details?: any) {
    super(message, 401, details);
    this.name = "UnauthorizedError";
  }
}

export class NotFoundError extends ApiError {
  constructor(message = "Resource not found", details?: any) {
    super(message, 404, details);
    this.name = "NotFoundError";
  }
}
