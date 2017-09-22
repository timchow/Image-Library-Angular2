import { Component, OnInit } from '@angular/core';
import { Heap } from './heap';
import { HeapType } from './enum-heap-type';

@Component({
    selector: 'app-heap',
    templateUrl: './heap.component.html',
    styleUrls: ['./heap.component.css']
})
export class HeapComponent implements OnInit {

    private heap: Heap;

    constructor() {
        this.heap = new Heap(HeapType.MIN);

        this.heap.insert(5);
        this.heap.insert(3);
        this.heap.insert(12);
        this.heap.insert(10);
        this.heap.insert(50);
        this.heap.insert(43);
        this.heap.insert(2);

        console.log(this.heap.getHeapArray());
        console.log(this.heap.getHeapTree());


        this.heap.heapSort();
        console.log(this.heap.getHeapArray());
        console.log(this.heap.getHeapTree())
        //console.log("Extract root: ");
        //console.log(this.heap.extractRoot());

        //console.log(this.heap.getHeapArray());
        //console.log(this.heap.getHeapTree());
    }

    ngOnInit() {
    }

}
