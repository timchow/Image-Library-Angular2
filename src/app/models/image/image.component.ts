import { Component, OnInit } from '@angular/core';
import { Photo } from './image';
import { Quadtree } from '../quadtree/quadtree';
import * as $ from 'jquery';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

    private image: Photo;
    private image2: Photo;
    private quadtree: Quadtree;

    constructor() {
        this.image = new Photo("/assets/Polaroid2.jpg");
        //this.image = new Photo("/assets/in_1.jpg");
        this.image2 = new Photo("/assets/Polaroid2.jpg");
        //this.image = new Photo("/assets/in_2.jpg");
        let canvas = document.createElement('canvas');
        let canvas2 = document.createElement('canvas');
        $(canvas).addClass("can")
        this.quadtree = new Quadtree();
        this.image.initialize.then(() => {
            let appImage = document.getElementsByTagName("app-image");
            this.quadtree.buildTree(this.image, this.image.height);
            this.quadtree.prune(100);
            this.image = this.quadtree.decompress();
             appImage[0].appendChild(this.image.ctx.canvas);
        });

        this.image2.initialize.then(()=>{
            let appImage = document.getElementsByTagName("app-image");
            this.quadtree.buildTree(this.image2, this.image2.height);
            this.image2 = this.quadtree.decompress();
            appImage[0].appendChild(this.image2.ctx.canvas);
        });

        /*
        canvas.addEventListener('click', (evt) => {
            var mousePos = this.image.getMousePos(canvas, evt);
            console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);

            this.image.floodFill(Math.floor(mousePos.x),Math.floor(mousePos.y));
        }, false);*/
    }

    ngOnInit() {
    }

}
