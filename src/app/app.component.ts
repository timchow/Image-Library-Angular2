import { Component, OnInit } from '@angular/core';
import { TestComponentComponent } from './models/test-component/test-component.component';
import { ImageComponent } from './models/image/image.component';
import { GraphVertex } from './models/graph-vertex';
import { BinarySearchTree } from './data-structures/binary-search-tree/binary-search-tree';
import { Heap } from './data-structures/heap/heap';
import { Quadtree } from './models/quadtree/quadtree';
import TreeUtility from './utility/tree-utility';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    public levels: GraphVertex[][] ;
	title = ""; //'app';
	
    ngOnInit() {

		let tree = new Heap(1);
		tree.RandomPopulate();

        let svg = document.getElementById("svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("version", "1.1")

        let obj = TreeUtility.prettyPrint(tree.getHeapTree(), svg);
        this.levels = obj.levels;
        svg.setAttribute("width", obj.width);
        svg.setAttribute("height", obj.height);
        svg.setAttribute("style", "padding-top:50px");
    }
}