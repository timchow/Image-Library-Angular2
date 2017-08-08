import { QuadtreeNode } from './quadtree-node';
import { Photo } from '../image/image';
import { RgbaPixel } from '../image/rgba-pixel';

export class Quadtree {
    public root: QuadtreeNode<RgbaPixel>;
    public resolution: number;

    constructor(otherQuadtree: Quadtree = null) {
        if (otherQuadtree == null) {
            this.root = null;
        }
        else {
            this.root = otherQuadtree.root;
            this.resolution = otherQuadtree.resolution;
        }
    }

    public buildTree(image: Photo, resolution: number): void {
        this.resolution = resolution;
        this.root = new QuadtreeNode<RgbaPixel>();
        this.root.nwChild = this._buildTree(this.root.nwChild, image, Math.log2(resolution)-1, resolution/2, 1, 1);
        this.root.neChild = this._buildTree(this.root.neChild, image, Math.log2(resolution)-1, resolution/2, 1+resolution/2, 1);
        this.root.swChild = this._buildTree(this.root.swChild, image, Math.log2(resolution)-1, resolution/2, 1, 1+resolution/2);
        this.root.seChild = this._buildTree(this.root.seChild, image, Math.log2(resolution)-1, resolution/2, 1+resolution/2, 1+resolution/2);
    }

    private _buildTree(root: QuadtreeNode<RgbaPixel>, image: Photo, offset: number,res: number, x: number, y: number): QuadtreeNode<RgbaPixel> {
        if (res == 1) {
            root = new QuadtreeNode<RgbaPixel>(image.getPixel(x-1, y-1));
            root.mapped_x = x-1;
            root.mapped_y = y-1;
        }
        else {
            root = new QuadtreeNode<RgbaPixel>();

            root.nwChild = this._buildTree(root.nwChild, image, offset-1, res/2, x,y);
            root.neChild = this._buildTree(root.neChild, image, offset-1, res/2, x+Math.pow(2,offset-1),y);
            root.swChild = this._buildTree(root.swChild, image, offset-1, res/2, x,y+Math.pow(2,offset-1));
            root.seChild = this._buildTree(root.seChild, image, offset-1, res/2, +x+Math.pow(2,offset-1),y+Math.pow(2,offset-1));
            root.data = this.averageColor(root.nwChild, root.neChild, root.swChild, root.seChild);
            debugger
        }

        return root;
    }

    public prune(tolerance: number): void {

    }

    public idealPrune(numLeaves: number): void {

    }

    public decompress(): Photo {
        if (this.root) {
            return this._decompress();
        }
    }

    private _decompress(): Photo {
        let photo = new Photo();

        for (var x = 0; x < this.resolution; x++) {
            photo.pixels[x] = [];
        }
        photo.height = photo.pixels.length;;
        photo.width = photo.pixels.length;
        photo.ctx.canvas.width = photo.pixels.length;
        photo.ctx.canvas.height = photo.pixels.length;
        this.convertQuadtreeTo2DPixels(this.root, photo.pixels, photo.ctx);
        return photo;
    }

    private convertQuadtreeTo2DPixels(root: QuadtreeNode<RgbaPixel>, pixels: RgbaPixel[][], ctx: CanvasRenderingContext2D): void {
        if (!root.neChild && !root.nwChild && !root.swChild && !root.seChild) {
            let pixel = root.data;
            pixels[root.mapped_x][root.mapped_y] = pixel;
            ctx.fillStyle = `rgba(${pixel.red},
                                        ${pixel.green},
                                        ${pixel.blue},
                                        ${pixel.alpha})`;
            ctx.fillRect(root.mapped_x, root.mapped_y, 1, 1);
            return;
        }

        this.convertQuadtreeTo2DPixels(root.nwChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.neChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.swChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.seChild, pixels, ctx);
        return;
    }

    public averageColor(...nodes: QuadtreeNode<RgbaPixel>[]): RgbaPixel {
        let avgRed: number = 0,
            avgGreen: number = 0,
            avgBlue: number = 0;

        nodes.forEach(element => {
            avgRed += (<RgbaPixel>element.data).red;
            avgGreen += (<RgbaPixel>element.data).green;
            avgBlue += (<RgbaPixel>element.data).blue;
        });

        return new RgbaPixel(avgRed / nodes.length, avgGreen / nodes.length, avgBlue / nodes.length);
    }
}
