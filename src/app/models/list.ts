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
        output = reverse ? this._print(cursor,true) : this._print(cursor, false);
        console.log(output);
    }

    private _printList(head: ListNode) {
        this._print(head);
    }

    // Recursive print
    private _print(cursor: ListNode, reverse: boolean = false): string {
        if (cursor == null) {
            return "";
        }

        let node: ListNode = reverse ? cursor.prev : cursor.next;

        return cursor.data + " " + this._print(node,reverse);
    }

    public getSize(head: ListNode): number {
        if (head == null) {
            return 0;
        }

        return 1 + this.getSize(head.next);
    }

    private _reverse(head: ListNode): [ListNode,ListNode] {
        let length = this.getSize(head);
        if (length < 1) { return; }
        else if (length == 1) { return [head,head]; }
 
        let cursor: ListNode = head, 
            originalhead: ListNode = head, 
            cursorShadow: ListNode = head,
            temp: ListNode, tail: ListNode;

        while(cursor != null) {
            temp = cursor.prev;
            cursor.prev = cursor.next;
            cursor.next = temp;

            cursorShadow = cursor;
            cursor = cursor.prev;
        }
        
        head = cursorShadow;
        tail = originalhead;

        return [head,tail];
    }

    public reverse() {
        let temp: [ListNode,ListNode] = this._reverse(this.head);
        this.head = temp[0];
        this.tail = temp[1]; 
        console.log(this.head)
        console.log(this.tail)
    }


    public reverseNth(n: number): void {
        if (n < 2) { return }
        else if (n >= this.length) { this.reverse(); return }

        let idx = 0;
        let cursor: ListNode = this.head;
        let originalhead: ListNode = this.head;
        let prevTail: ListNode;
        let newHead: ListNode;
        let start: ListNode;
        let end: ListNode;
        let endPoints: [ListNode,ListNode];
        let nextStart: ListNode;
        let ITERATIONS = Math.floor(this.length / n);
        if (this.length % n !=0) {
            ITERATIONS++;
        }
        let j = 0;

        console.log("Iterations: " + ITERATIONS);

        debugger;
        for(let i = 0; i < ITERATIONS; i++) {
            newHead = cursor;
            newHead.prev = null;
            j = 0;

            if (ITERATIONS-1 == i) { j = (n-1-j); }

            for(; j < n-1; j++) {
                cursor = cursor.next;
            }

            if (ITERATIONS-1 != i) {
                nextStart = cursor.next;
            }

            cursor.next = null;

            endPoints = this._reverse(newHead);
            start = endPoints[0];
            end = endPoints[1];

            if (i == 0) { prevTail = end; }
            else { prevTail.next = start; prevTail = end }

            if (i == 0) { this.head = start; }

            cursor = nextStart;
        }
        debugger;
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



    public waterfall(): void {

    }

    public getHead(): ListNode {
        return this.head;
    }
}
