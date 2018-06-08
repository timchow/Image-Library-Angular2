import { LinkedList } from '../../data-structures/linked-list/linked-list';
import { ListNode } from '../../data-structures/linked-list/list-node';
import { IBagStructure } from '../../interfaces/i-bag-structure';

export class Stack implements IBagStructure<Stack> {

    private stack: LinkedList;

    constructor(otherStack: Stack = null) {
        if (otherStack == null) {
            this.stack = new LinkedList();
        }
        else {
            this.stack = null;
        }
    }

    public push(data: any): void {
        this.stack.insertFront(data);
    }

    public pop(): any {
        if (this.stack.empty()) {
            return null;
        }
        return this.stack.removeFront().data;
    }

    public remove(): any {
        return this.pop();
    }

    public add(data: any): void {
        return this.push(data);
    }

    public peek(): any  {
        if (this.stack.empty()) {
            return null;
        }
        return this.stack.getHead().data;
    }

    public isEmpty(): boolean {
        return this.stack.empty();
    }

    public getSize(): number {
        return this.stack.getSize();
    }

}
