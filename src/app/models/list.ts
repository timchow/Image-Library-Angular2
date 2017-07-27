import { ListNode } from './list-node';

export class List {

    private head: ListNode;
    private tail: ListNode;
    private length: number;

    constructor(otherList: List = null) {
        if (otherList == null) {
            this.head = new ListNode();
            this.length = 0;
        }
        else {
            this.head = otherList.head;
            this.length = otherList.length;
        }
    }

    private copy(): void {

    }

    public print(reverse: boolean = false): void {
        let output = "",
            cursor = reverse ? this.tail : this.head;

        output = reverse ? this.printBackward(cursor) : this.printForward(cursor);
        console.log(output);
    }

    // Recursive print
    private printForward(cursor: ListNode): string {
        if (cursor == null) {
            return "";
        }

        return cursor.data + " " + this.printForward(cursor.next);
    }

    private printBackward(cursor: ListNode) {
        if (cursor == null) {
            return "";
        }

        return cursor.data + " " + this.printForward(cursor.prev);
    }

    public reverse(): void {
        if (this.length < 2) { return; }
 
        let cursor = this.head,
            originalhead = this.head;

        
        while(cursor != null) {
            console.log(cursor.data);
            //this.swapNode(cursor.prev, cursor.next);
            cursor = cursor.prev;
        }
        //cursor.prev = null;
        this.head = cursor;
        this.tail = originalhead;
    }

    private swapNode(a: ListNode, b: ListNode): void {
        [a,b] = [b,a];
    }

    public size(): number {
        return this.length;
    }

    public empty(): boolean {
        return this.length == 0;
    }

    public insertFront(data: any): void {
        let newNode = new ListNode(data);

        if (this.length < 1) {
            this.head = this.tail = newNode;
        }
        else if (this.length > 0) {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
        }
        this.length++;
    }

    public insertBack(data: any): void {
        let newNode = new ListNode(data);

        if (this.length < 1) {
            this.head = this.tail = newNode;
        }
        else if (this.length > 0) {
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.length++;
    }

    public reverseNth(n: number): void {

    }

    public waterfall(): void {

    }
}
