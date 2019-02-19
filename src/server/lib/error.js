class BadRequestError extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Sorry, your request cannot be handdled';
  }
}

class NotFoundError extends Error {
  constructor() {
    super();
    this.status = 404;
    this.message = 'Sorry, the page you tried cannot be found.';
  }
}

class InternalServiceError extends Error {
  constructor() {
    super();
    this.status = 500;
    this.message = 'Sorry, there was an error. Please try again later.';
  }
}

exports.modules = {
  BadRequestError,
  NotFoundError,
  InternalServiceError
};
