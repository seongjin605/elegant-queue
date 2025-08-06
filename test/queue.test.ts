import { Queue } from '../src';
import { EmptyQueueException } from '../src/exceptions/EmptyQueueException';
import { describe, test, expect, it } from '@jest/globals';

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


describe('Queue Performance Test', () => {
  test('Queue Performance Test', () => {
    const queue1 = new Queue<number>();
    queue1.enqueue(1);
    queue1.enqueue(2);
    expect(queue1.dequeue()).toBe(1);

    const queue2 = new Queue<string>(1024); // Buffer size of 1024
    queue2.enqueue('hello');
    queue2.enqueue('world');
    expect(queue2.size()).toBe(2);

    const queue3 = new Queue([1, 2, 3, 4, 5], 1024);
    queue3.enqueue(6); // [1, 2, 3, 4, 5, 6]
    const item = queue3.dequeue();
    expect(item).toBe(1);
    expect(queue3.size()).toBe(5);

    const queue4 = new Queue(['a', 'b', 'c'], 512); // Data + buffer size of 512
    expect(queue4.size()).toBe(3);
  });
});

describe('Queue Performance Test', () => {
  test('Queue Performance Test', () => {
    interface Task {
      id: number;
      name: string;
      priority: number;
    }

    const taskQueue = new Queue<Task>();
    taskQueue.enqueue({ id: 1, name: 'Process data', priority: 1 });
    taskQueue.enqueue({ id: 2, name: 'Send email', priority: 2 });

    for (const task of taskQueue) {
      expect(task.name).toBeDefined();
      expect(task.priority).toBeDefined();
    }

    const allTasks = taskQueue.toArray();
    expect(allTasks.length).toBe(2);

    taskQueue.clear();
    expect(taskQueue.isEmpty()).toBe(true);
  });
});

// const LARGE_DATA_SIZE = 1_000_000;

// describe('Queue Performance Comparison', () => {
//   it('ArrayQueue performance', () => {
//     console.time('ArrayQueue Enqueue Time');
//     const arrayQueue: Array<number> = [];

//     for (let i = 0; i < LARGE_DATA_SIZE; i++) {
//       arrayQueue.push(i);
//     }
//     console.timeEnd('ArrayQueue Enqueue Time');

//     console.time('ArrayQueue Dequeue Time');
//     while (arrayQueue.length > 0) {
//       arrayQueue.shift();
//     }
//     console.timeEnd('ArrayQueue Dequeue Time');
//   });

//   it('ElegantQueue performance', () => {
//     console.time('ElegantQueue Enqueue Time');
//     const elegantQueue = new Queue<number>();

//     for (let i = 0; i < LARGE_DATA_SIZE; i++) {
//       elegantQueue.enqueue(i);
//     }

//     console.timeEnd('ElegantQueue Enqueue Time');

//     console.time('ElegantQueue Dequeue Time');
//     while (elegantQueue.size() > 0) {
//       elegantQueue.dequeue();
//     }
//     console.timeEnd('ElegantQueue Dequeue Time');
//   });
// });
