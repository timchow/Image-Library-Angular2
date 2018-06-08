export class ListNode {
    public next: ListNode;
    public prev: ListNode;
    public data: any;

    constructor(_data: any = null) {
        this.next = null;
        this.prev = null;
        this.data = _data;
    }
}
