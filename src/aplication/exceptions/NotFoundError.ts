export class NotFoundError extends Error {
    constructor(message: string, public statusCode = 404) {
      super(message);
    }
  
    toJSON() {
      return {
        message: this.message,
        statusCode: this.statusCode,
      };
    }
  }
  