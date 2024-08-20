export abstract class BaseException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BaseException';
  }
}
