import { Component, OnInit, OnChanges } from '@angular/core';
import { BinarySearchTree } from './binary-search-tree';

@Component({
    selector: 'app-binary-search-tree',
    templateUrl: './binary-search-tree.component.html',
    styleUrls: ['./binary-search-tree.component.css']
})
export class BinarySearchTreeComponent implements OnInit, OnChanges {

    public bst: BinarySearchTree;
    constructor() {

    }

    ngOnInit() {
        this.bst = new BinarySearchTree();
        this.bst.addVertex(16);
        this.bst.addVertex(8);
        this.bst.addVertex(24);
        //this.bst.addVertex(20);
        //this.bst.addVertex(26);
        //this.bst.addVertex(12);
        //this.bst.addVertex(23)
        this.bst.addVertex(100)
        this.bst.addVertex(57)
        this.bst.getTreeLevelsWithPositions();
        /*
        let svg = document.getElementById("svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("version", "1.1")

        svg = this.bst.prettyPrint(svg);
        let appImage = document.getElementsByTagName("app-binary-search-tree");
        appImage[0].appendChild(svg);*/
        //this.bst.Convert();
    }

    ngOnChanges() {
        //this.bst.getTreeLevels();
    }

    handleSubmit(data, option) {

        if (option == 1) {
            if (data) {
                this.bst.addVertex(parseInt(data));
                this.bst.getTreeLevelsWithPositions()
            }
        }
        else if (option == 2) {
            if (data) {
                this.bst.removeVertexWithKey(data);
                this.bst.getTreeLevelsWithPositions();
            }
        }
        else if (option == 3) {
            if (data) {
                console.log(this.bst.keyExists(data));
            }
        }
    }

}
