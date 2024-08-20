import { BaseException } from './BaseException';

export class EmptyQueueException extends BaseException {
  constructor() {
    super('Queue is empty');
    this.name = 'EmptyQueueException';
  }
}
