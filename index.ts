import Queue from './src/Queue';

const queue = new Queue<number>(5);

queue.display();

console.log('\nEnqueuing elements: 10, 20, 30, 40, 50');
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
queue.enqueue(40);
queue.enqueue(50);
queue.display();

try {
  console.log('\nAttempting to enqueue 60 (should fail)...');
  queue.enqueue(60);
} catch (error: any) {
  console.error(error.message);
}

console.log(`\nPeek Front: ${queue.peek()}`);

console.log('\nDequeuing 2 elements...');
console.log(`Dequeued: ${queue.dequeue()}`);
console.log(`Dequeued: ${queue.dequeue()}`);
queue.display();

console.log('\nEnqueuing elements: 60, 70');
queue.enqueue(60);
queue.enqueue(70);
queue.display();

console.log('\nClearing the queue...');
queue.clear();
queue.display();
