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
        output = this._print(cursor,reverse);
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

    private _reverse(head: ListNode): {"head","tail"} {
        let length = this.getSize(head);
        if (length < 1) { return; }
        else if (length == 1) { return {"head":head,"tail":head}; }
 
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

        return {"head":head,"tail":tail};
    }

    public reverse() {
        let temp: {"head","tail"} = this._reverse(this.head);
        this.head = temp["head"];
        this.tail = temp["tail"]; 
    }


    public reverseNth(n: number): void {
        if (n < 2) { return }
        else if (n >= this.length) { this.reverse(); return }

        let idx = 0,
            j = 0,
            ITERATIONS = Math.floor(this.length / n);
        
        let prevTail: ListNode,
            newHead: ListNode,
            start: ListNode,
            end: ListNode,
            nextStart: ListNode;
        
        let cursor: ListNode = this.head, originalhead: ListNode = this.head;
        let endPoints: {"head","tail"};

        if (this.length % n !=0) {
            ITERATIONS++;
        }

        for(let i = 0; i < ITERATIONS; i++) {
            newHead = cursor;
            newHead.prev = null;
            j = 0;

            if (ITERATIONS-1 == i) { n = (this.length % n) || n }

            for(; j < n-1; j++) {
                cursor = cursor.next;
            }

            if (ITERATIONS-1 != i) {
                nextStart = cursor.next;
            }

            cursor.next = null;

            endPoints = this._reverse(newHead);
            start = endPoints["head"];
            end = endPoints["tail"];

            if (i == 0) { prevTail = end; this.head = start; }
            else { prevTail.next = start; prevTail = end }

            cursor = nextStart;
        }
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
        let endPoints: {"head","tail"} = this._waterfall(this.head, this.tail);
        this.head = endPoints["head"];
        this.tail = endPoints["tail"];
    }

    private _waterfall(head: ListNode, tail: ListNode): {"head","tail"} {
        if (this.getSize(head) < 2) return;

        let cursor: ListNode = head, newHead: ListNode = head;
        let newTail: ListNode, 
            node: ListNode, 
            shadowCursor: ListNode,
            reflectionCursor: ListNode;
        let currTail: ListNode = tail;

        let skip: boolean = true;

        while (cursor && cursor.next) {
            
            if (skip) {
                cursor = cursor.next;
                skip = !skip;
                continue;
            }

            reflectionCursor = cursor.next;

            if (cursor.prev) {
                shadowCursor = cursor.prev;
                shadowCursor.next = reflectionCursor;
                reflectionCursor.prev = shadowCursor;
            }
            
            // disconnect node
            node = cursor;

            // reconnection node at back
            currTail.next = node;
            node.prev = currTail;
            currTail = node;
            currTail.next = null;

            cursor = reflectionCursor;
            skip = !skip;
        }

        newTail = currTail;

        return {"head": newHead, "tail": newTail};
    }
}
