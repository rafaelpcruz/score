export class HttpError extends Error {
    constructor(public message: string, public statusCode: number) {
      super(message);
    }
  
    toJSON() {
      return {
        message: this.message,
        statusCode: this.statusCode,
      };
    }
  }
  