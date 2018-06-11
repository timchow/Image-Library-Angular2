import { Component, OnInit } from '@angular/core';
import { RgbaPixel } from '../../models/image/rgba-pixel';
import { Photo } from '../../models/image/image';
import { LinkedList } from '../../data-structures/linked-list/linked-list';

@Component({
	selector: 'app-test-component',
	templateUrl: './test-component.component.html',
	styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

	public pixel: RgbaPixel;
	public image: Photo;
	public list: LinkedList;

	constructor() {
		this.list = new LinkedList();
		//this.test_insertFront();
		//this.test_insertBack();
		//this.test_reverse();
		//console.log("")
		
		//this.test_reverseNth();
		//this.test_waterfall();
	}

	test_waterfall() {
		console.log("-- TESING REVERSENTH METHOD --");

		let list = new LinkedList();
		let NUM_ELEMENTS = 4;
		
		for (let i = 0; i < NUM_ELEMENTS; i++) {
			list.insertBack(i);
		}

		console.log("-- BEFORE WATERFALL --");

		list.print();

		list.waterfall();

		console.log("-- AFTER WATERFALl --");
		list.print();
	}

	test_reverseNth() {
		console.log("-- TESING REVERSENTH METHOD --")

		let list = new LinkedList();
		let NUM_ELEMENTS = 10;
		
		for (let i = 0; i < NUM_ELEMENTS; i++) {
			list.insertBack(i);
		}

		console.log("-- BEFORE REVERSE --");
		//console.log(list.head)
		list.print();
		//console.log(list.head)
		list.reverseNth(2);

		console.log("-- AFTER REVERSE --");
		list.print();
	}

	test_reverse() {
		console.log("-- TESING REVERSE METHOD --")
		let list = new LinkedList();
		let NUM_ELEMENTS = 10;
		
		for (let i = 0; i < NUM_ELEMENTS; i++) {
			list.insertFront(i);
		}

		console.log("-- BEFORE REVERSE --");
		list.print();

		list.reverse();

		console.log("-- AFTER REVERSE --");
		list.print();
		//console.log("Size: " + list.calculateSize(list.head))
	}

	test_insertFront() {
		console.log("-- TESING INSERT_FRONT METHOD --")
		let list = new LinkedList();
		let NUM_ELEMENTS = 10;
		
		for (let i = 0; i < NUM_ELEMENTS; i++) {
			list.insertFront(i);
		}

		console.log("List size: " + list.size());
		list.print();
	}

	test_insertBack() {
		console.log("-- TESING INSERT_BACK METHOD --")
		let list = new LinkedList();
		let NUM_ELEMENTS = 10;
		
		for (let i = 0; i < NUM_ELEMENTS; i++) {
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
		/*
		let img = <HTMLCanvasElement>document.getElementById("testImage");
		let out = document.getElementById("out");
		let in_canvas = <HTMLCanvasElement>document.createElement('canvas');
		in_canvas.width = img.width;
		in_canvas.height = img.height;
		let ctx = <CanvasRenderingContext2D>in_canvas.getContext('2d');
		ctx.drawImage(img, 0,0, img.width, img.height);
		let imageData = ctx.getImageData(0,0,in_canvas.width, in_canvas.height);

		// convert imageData to 2d rgbapixel 
		this.image = new Photo("");

		let out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		let out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.drawOnCanvas(out_ctx);
		let out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		let out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.draw(out_ctx);*/
	}

	rotate() {
		/*
		let out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		let out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.draw(out_ctx);
		let out_canvas = <HTMLCanvasElement>document.getElementById('canvas');
		out_canvas.width = this.image.getWidth();
		out_canvas.height = this.image.getHeight();
		let out_ctx = <CanvasRenderingContext2D>out_canvas.getContext('2d');
		this.image.rotate180();
		this.image.draw(out_ctx);*/
	}

}
