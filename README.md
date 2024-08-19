# elegant-queue

<p align="center">
    <a href="https://img.shields.io/npm/v/elegant-queue?logo=nodedotjs" target="_blank"><img src="https://img.shields.io/npm/v/elegant-queue?logo=npm" alt="NPM Version" /></a>
    <a href="https://img.shields.io/npm/l/elegant-queue" target="_blank"><img src="https://img.shields.io/npm/l/elegant-queue" alt="Package License" /></a>
    <a href="https://img.shields.io/npm/dm/elegant-queue" target="_blank"><img src="https://img.shields.io/npm/dm/elegant-queue" alt="NPM Downloads" /></a>
    <a href="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" target="_blank"><img src="https://shields.io/badge/JavaScript-F7DF1E?logo=JavaScript&logoColor=000&style=flat-square" alt="Javascript" /></a>
    <a href="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" target="_blank"><img src="https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=flat-square" alt="Javascript" /></a>
    <!--<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/seongjin605/elegant-queue/main" alt="CircleCI" /></a>-->
</p>

In general, to use a Queue using JS or TS, it may be more common or simpler to use an Array.

Let's take a look at the [Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift#return_value) of the `shift()` function as described by MSDN  
"The shift() method removes the element at the zeroth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned."

As you can see, using a queue with O(N) time complexity or using `shift()` to get the first value in an array has O(N) time complexity.  
To address this inefficiency when processing large amounts of data, designing a queue with O(1) time complexity can solve many problems.  


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

### `constructor(array: T[])`

The constructor initializes a new queue with the elements from the provided `array`. 


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

### Use Example
```typescript
import { Queue } from "elegant-queue";

const queue = new Queue([1, 2, 3, 4, 5]);
queue.enqueue(6); // [1, 2, 3, 4, 5, 6]

const item = queue.dequeue();
console.log(item); // 1 

console.log(queue); // [2, 3, 4, 5, 6]
```

### Exception Example
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
The test results below were written on my local PC, so your performance results may vary.  
But I can assure you that `dequeue()` in **Elegant Queue** is definitely faster on large amounts of data than using `shift()` in the **built-in array**.  

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