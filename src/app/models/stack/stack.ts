import { List } from '../linked-list/list';
import { ListNode } from '../linked-list/list-node';

export class Stack {

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
