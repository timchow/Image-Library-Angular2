import { Component, OnInit } from '@angular/core';
import { Photo } from './image';
import * as $ from 'jquery';

@Component({
    selector: 'app-image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

    private image: Photo;

    constructor() {
        this.image = new Photo("/assets/Polaroid1.jpg");
        let canvas = document.createElement('canvas');
        $(canvas).addClass("can")

        this.image.drawOnCanvas(canvas);
        let appImage = document.getElementsByTagName("app-image");
        appImage[0].appendChild(canvas);
        canvas.addEventListener('click', (evt) => {
            var mousePos = this.image.getMousePos(canvas, evt);
            console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);

            this.image.floodFill(Math.floor(mousePos.x),Math.floor(mousePos.y));
            //this.image.drawOnCanvas(canvas);
        }, false);



    }

    ngOnInit() {
    }

}
