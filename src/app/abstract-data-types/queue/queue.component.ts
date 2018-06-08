import { Component, OnInit } from '@angular/core';
import { Queue } from './queue'

@Component({
    selector: 'app-queue',
    templateUrl: './queue.component.html',
    styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

    public queue: Queue;

    constructor() {
        this.queue = new Queue();
    }

    ngOnInit() {
    }

}
