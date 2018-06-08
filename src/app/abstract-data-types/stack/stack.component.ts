import { Component, OnInit } from '@angular/core';
import { Stack } from './stack';

@Component({
    selector: 'app-stack',
    templateUrl: './stack.component.html',
    styleUrls: ['./stack.component.css']
})
export class StackComponent implements OnInit {

    public stack: Stack;

    constructor() {
        this.stack = new Stack();
    }

    ngOnInit() {
    }

}
