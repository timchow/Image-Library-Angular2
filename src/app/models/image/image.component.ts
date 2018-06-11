import { Component, OnInit } from '@angular/core';
import { Photo } from './image';
import { Quadtree } from '../../data-structures/quadtree/quadtree';
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
        //this.image = new Photo("/assets/in.bmp");
        //this.image = new Photo("/assets/in_1.jpg");
        //this.image2 = new Photo("/assets/Polaroid2.jpg");
        this.image = new Photo("assets/in3.png");
        /*let canvas = document.createElement('canvas');
		this.quadtree = new Quadtree();
		
        this.image.initialize.then(() => {
            let appImage = document.getElementsByTagName("app-image");
			this.quadtree.buildTree(this.image, this.image.height);

			// before
			this.image = this.quadtree.decompress();
			appImage[0].appendChild(this.image.ctx.canvas);
			
			// after
			this.quadtree.prune(35000);
			let newImage = this.quadtree.decompress();
			appImage[0].appendChild(newImage.ctx.canvas);
		});*/
		
		
		this.image.initialize.then(() => {
			let canvas = <HTMLCanvasElement>document.getElementById("canvas");
			this.image.DrawOnCanvas(canvas);
			canvas.addEventListener('click', (evt) => {
				let mousePos = this.image.GetMousePosition(canvas, evt);
				console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);

				this.image.FloodFill(50,Math.floor(mousePos.x),Math.floor(mousePos.y));
			}, false);
		});

        
    }

    ngOnInit() {
    }

}
