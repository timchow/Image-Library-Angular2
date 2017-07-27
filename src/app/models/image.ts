import { RgbaPixel } from './rgba-pixel'

export class Image {
    private pixels: RgbaPixel[][];
    private width: number;
    private height: number;

    constructor(imageData: ImageData) {
        this.pixels = [];
        this.width = imageData.width;
        this.height = imageData.height;

        this.loadImage(imageData.data);
    }

    public getWidth(): number {
        return this.width;
    }

    public getHeight(): number {
        return this.height;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        for (var x = 0; x < this.width; x++) {
			for (var y = 0; y < this.height; y++) {
				var pixel = this.pixels[x][y];
                ctx.fillStyle = `rgba(${pixel.red},
                                        ${pixel.green},
                                        ${pixel.blue},
                                        ${pixel.alpha})`;
				ctx.fillRect(x,y,1,1);
			}
		}
    }

    // Rotates an image by 180 degrees - flip
    public rotate180(): void {
        for (let x = 0; x < (this.width-1)/2; x++) {
            for (let y = 0; y < (this.height-1); y++) {
                let src = this.pixels[x][y],
                    dst = this.pixels[this.width-1-x][this.height-1-y];
                this.swapPixel(src,dst);
            }
        }
    }

    public flipLeft(): void {

    }

    public adjustBrightness(r: number, g: number, b: number): void {

    }

    public invertColors(): void {
        
    }

    private loadImage(data: Uint8ClampedArray) {
        let idx = 0;
        for (var x = 0; x < this.width; x++) {
            this.pixels[x] = [];
            for (var y = 0; y < this.height; y++) {
                idx = (y * this.width + x)*4;
                let red = data[idx],
                    green = data[idx+1],
                    blue = data[idx+2],
                    alpha = data[idx+3]/255;
                this.pixels[x][y] = new RgbaPixel(red, green, blue);
            }
        }
    }

    private swapPixel(a: RgbaPixel, b: RgbaPixel): void {
        [a.red, b.red] = [b.red, a.red];
        [a.green, b.green] = [b.green, a.green];
        [a.blue, b.blue] = [b.blue, a.blue];
    }
}
