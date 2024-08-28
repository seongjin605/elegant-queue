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
const { Queue } = require("elegant-queue");
```

### ES Modules

```javascript
import { Queue } from "elegant-queue";
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

### Usage Example  
```typescript
import { Queue } from "elegant-queue";

const queue = new Queue([1, 2, 3, 4, 5]);
queue.enqueue(6); // [1, 2, 3, 4, 5, 6]

const item = queue.dequeue();
console.log(item); // 1 

console.log(queue); // [2, 3, 4, 5, 6]
```

### Exception Handling Example  
```typescript
import { Queue, EmptyQueueException } from "elegant-queue";

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
const numbers: Array<number> = [];

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
const numbers = new Array<number>();

for (let i = 0; i < LARGE_DATA_SIZE; i++) {
    numbers.push(i);
}

const elegantQueue = new Queue(numbers);
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