# elegant-queue

<p align="center">
    <a href="https://img.shields.io/npm/v/elegant-queue?logo=nodedotjs" target="_blank"><img src="https://img.shields.io/npm/v/elegant-queue?logo=npm" alt="NPM Version" /></a>
    <a href="https://img.shields.io/npm/l/elegant-queue" target="_blank"><img src="https://img.shields.io/npm/l/elegant-queue" alt="Package License" /></a>
    <a href="https://img.shields.io/npm/dm/elegant-queue" target="_blank"><img src="https://img.shields.io/npm/dm/elegant-queue" alt="NPM Downloads" /></a>
    <a href="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" target="_blank"><img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" alt="JavaScript" /></a>
    <a href="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" target="_blank"><img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="TypeScript" /></a>
</p>

## Overview

In JavaScript and TypeScript, arrays are often used to implement queues. The built-in `shift()` method removes the element at the zeroth index and shifts the remaining elements down, which has O(n) time complexity due to the re-indexing required.

### Why Circular Buffers?

To optimize queue operations, especially with large datasets, a circular buffer is a highly effective solution. It allows both `enqueue` and `dequeue` operations to be performed in O(1) time complexity by managing elements in a fixed-size array with wrapping pointers.

**Key Benefits:**

- **Memory Efficiency:** A circular buffer uses a fixed-size array and wraps around, eliminating the need for continuous resizing and minimizing memory overhead.
- **Consistent O(1) Performance:** Operations remain constant time, avoiding the performance pitfalls of array resizing and shifting.
- **Avoids Memory Fragmentation:** Efficient memory use and reduced risk of fragmentation, even with dynamic queue sizes.

## 📚 Getting Started

`elegant-queue` supports both CommonJS and ES Modules.

### CommonJS

```javascript
const { Queue } = require('elegant-queue');
```

### ES Modules

```javascript
import { Queue } from 'elegant-queue';
```

## 🔎 Explore features

### `constructor(arraySize: number)`

`arraySize: number` (optional): This parameter defines the size of each internal array block within the linked nodes of the queue. It specifies how many elements each node in the queue can hold. By default, this value is set to 4096 if no argument is provided.

### `enqueue(value: T)`

This method adds a new element to the end of the queue.

### `dequeue()`

This method removes and returns the element at the front of the queue. If the queue is empty, it throws a `EmptyQueueException`.

### `peek()`

This method returns the element at the front of the queue without removing it. If the queue is empty, it throws a `EmptyQueueException`.

### `clear()`

This method clears all elements from the queue.(effectively resetting the queue to its initial state.)

### `size()`

This method returns the number of elements currently in the queue.

### `isEmpty()`

This method checks if the queue is empty. It returns `true` if `_head` is equal to `_tail` (indicating no elements are present), and `false` otherwise.

## 🌈 Examples

### Basic Usage Examples

```typescript
import { Queue } from 'elegant-queue';

// 1. Create an empty queue with default buffer size (4096)
const queue1 = new Queue<number>();
queue1.enqueue(1);
queue1.enqueue(2);
console.log(queue1.dequeue()); // 1

// 2. Create an empty queue with custom buffer size
const queue2 = new Queue<string>(1024); // Buffer size of 1024
queue2.enqueue('hello');
queue2.enqueue('world');
console.log(queue2.peek()); // 'hello'

// 3. Initialize queue with data (using default buffer size)
const queue3 = new Queue([1, 2, 3, 4, 5]);
queue3.enqueue(6); // [1, 2, 3, 4, 5, 6]
const item = queue3.dequeue();
console.log(item); // 1
console.log(queue3.toArray()); // [2, 3, 4, 5, 6]

// 4. Initialize queue with data and custom buffer size
const queue4 = new Queue(['a', 'b', 'c'], 512); // Data + buffer size of 512
console.log(queue4.size()); // 3
```

### Advanced Usage Examples

```typescript
import { Queue } from 'elegant-queue';

// Working with objects
interface Task {
  id: number;
  name: string;
  priority: number;
}

const taskQueue = new Queue<Task>();
taskQueue.enqueue({ id: 1, name: 'Process data', priority: 1 });
taskQueue.enqueue({ id: 2, name: 'Send email', priority: 2 });

// Iterating through queue without removing elements
for (const task of taskQueue) {
  console.log(`Task: ${task.name}, Priority: ${task.priority}`);
}

// Converting to array for processing
const allTasks = taskQueue.toArray();
console.log(`Total tasks: ${allTasks.length}`);

// Clear all tasks
taskQueue.clear();
console.log(taskQueue.isEmpty()); // true
```

### Exception Handling Example

```typescript
import { Queue, EmptyQueueException } from 'elegant-queue';

try {
  const item = queue.dequeue(); // Attempt to remove the item from the queue.
  console.log('Dequeued item:', item);
} catch (error) {
  if (error instanceof EmptyQueueException) {
    console.error('Queue is empty. Cannot dequeue an item.');
  } else {
    console.error('An unexpected error occurred:', error);
  }
}
```

## ⚡️ Performance (1 million numbers)

The following benchmarks compare elegant-queue with a standard array-based queue.

### Array Queue performance:

```typescript
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
```

### Array Queue performance result:

```bash
  console.time
    ArrayQueue Dequeue Time: 109907 ms
```

### Elegant Queue performance:

```typescript
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
```

### Elegant Queue performance result:

```bash
  console.time
    ElegantQueue Dequeue Time: 5 ms
```

**Note:** The `shift()` method in arrays has O(n) time complexity due to the need to re-index elements after removal. In contrast, `elegant-queue` provides O(1) time complexity for both enqueue and dequeue operations by utilizing a circular buffer design, making it significantly faster for large datasets.

## ⚠️ Performance Considerations & Alternatives

### There is No Silver Bullet

While `elegant-queue` provides excellent performance for many use cases, **there is no silver bullet in software engineering**. Before adopting this library in production, consider the following:

### Evaluate Alternatives

Before settling on `elegant-queue`, thoroughly research and evaluate other queue implementations:

- **Native JavaScript solutions**: For simple use cases, native arrays might be sufficient
- **Other npm packages**: Libraries like `denque`, `double-ended-queue`, or `yallist` may better suit your specific needs
- **Built-in data structures**: Modern JavaScript engines are highly optimized; simple solutions often perform surprisingly well

### Buffer Size Optimization

The default buffer size of **4096** is optimized for high-throughput scenarios, but it may not be optimal for your specific use case:

#### Benchmark Different Buffer Sizes

```typescript
// Test different buffer sizes for your specific use case
const smallQueue = new Queue<YourDataType>(256); // Memory-efficient
const mediumQueue = new Queue<YourDataType>(1024); // Balanced approach
const largeQueue = new Queue<YourDataType>(4096); // High-performance (default)
const xlQueue = new Queue<YourDataType>(8192); // Maximum throughput

// Benchmark with your actual data and usage patterns
console.time('Small Buffer Performance');
// ... your test code
console.timeEnd('Small Buffer Performance');
```

#### Buffer Size Guidelines

- **Small buffers (64-512)**: Better for memory-constrained environments, small queues
- **Medium buffers (1024-2048)**: Good balance for most applications
- **Large buffers (4096+)**: Optimal for high-throughput, batch processing scenarios

#### When to Use Smaller/Larger Buffers

**Consider smaller buffers when:**

- Memory usage is a critical concern
- Queue typically holds fewer than 1000 items
- Running in memory-constrained environments (mobile, IoT)

**Consider larger buffers when:**

- Processing millions of items
- Memory is abundant
- Maximum throughput is the primary concern

### Performance Testing Recommendations

1. **Benchmark with real data**: Test with your actual data types and sizes
2. **Test realistic scenarios**: Use patterns that match your production workload
3. **Measure memory usage**: Monitor both allocated memory and garbage collection pressure
4. **Compare alternatives**: Always benchmark against other solutions
5. **Profile in production-like environments**: Development and production performance can differ significantly

Remember: **measure, don't assume**. The best solution depends entirely on your specific use case, data patterns, and performance requirements.
