import { Queue } from '../src';
import { EmptyQueueException } from '../src/exceptions/EmptyQueueException';

describe('Queue Test', () => {
  test('Queue Logic Test', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.enqueue(4);
    queue.enqueue(5);

    console.log(queue);
    expect(queue.size()).toBe(5);

    queue.enqueue(6);
    expect(queue.size()).toBe(6);

    expect(queue.dequeue()).toBe(1);
    expect(queue.size()).toBe(5);

    expect(queue.peek()).toBe(2);
    expect(queue.size()).toBe(5);

    expect(queue.dequeue()).toBe(2);
    expect(queue.size()).toBe(4);

    queue.clear();
    expect(queue.size()).toBe(0);

    expect(queue.isEmpty()).toBe(true);
    expect(queue.size()).toBe(0);

    expect(() => queue.dequeue()).toThrowError(EmptyQueueException);
  });
});

const LARGE_DATA_SIZE = 1_000_000;

describe('Queue Performance Comparison', () => {
  it('ArrayQueue performance', () => {
    console.time('ArrayQueue Enqueue Time');
    const arrayQueue: Array<number> = [];

    for (let i = 0; i < LARGE_DATA_SIZE; i++) {
      arrayQueue.push(i);
    }
    console.timeEnd('ArrayQueue Enqueue Time');

    console.time('ArrayQueue Dequeue Time');
    while (arrayQueue.length > 0) {
      arrayQueue.shift();
    }
    console.timeEnd('ArrayQueue Dequeue Time');
  });

  it('ElegantQueue performance', () => {
    console.time('ElegantQueue Enqueue Time');
    const elegantQueue = new Queue<number>();

    for (let i = 0; i < LARGE_DATA_SIZE; i++) {
      elegantQueue.enqueue(i);
    }

    console.timeEnd('ElegantQueue Enqueue Time');

    console.time('ElegantQueue Dequeue Time');
    while (elegantQueue.size() > 0) {
      elegantQueue.dequeue();
    }
    console.timeEnd('ElegantQueue Dequeue Time');
  });
});
