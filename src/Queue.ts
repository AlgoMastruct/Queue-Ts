/**
 * A generic circular queue implementation with a fixed capacity
 * Supports basic queue operations such as enqueue dequeue peek and clear
 * @template T The type of elements stored in the queue defaults to number
 */
export default class Queue<T = number> {
  /**
   * This is an array that holds the queue elements. It has a fixed size based on the given capacity. It starts filled with null values and gets updated when elements are added or removed.
   */
  private array: (T | null)[];
  /**
   * This represents the index of the front element in the queue. It starts at 0 and increases when elements are dequeued. Since the queue is circular, when it reaches the last index, it wraps around to 0 using the modulus operation.
   */
  private front: number = 0;
  /**
   * This represents the index of the last inserted element. It starts at -1 because the queue is initially empty. It increases when elements are enqueued and wraps around to 0 when it reaches the last index due to the circular nature of the queue.
   */
  private rear: number = -1;
  /**
   * This tracks the number of elements currently in the queue. It starts at 0, increases when elements are enqueued, and decreases when elements are dequeued. It ensures that enqueue and dequeue operations do not exceed the queue’s capacity or go below zero.
   */
  private arraySize: number = 0;
  constructor(
    private capacity: number,
  ) /** This is the maximum number of elements the queue can hold.
   * It is set during initialization and does not change. It is used to determine when the queue is full to prevent additional elements from being enqueued.
   * */ {
    if (capacity <= 0)
      throw new Error('Queue capacity must be greater than zero.');
    this.array = new Array<T | null>(capacity).fill(null);
  }
  isEmpty(): boolean {
    return this.size === 0;
  }
  isFull(): boolean {
    return this.size === this.capacity;
  }
  enqueue(value: T): boolean {
    if (this.isFull()) {
      throw new Error('Queue is full. Cannot enqueue.');
    }
    this.rear = (this.rear + 1) % this.capacity;
    this.array[this.rear] = value;
    this.arraySize++;
    return true;
  }

  dequeue(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty. Cannot dequeue.');
    }
    const removedValue = this.array[this.front] as T;
    this.array[this.front] = null;
    this.front = (this.front + 1) % this.capacity;
    this.arraySize--;
    return removedValue;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('Queue is empty. Cannot peek.');
    }
    return this.array[this.front] as T;
  }

  get size(): number {
    return this.size;
  }

  clear(): void {
    this.array.fill(null);
    this.front = 0;
    this.rear = -1;
    this.arraySize = 0;
  }

  display(): void {
    console.log('Queue State:');
    console.log('-------------------');
    console.log(`Capacity : ${this.capacity}`);
    console.log(`Size     : ${this.size}`);
    console.log(`Is Full  : ${this.isFull()}`);
    console.log(`Is Empty : ${this.isEmpty()}`);
    console.log(`Front    : ${this.front}`);
    console.log(`Rear     : ${this.rear}`);

    const queueView = this.array.map((el, idx) => {
      let marker = '';
      if (idx === this.front) marker += 'F';
      if (idx === this.rear) marker += 'R';
      return `[${marker}] ${el ?? 'null'}`;
    });

    console.log('Queue Data:');
    console.log(queueView.join(' | '));
    console.log('-------------------');
  }
}
