import { RgbaPixel } from './rgba-pixel';
import { RgbaPixelNode } from './rgba-pixel-node';
import { Stack } from '../stack/stack';
import { Queue } from '../queue/queue';
import { IBagStructure } from '../i-bag-structure';

export class Photo {
    public pixels: RgbaPixelNode[][];
    public width: number;
    public height: number;
    private context: CanvasRenderingContext2D;
    public initialize: Promise<any>;
    private isLoaded: boolean = false;

    public ctx: CanvasRenderingContext2D;

    private bag: IBagStructure<Stack>;

    // "/assets/Polaroid1.jpg"
    constructor(imageUrl: string = null) {
        this.pixels = [];
        this.bag = new Stack();
        let canvas = document.createElement('canvas');
        this.ctx = canvas.getContext('2d');

        if (imageUrl != null) {
            this.initialize = new Promise((resolve, reject) => {
                var img = new Image();
                img.onload = () => {
                    let img_width = img.width,
                        img_height = img.height;
                    this.ctx = canvas.getContext('2d');

                    this.width = canvas.height = img_width,
                        this.height = canvas.width = img_height;

                    this.ctx.drawImage(img, 0, 0, img.width, img.height);
                    var imageData = this.ctx.getImageData(0, 0, img_width, img_height);

                    this.loadPixelsFromPhoto(imageData.data);
                    this.setNeighbors();
                    this.isLoaded = true;

                    resolve();
                };
                img.src = imageUrl;
            });
        }
        else {
            this.initialize = new Promise((resolve, reject) => {
                resolve();
            });
        }
    }

    public getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public drawOnCanvas(emptyCanvas: HTMLCanvasElement = null): any {
        if (emptyCanvas == null) {
            emptyCanvas = this.ctx.canvas;
        }
        debugger;
        emptyCanvas.height = this.height;
        emptyCanvas.width = this.width;

        let ctx = emptyCanvas.getContext('2d');

        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                var pixel = this.pixels[x][y];
                ctx.fillStyle = `rgba(${pixel.red},
                                        ${pixel.green},
                                        ${pixel.blue},
                                        ${pixel.alpha})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
        this.ctx = ctx;
        this.ctx.save();
        return this.ctx;
    }

    public updateCanvas(pixelNode: RgbaPixelNode) {
        this.ctx.save();

        this.ctx.fillStyle = `rgba(${pixelNode.red},
                                        ${pixelNode.green},
                                        ${pixelNode.blue},
                                        ${pixelNode.alpha})`;
        this.ctx.fillRect(pixelNode.x, pixelNode.y, 1, 1);
    }

    // Rotates an image by 180 degrees - flip
    public rotate180(): void {
        if (!this.isLoaded) return;

        for (let x = 0; x < (this.width - 1) / 2; x++) {
            for (let y = 0; y < (this.height - 1); y++) {
                let src = this.pixels[x][y],
                    dst = this.pixels[this.width - 1 - x][this.height - 1 - y];
                this.swapPixel(src, dst);
            }
        }
    }

    public flipLeft(): void {

    }

    public adjustBrightness(r: number, g: number, b: number): void {

    }

    public invertColors(): void {

    }

    private loadPixelsFromPhoto(data: Uint8ClampedArray) {
        let idx = 0;
        for (var x = 0; x < this.width; x++) {
            this.pixels[x] = [];
            for (var y = 0; y < this.height; y++) {
                idx = (y * this.width + x) * 4;
                let red = data[idx],
                    green = data[idx + 1],
                    blue = data[idx + 2],
                    alpha = data[idx + 3];
                this.pixels[x][y] = new RgbaPixelNode(x, y, red, green, blue, alpha);
            }
        }
    }

    private setNeighbors() {
        for (var x = 0; x < this.width; x++) {
            for (var y = 0; y < this.height; y++) {
                this.pixels[x][y].setNeighbors(this.pixels);
            }
        }
    }

    private swapPixel(a: RgbaPixel, b: RgbaPixel): void {
        [a.red, b.red] = [b.red, a.red];
        [a.green, b.green] = [b.green, a.green];
        [a.blue, b.blue] = [b.blue, a.blue];
        [a.alpha, b.alpha] = [b.alpha,a.alpha];
    }

    public getPixels(): RgbaPixel[][] {
        if (!this.isLoaded) return null;

        return this.pixels;
    }

    public getPixel(x: number, y: number): RgbaPixelNode {
        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
            return this.pixels[x][y];
        }
    }

    public floodFill(start_x: number, start_y: number): void {
        this.initialize.then(() => {
            if (!(start_x <= this.width - 1 && start_y <= this.height - 1)) return;

            for (var x = 0; x < this.width; x++) {
                for (var y = 0; y < this.height; y++) {
                    this.pixels[x][y].visited = false;
                }
            }

            let startNode = this.pixels[start_x][start_y];
            let currentNode: RgbaPixelNode,
                distance: number;
            this.bag.add(startNode);

            while (!this.bag.isEmpty()) {
                currentNode = this.bag.remove();

                if (!currentNode.visited) {
                    this.updateCanvas(currentNode)
                    currentNode.visited = true;
                    (currentNode.getNeighbors()).forEach(neighbor => {
                        if (!neighbor.visited) {
                            // Do action here
                            let r_diff_sq = Math.pow((startNode.red - neighbor.red), 2);
                            let g_diff_sq = Math.pow((startNode.green - neighbor.green), 2);
                            let b_diff_sq = Math.pow((startNode.blue - neighbor.blue), 2);
                            distance = Math.sqrt((r_diff_sq + g_diff_sq + b_diff_sq));
                            if (distance < 50) {
                                neighbor.red = 255;
                                neighbor.green = 0;
                                neighbor.blue = 0;
                                this.bag.add(neighbor)
                            }
                        }

                    });

                }
                //this.updateCanvas(startNode);
            }
        });
    }
}
