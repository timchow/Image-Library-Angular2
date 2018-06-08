import ListUtility from './list-utility';
import { ListNode } from './list-node';


export class LinkedList {

    private head: ListNode;
    private tail: ListNode;
    private length: number;

    constructor(otherList: LinkedList = null) {
        if (otherList == null) {
            this.head = null;
            this.length = 0;
        }
        else {
            this.head = otherList.head;
            this.length = otherList.length;
        }
    }

    public split(splitPoint: number): ListNode {
        if (splitPoint > this.length || this.length < 0) {
            throw new Error(splitPoint + " is an invalid splitPoint");
        }

        let lists = this._split(this.head,splitPoint);
        this.head = lists["left"];

        return lists["right"];
    }

    private _split(head: ListNode, splitPoint: number): {"left","right"} {
        let head1: ListNode = head,
            head2: ListNode,
            cursor: ListNode = head,
            cursorShadow: ListNode;

        if (splitPoint == 0) {
            head1 = null;
            head2 = head;
        }
        else if (splitPoint > 0) {

            for (let i = 0; i < splitPoint; i++) {
                cursorShadow = cursor;
                cursor = cursor.next;
            }
            cursorShadow.next = null;
            head2 = cursor;
        }
        
        return {"left":head1,"right":head2};
    }

    private copy(): void {
    }

    public print(reverse: boolean = false): void {
        let output,
            cursor = reverse ? this.tail : this.head;
        output = ListUtility.GetList(cursor,reverse);
    }

    public getList(reverse: boolean = false): any[] {
        let output,
            cursor = reverse ? this.tail : this.head;
        return ListUtility.GetList(cursor,reverse);   
    }

    public getSize(): number {
        return ListUtility.GetSize(this.head);
    }

    public reverse() {
        let temp: {"head","tail"} = ListUtility.Reverse(this.head);
        this.head = temp["head"];
        this.tail = temp["tail"]; 
    }

    public reverseNth(n: number): void {
        if (n < 2) { return }
        else if (n >= this.length) { this.reverse(); return; }

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

            endPoints = ListUtility.Reverse(newHead);
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
        let endPoints: {"head","tail"} = ListUtility.Waterfall(this.head, this.tail);
        this.head = endPoints["head"];
        this.tail = endPoints["tail"];
    }

    public clear(): void {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    public merge(otherHead: ListNode): ListNode {
        this.head = ListUtility.Merge(this.head, otherHead);

        return this.head;
    }

    public sort(): void {
        this.head = this._mergesort(this.head,this.length);
    }

    private _mergesort(start: ListNode, chainLength: number): ListNode {
        if (chainLength == 1) {
            return start;
        }

        let newChainLength = Math.ceil(chainLength/2);

        let lists = this._split(start,newChainLength);
        let left: ListNode = this._mergesort(lists["left"], newChainLength);
        let right: ListNode = this._mergesort(lists["right"], chainLength-newChainLength);

        let mergedList = ListUtility.Merge(left,right);
        return mergedList;
    }

    public getHead(): ListNode {
        return this.head;
    }

    private _findTail(head: ListNode): ListNode {
        if (head == null) {
            return head;
        }

        let cursor = head,
            shadowCursor = cursor;
        while (cursor) {
            shadowCursor = cursor;
            cursor = cursor.next;
        }

        return shadowCursor;
    }

    public removeFront(): ListNode {
        if (this.empty()) {
            return null;
        }

        let front = this.head;
        this.head = this.head.next;
        this.length--;
        return front;
    }
}
