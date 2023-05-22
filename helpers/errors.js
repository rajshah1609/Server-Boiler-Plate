class CustomError extends Error {
  /**
   * Will return an array of error [{ message:string;field?:string }]
   */
  sequeslizeError() {
    throw new Error("implement sequelize error");
  }
}

class ServerError extends CustomError {
  constructor() {
    this.statusCode = 500;
    this.message = "server error";
  }

  sequeslizeError() {
    return [{ message: this.message }];
  }
}

class RequestValidationError extends CustomError {
  constructor(_errors) {
    super("Invalid request parameters");
    this.statusCode = 400;
    this.errors = _errors;
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}

class UnauthorizationError extends CustomError {
  constructor() {
    super("unauthorized access");
    this.statusCode = 400;
    this.message = "unauthorized access";
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return [{ message: this.message }];
    });
  }
}

class RateLimitError extends CustomError {
  constructor() {
    super("ratelimit error");
    this.statusCode = 429;
    this.message = "too many requests";
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return [{ message: this.message }];
    });
  }
}

/**
 * Export the classes as per their class name
 */

exports.RateLimitError = RateLimitError;
exports.UnauthorizationError = UnauthorizationError;
exports.CustomError = CustomError;
exports.ServerError = ServerError;
exports.RequestValidationError = RequestValidationError;
