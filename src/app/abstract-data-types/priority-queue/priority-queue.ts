import { Heap } from "../../data-structures/heap/heap";
import { HeapType } from "../../data-structures/heap/enum-heap-type";

export class PriorityQueue {
    private heap: Heap;

    constructor() {
        this.heap = new Heap(HeapType.MAX);
    }

    public add(data: any): void {
        this.heap.insert(data);
    }

    public clear(): void {
        while (!this.heap.isEmpty()) {
            this.heap.extractRoot();
        }
    }

    public poll(): any {
        return this.heap.extractRoot();
    }

    public peek(): any {
        if (!this.heap.isEmpty()) {
            return this.heap.getHeapArray()[1];
        }

        return null;
    }

    public size(): any {
        return this.heap.getHeapArray().length - 1;
    }
}