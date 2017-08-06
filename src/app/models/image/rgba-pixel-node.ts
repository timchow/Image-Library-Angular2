import { RgbaPixel } from './rgba-pixel';

export class RgbaPixelNode extends RgbaPixel {

    public visited: boolean;
    public neighbors: RgbaPixelNode[]; // adjacency list
    public x: number;
    public y: number;

    constructor(_x, _y, _red: number = 0, _green: number = 0, _blue: number = 0) {
        super(_red,_green,_blue);
        this.x = _x;
        this.y = _y;
        this.visited = false;
        this.neighbors = [];
    }

    public getNeighbors(): RgbaPixelNode[] {
        return this.neighbors;
    }

    public setNeighbors(pixels: RgbaPixelNode[][]): void {
        let width = pixels.length-1,
            height = pixels[0].length-1;

        // check north
        if (this.y + 1 <= height) {
            this.neighbors.push(pixels[this.x][this.y + 1]);
        }

        // check east
        if (this.x + 1 <= width) {
            this.neighbors.push(pixels[this.x + 1][this.y]);
        }

        // check south
        if (this.y - 1 >= 0) {
            this.neighbors.push(pixels[this.x][this.y - 1]);
        }

        // check west
        if (this.x - 1 >= 0) {
            this.neighbors.push(pixels[this.x - 1][this.y]);
        }
    }
}
