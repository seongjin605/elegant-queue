import { EmptyQueueException } from './exceptions/EmptyQueueException';

class Node<T> {
  data: (T | undefined)[];
  next: Node<T> | null = null;

  constructor(size: number) {
    this.data = new Array<T | undefined>(size);
  }
}

export class Queue<T> {
  private _head: Node<T> | null = null;
  private _tail: Node<T> | null = null;
  private _headIndex: number = 0;
  private _tailIndex: number = 0;
  private _arraySize: number;
  private _size: number = 0;


  constructor(initialDataOrSize?: T[] | number, arraySize: number = 4096) {
    // Handle overloaded constructor
    if (Array.isArray(initialDataOrSize)) {
      this._arraySize = arraySize;
      // Initialize with data
      initialDataOrSize.forEach(item => this.enqueue(item));
    } else if (typeof initialDataOrSize === 'number') {
      if (isNaN(initialDataOrSize) || initialDataOrSize <= 0) {
        throw new TypeError('arraySize must be a positive number.');
      }
      this._arraySize = initialDataOrSize;
    } else {
      this._arraySize = arraySize;
    }
  }

  /**
   * Adds a new item to the end of the queue.
   * @param value The value to be added to the queue.
   */
  enqueue(value: T): void {
    if (this._tail === null) {
      // First element, initialize the linked list
      this._tail = new Node<T>(this._arraySize);
      this._head = this._tail;
    } else if (this._tailIndex === this._arraySize) {
      // Last array is full, add a new node
      const newNode = new Node<T>(this._arraySize);
      this._tail.next = newNode;
      this._tail = newNode;
      this._tailIndex = 0;
    }

    this._tail.data[this._tailIndex++] = value;
    this._size++;
  }

  /**
   * Removes and returns the item at the front of the queue.
   * @throws EmptyQueueException - If the queue is empty.
   * @returns The item that was removed from the front of the queue.
   */
  dequeue(): T {
    if (this.isEmpty()) {
      throw new EmptyQueueException();
    }

    const value = this._head!.data[this._headIndex] as T;
    // Clear reference for better memory management
    this._head!.data[this._headIndex] = undefined;
    this._headIndex++;
    this._size--;

    // If the current array is empty, move to the next node
    if (this._headIndex === this._arraySize) {
      const oldHead = this._head;
      this._head = this._head!.next;
      this._headIndex = 0;

      // Clear reference to help GC
      oldHead!.next = null;

      // If we removed the last node, reset the tail as well
      if (this._head === null) {
        this._tail = null;
        this._tailIndex = 0;
      }
    }

    return value;
  }

  /**
   * Returns the item at the front of the queue without removing it.
   * @throws EmptyQueueException - If the queue is empty.
   * @returns The item at the front of the queue.
   */
  peek(): T {
    if (this.isEmpty()) {
      throw new EmptyQueueException();
    }
    return this._head!.data[this._headIndex] as T;
  }

  /**
   * Clears all items from the queue and resets its state.
   */
  clear(): void {
    // Help GC by clearing all references
    while (this._head !== null) {
      const next = this._head.next;
      this._head.next = null;
      this._head.data.fill(undefined);
      this._head = next;
    }

    this._head = null;
    this._tail = null;
    this._headIndex = 0;
    this._tailIndex = 0;
    this._size = 0;
  }

  /**
   * Returns the number of items currently in the queue.
   * @returns The number of items in the queue.
   */
  size(): number {
    return this._size;
  }

  /**
   * Checks if the queue is empty.
   * @returns `true` if the queue is empty, `false` otherwise.
   */
  isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Returns an iterator for the queue (from front to back).
   */
  *[Symbol.iterator](): Iterator<T> {
    let currentNode = this._head;
    let currentIndex = this._headIndex;
    let remainingItems = this._size;

    while (currentNode && remainingItems > 0) {
      const endIndex = currentNode === this._tail
        ? this._tailIndex
        : this._arraySize;

      while (currentIndex < endIndex && remainingItems > 0) {
        yield currentNode.data[currentIndex] as T;
        currentIndex++;
        remainingItems--;
      }

      currentNode = currentNode.next;
      currentIndex = 0;
    }
  }

  /**
   * Converts the queue to an array.
   * @returns Array representation of the queue.
   */
  toArray(): T[] {
    return Array.from(this);
  }
}