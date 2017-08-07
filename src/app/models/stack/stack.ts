import { List } from '../linked-list/list';
import { ListNode } from '../linked-list/list-node';
import { IBagStructure } from '../i-bag-structure';

export class Stack implements IBagStructure {

    private stack: List;

    constructor(otherStack: Stack = null) {
        if (otherStack == null) {
            this.stack = new List();
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
