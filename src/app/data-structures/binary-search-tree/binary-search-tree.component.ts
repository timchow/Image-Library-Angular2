import { Component, OnInit } from '@angular/core';
import { BinarySearchTree } from './binary-search-tree';

@Component({
    selector: 'app-binary-search-tree',
    templateUrl: './binary-search-tree.component.html',
    styleUrls: ['./binary-search-tree.component.css']
})
export class BinarySearchTreeComponent implements OnInit {

    public bst: BinarySearchTree;
    constructor() {
        this.bst = new BinarySearchTree();
        //debugger;
        this.bst.addVertex(16);
        this.bst.addVertex(8);
        this.bst.addVertex(24);
        this.bst.addVertex(20);
        //this.bst.addVertex(26);
        //this.bst.addVertex(12);
        this.bst.addVertex(23)
        console.log(this.bst.print())
        this.bst.height()
    }

    ngOnInit() {
    }

}
