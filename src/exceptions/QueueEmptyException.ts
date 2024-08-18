import { BaseException } from "./BaseException";

export class QueueEmptyException extends BaseException {
    constructor() {
        super("Queue is empty");
        this.name = "QueueEmptyException";
    }
  }