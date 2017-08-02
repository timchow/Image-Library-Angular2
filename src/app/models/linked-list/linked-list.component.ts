import { Component, OnInit } from '@angular/core';
import { List } from './list'

@Component({
    selector: 'app-linked-list',
    templateUrl: './linked-list.component.html',
    styleUrls: ['./linked-list.component.css']
})
export class LinkedListComponent implements OnInit {

    public linkedList: List;

    constructor() {
        this.linkedList = new List();
    }

    ngOnInit() {
    }

    public loadElements(n: number): void {
        for(let idx = 1; idx <= n; idx++) {
            this.linkedList.insertBack(idx);
        }
    }
}
