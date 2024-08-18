# efficient-queue

In general, to use a Queue using JS or TS, it may be more common or simpler to use an Array.

Let's take a look at the [Description](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift#return_value) of the `shift()` function as described by MSDN  
"The shift() method removes the element at the zeroth index and shifts the values at consecutive indexes down, then returns the removed value. If the length property is 0, undefined is returned."

As you can see, using a queue with O(N) time complexity or using `shift()` to get the first value in an array has O(N) time complexity.  
To address this inefficiency when processing large amounts of data, designing a queue with O(1) time complexity can solve many problems.  


## 📚 Getting Started

`efficient-queue` supports both CommonJS and ES Modules.

### CommonJS

```javascript
const { Queue } = require("efficient-queue");
```

### ES Modules

```javascript
import { Queue } from "efficient-queue";
```

## 🔎 Explore features

### `constructor(array: T[])`

The constructor initializes a new queue with the elements from the provided `array`. 


### `enqueue(value: T)`

This method adds a new element to the end of the queue.

### `dequeue()`

This method removes and returns the element at the front of the queue. If the queue is empty, it throws a `QueueEmptyException`.

### `peek()`

This method returns the element at the front of the queue without removing it. If the queue is empty, it throws a `QueueEmptyException`.  


### `clear()`

This method clears all elements from the queue.(effectively resetting the queue to its initial state.)

### `size()`

This method returns the number of elements currently in the queue. 

### `isEmpty()`

This method checks if the queue is empty. It returns `true` if `_head` is equal to `_tail` (indicating no elements are present), and `false` otherwise.  


## 🌈 Examples

### Use Case
```typescript
import { Queue } from "efficient-queue";

const queue = new Queue([1, 2, 3, 4, 5]);
queue.enqueue(6); // [1, 2, 3, 4, 5, 6]

const item = queue.dequeue();
console.log(item); // 1 

console.log(queue); // [2, 3, 4, 5, 6]
```

### Exception Case
```typescript
try {
    const item = queue.dequeue(); // Attempt to remove the item from the queue.
    console.log('Dequeued item:', item);
} catch (error) {
    if (error instanceof QueueEmptyException) {
        console.error('Queue is empty. Cannot dequeue an item.');
    } else {
        console.error('An unexpected error occurred:', error);
    }
}
```