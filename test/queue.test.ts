
import { Queue } from "../src";
import { QueueEmptyException } from "../src/exceptions/QueueEmptyException";

test('Queue Test', () => {
    const queue = new Queue([1, 2, 3, 4, 5]);
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

    expect(() => queue.dequeue()).toThrowError(QueueEmptyException);
});
  