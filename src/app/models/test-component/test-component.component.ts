import { Component, OnInit } from '@angular/core';
import { RgbaPixel } from '../rgba-pixel';
import { Image } from '../image';
import { List } from '../list';

@Component({
	selector: 'app-test-component',
	templateUrl: './test-component.component.html',
	styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

	public pixel: RgbaPixel;
	public image: Image;

	constructor() {
		//this.test_insertFront();
		//this.test_insertBack();
		this.test_reverse();
	}

	test_reverse() {
		console.log("-- TESING REVERSE METHOD --")
		let list = new List();
		let NUM_ELEMENTS = 2;
		
		for (var i = 0; i < NUM_ELEMENTS; i++) {
			list.insertFront(i);
		}

		console.log("-- BEFORE REVERSE --");
		list.print();

		list.reverse();

		console.log("-- AFTER REVERSE --");
		list.print();
	}

	test_insertFront() {
		console.log("-- TESING INSERT_FRONT METHOD --")
		let list = new List();
		let NUM_ELEMENTS = 10;
		
		for (var i = 0; i < NUM_ELEMENTS; i++) {
			list.insertFront(i);
		}

		console.log("List size: " + list.size());
		list.print();
	}

	test_insertBack() {
		console.log("-- TESING INSERT_BACK METHOD --")
		let list = new List();
		let NUM_ELEMENTS = 10;
		
		for (var i = 0; i < NUM_ELEMENTS; i++) {
			list.insertBack(i);
		}

		console.log("List size: " + list.size());
		list.print();
	}

	ngAfterViewInit() {


	}

	
	ngOnInit() {

	}

	test() {
		var img = <HTMLCanvasElement>document.getElementById("testImage");
		var out = document.getElementById("out");
		var in_canvas = <HTMLCanvasElement>document.createElement('canvas');
		in_canvas.width = img.width;
		in_canvas.height = img.height;
		var ctx = <CanvasRenderingContext2D>in_canvas.getContext('2d');
		ctx.drawImage(img, 0,0, img.width, img.height);
		var imageData = ctx.getImageData(0,0,in_canvas.width, in_canvas.height);

		// convert imageData to 2d rgbapixel 
		this.image = new Image(imageData);

		var out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		var out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.draw(out_ctx);
		var out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		var out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.draw(out_ctx);
	}

	rotate() {
		var out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		var out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.draw(out_ctx);
		var out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		var out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.rotate180();
		this.image.draw(out_ctx);
	}

}
