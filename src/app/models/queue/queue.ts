import { List } from '../linked-list/list';
import { ListNode } from '../linked-list/list-node';
import { IBagStructure } from '../i-bag-structure';

export class Queue implements IBagStructure<Queue> {
    private queue: List;

    constructor() {
        this.queue = new List();
    }

    public enqueue(data: any): void {
        if (data == null) return;

        this.queue.insertBack(data);
    }

    public dequeue(): any {
        if (this.isEmpty()) return null;

        return this.queue.removeFront().data;
    }

    public peek(): any {
        if (this.isEmpty()) return null;

        return this.queue.getHead().data;
    }

    public isEmpty(): boolean {
        return this.queue.empty();
    }

    public getSize(): number {
        return this.queue.getSize();
    }

    public add(data: any): void {
        return this.enqueue(data);
    }

    public remove(): any {
        return this.dequeue();
    }
}
