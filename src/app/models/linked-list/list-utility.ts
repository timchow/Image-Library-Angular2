import { List } from './list';
import { ListNode } from './list-node';

export default class ListUtility {
    static GetList(head: ListNode, reverse: boolean = false): Array<any> {
        return _getListItems(head, reverse);
    }

    static GetSize(head: ListNode): number {
        return _getSize(head);
    }

    static Reverse(head: ListNode): { "head", "tail" } {
        return _reverse(head);
    }

    static Waterfall(head: ListNode, tail: ListNode): { "head", "tail" } {
        return _waterfall(head, tail);
    }

    static Merge(head1: ListNode, head2: ListNode): ListNode {
        return _merge(head1,head2);
    }

    static Mergesort(start: ListNode, chainLength: number): ListNode {
        return _mergesort(start,chainLength);
    }
}

// Private functions - not exposed as a part of static class ListUtility

export function _getListItems(cursor: ListNode, reverse: boolean = false): Array<any> {
    if (cursor == null) {
        return [];
    }

    let node: ListNode = reverse ? cursor.prev : cursor.next;

    return [cursor.data].concat(_getListItems(node, reverse));
}

export function _getSize(head: ListNode): number {
    if (head == null) {
        return 0;
    }

    return 1 + _getSize(head.next);
}

export function _reverse(head: ListNode): { "head", "tail" } {
    let length = ListUtility.GetSize(head);
    if (length < 1) { return; }
    else if (length == 1) { return { "head": head, "tail": head }; }

    let cursor: ListNode = head,
        originalhead: ListNode = head,
        cursorShadow: ListNode = head,
        temp: ListNode, tail: ListNode;

    while (cursor != null) {
        temp = cursor.prev;
        cursor.prev = cursor.next;
        cursor.next = temp;

        cursorShadow = cursor;
        cursor = cursor.prev;
    }

    head = cursorShadow;
    tail = originalhead;

    return { "head": head, "tail": tail };
}

export function _waterfall(head: ListNode, tail: ListNode): { "head", "tail" } {
    if (ListUtility.GetSize(head) < 2) return;

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

    return { "head": newHead, "tail": newTail };
}

export function _merge(head1: ListNode, head2: ListNode): ListNode {
    let mergedHead: ListNode,
        mergedCursor: ListNode,
        list1Cursor: ListNode = head1,
        list2Cursor: ListNode = head2,
        temp: ListNode,
        firstCompare: boolean = true;

    while (list1Cursor && list2Cursor) {
        let compareResult = list1Cursor.data >= list2Cursor.data;
        temp = compareResult ? list2Cursor : list1Cursor;

        if (firstCompare) {
            mergedHead = mergedCursor = temp;
        }
        else {
            mergedCursor.next = temp;
            temp.prev = mergedCursor;
        }

        compareResult ? list2Cursor = list2Cursor.next : list1Cursor = list1Cursor.next;

        if (firstCompare) { firstCompare = !firstCompare; continue; }

        mergedCursor = mergedCursor.next;
    }

    if (list1Cursor == null) {
        if (!mergedHead) { mergedHead = list2Cursor; }
        else { mergedCursor.next = list2Cursor; }
    }
    else if (list2Cursor == null) {
        if (!mergedHead) { mergedHead = list1Cursor; }
        else { mergedCursor.next = list1Cursor; }
    }

    return mergedHead;
}

export function _mergesort(start: ListNode, chainLength: number): ListNode {
    return null;
}
