import { Component, OnInit } from '@angular/core';
import { Quadtree } from './quadtree';
import { Photo } from '../image/image';
@Component({
    selector: 'app-quadtree',
    templateUrl: './quadtree.component.html',
    styleUrls: ['./quadtree.component.css']
})
export class QuadtreeComponent implements OnInit {

    public quadtree: Quadtree;

    constructor() {
        this.quadtree = new Quadtree();
    }

    ngOnInit() {
    }

}
