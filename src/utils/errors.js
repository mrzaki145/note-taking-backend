export class AppError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export class AuthError extends AppError {
  constructor(message) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
  }
}
