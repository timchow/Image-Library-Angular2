import { RgbaPixel } from './rgba-pixel';
import { RgbaPixelNode } from './rgba-pixel-node';
import { Stack } from '../../abstract-data-types/stack/stack';
import { Queue } from '../../abstract-data-types/queue/queue';
import { IBagStructure } from '../../interfaces/i-bag-structure';

export class Photo {
    public pixels: RgbaPixelNode[][];
    public width: number;
    public height: number;
    public initialize: Promise<any>;
	public ctx: CanvasRenderingContext2D;
	
	private isLoaded: boolean = false;
    private bag: IBagStructure<Stack>;

    constructor(imageUrl: string = null) {
        this.pixels = [];
        this.bag = new Stack();
        let canvas = document.createElement('canvas');
        this.ctx = canvas.getContext('2d');

        if (imageUrl != null) {
            this.initialize = new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => {
                    this.width = canvas.height = img.width,
					this.height = canvas.width = img.height,
					this.ctx = canvas.getContext('2d');

                    this.ctx.drawImage(img, 0, 0, img.width, img.height);
                    let imageData = this.ctx.getImageData(0, 0, img.width, img.height);

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

	/**
	 * Gets the height of the image
	 * @return {number} The height of the image
	 */
    public GetHeight(): number {
        return this.height;
	}

	/**
	 * Gets the current mouse position coordinate of the click event with
	 * the canvas as context
	 * @param canvas 
	 * @param evt 
	 */
    public GetMousePosition(canvas, evt): {"x","y"} {
        let rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
	
	/**
	 * Returns the Pixel location at (x,y) in the underlying image
	 * @param x 
	 * @param y 
	 */
    public GetPixel(x: number, y: number): RgbaPixelNode {
        if (x >= 0 && x <= this.width && y >= 0 && y <= this.height) {
            return this.pixels[x][y];
        }
	}
	
	/**
	 * Returns the pixels of the underlying image
	 */
	public GetPixels(): RgbaPixel[][] {
        if (!this.isLoaded) return null;

        return this.pixels;
	}
	
	/**
	 * Gets the width of the image
	 * @return {number} The width of the image
	 */
    public GetWidth(): number {
        return this.width;
    }

	/**
	 * Draws the current Image context onto the HTML Canvas element
	 * @param emptyCanvas 
	 */
    public DrawOnCanvas(emptyCanvas: HTMLCanvasElement = null): CanvasRenderingContext2D {
        if (emptyCanvas == null) {
            emptyCanvas = this.ctx.canvas;
        }

        emptyCanvas.height = this.height;
        emptyCanvas.width = this.width;

        let ctx = emptyCanvas.getContext('2d');

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
				let pixel = this.pixels[x][y];
				
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

	/**
	 * Starting at (start_x,start_y), this function will test its neighbors for a
	 * color difference of tolerance and fills those coordinates if true
	 * @param tolerance 
	 * @param start_x 
	 * @param start_y 
	 */
    public FloodFill(tolerance: number = 100, start_x: number, start_y: number): void {
        this.initialize.then(() => {
            if (!(start_x <= this.width - 1 && start_y <= this.height - 1)) return;

            for (let x = 0; x < this.width; x++) {
                for (let y = 0; y < this.height; y++) {
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
							let r_diff_sq = Math.pow((startNode.red - neighbor.red), 2),
								g_diff_sq = Math.pow((startNode.green - neighbor.green), 2),
								b_diff_sq = Math.pow((startNode.blue - neighbor.blue), 2);

							distance = Math.sqrt((r_diff_sq + g_diff_sq + b_diff_sq));
							
                            if (distance < tolerance) {
                                neighbor.red = 255;
                                neighbor.green = 0;
                                neighbor.blue = 0;
                                this.bag.add(neighbor)
                            }
                        }

                    });

                }
            }
        });
	}
	
	/**
	 * Rotates an image by 180 degrees
	 */
    public Rotate180(): void {
        if (!this.isLoaded) return;

        for (let x = 0; x < (this.width - 1) / 2; x++) {
            for (let y = 0; y < (this.height - 1); y++) {
                let src = this.pixels[x][y],
                    dst = this.pixels[this.width - 1 - x][this.height - 1 - y];
                this.swapPixel(src, dst);
            }
        }
	}
	
	// TODO FUNCTIONS
    public flipLeft(): void {}

    public adjustBrightness(r: number, g: number, b: number): void {}

	public invertColors(): void {}
	
	// PRIVATE/HELPER FUNCTIONS

    private loadPixelsFromPhoto(data: Uint8ClampedArray): void {
        let idx = 0;
        for (let x = 0; x < this.width; x++) {
            this.pixels[x] = [];
            for (let y = 0; y < this.height; y++) {
                idx = (y * this.width + x) * 4;
                let red = data[idx],
                    green = data[idx + 1],
                    blue = data[idx + 2],
                    alpha = data[idx + 3];
                this.pixels[x][y] = new RgbaPixelNode(x, y, red, green, blue, alpha);
            }
        }
    }

    private setNeighbors(): void {
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
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
	
	private updateCanvas(pixelNode: RgbaPixelNode): void {
        this.ctx.save();
        this.ctx.fillStyle = `rgba(${pixelNode.red},
                                        ${pixelNode.green},
                                        ${pixelNode.blue})`;
        this.ctx.fillRect(pixelNode.x, pixelNode.y, 1, 1);
    }
}
