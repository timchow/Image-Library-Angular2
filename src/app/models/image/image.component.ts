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
    private quadtree: Quadtree;

    constructor() {
        this.image = new Photo("/assets/Polaroid2.jpg");
        let canvas = document.createElement('canvas');
        $(canvas).addClass("can")
        this.quadtree = new Quadtree();
        this.image.initialize.then(() => {
            this.quadtree.buildTree(this.image, 512);
            this.image = this.quadtree.decompress();
            debugger;
            //canvas = this.image.drawOnCanvas(canvas).canvas;
            let appImage = document.getElementsByTagName("app-image");
            appImage[0].appendChild(this.image.ctx.canvas);
        })

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
