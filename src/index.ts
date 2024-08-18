import { QueueEmptyException } from "./exceptions/QueueEmptyException";

export class Queue<T>{
    private _data: (T | undefined)[];
    private _head: number;
    private _tail: number;

    /**
     * Initializes a new instance of the Queue class with the given array.
     * @param array 
     */
    constructor(array: T[]) {
        this._data = array;
        this._head = 0; 
        this._tail = array.length; 
    }
  
    /**
     * Adds a new item to the end of the queue.
     * @param value 
     */
    enqueue(value: T) {
        this._data[this._tail] = value;
        this._tail++;
    }
  
    /**
     * Removes and returns the item at the front of the queue.
     * @throws QueueEmptyException - If the queue is empty.
     * @returns The item that was removed from the front of the queue.
     */
    dequeue() {
        if (this.isEmpty()) {
            throw new QueueEmptyException();
        }
  
        const value = this._data[this._head];
        this._data[this._head] = undefined; 
        this._head++;
        return value;
    }

    /**
     * Returns the item at the front of the queue without removing it.
     * @throws QueueEmptyException - If the queue is empty.
     * @returns The item at the front of the queue.
     */
    peek() {
        if (this.isEmpty()) {
            throw new QueueEmptyException();
        }
        return this._data[this._head];
    }

    /**
     * Clears all items from the queue and resets its state.
     */
    clear() {
        this._data = [];
        this._head = 0;
        this._tail = 0;
    }

    /**
     * Returns the number of items currently in the queue.
     * @returns The number of items in the queue.
     */
    size() {
        return this._tail - this._head;
    }

    /**
     * Checks if the queue is empty.
     * @returns `true` if the queue is empty, `false` otherwise.
     */
    isEmpty() {
        return this._head === this._tail;
    }
  }
  
  