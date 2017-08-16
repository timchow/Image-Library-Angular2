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
        this.root.nwChild = this._buildTree(this.root.nwChild, image, Math.log2(resolution) - 1, resolution / 2, 1, 1);
        this.root.neChild = this._buildTree(this.root.neChild, image, Math.log2(resolution) - 1, resolution / 2, 1 + resolution / 2, 1);
        this.root.swChild = this._buildTree(this.root.swChild, image, Math.log2(resolution) - 1, resolution / 2, 1, 1 + resolution / 2);
        this.root.seChild = this._buildTree(this.root.seChild, image, Math.log2(resolution) - 1, resolution / 2, 1 + resolution / 2, 1 + resolution / 2);
        this.root.min_children_x = 0;
        this.root.max_children_x = image.height - 1;
        this.root.min_children_y = 0;
        this.root.max_children_y = image.height - 1;

        this.root.data = this.averageColor(this.root.nwChild, this.root.neChild, this.root.swChild, this.root.seChild);
    }

    private _buildTree(root: QuadtreeNode<RgbaPixel>, image: Photo, offset: number, res: number, x: number, y: number): QuadtreeNode<RgbaPixel> {
        if (res == 1) {
            root = new QuadtreeNode<RgbaPixel>(image.getPixel(x - 1, y - 1));
            root.mapped_x = x - 1;
            root.mapped_y = y - 1;
            root.min_children_x = x - 1;
            root.max_children_x = x - 1;
            root.min_children_y = y - 1;
            root.max_children_y = y - 1
        }
        else {
            root = new QuadtreeNode<RgbaPixel>();

            root.nwChild = this._buildTree(root.nwChild, image, offset - 1, res / 2, x, y);
            root.neChild = this._buildTree(root.neChild, image, offset - 1, res / 2, x + Math.pow(2, offset - 1), y);
            root.swChild = this._buildTree(root.swChild, image, offset - 1, res / 2, x, y + Math.pow(2, offset - 1));
            root.seChild = this._buildTree(root.seChild, image, offset - 1, res / 2, x + Math.pow(2, offset - 1), y + Math.pow(2, offset - 1));

            root.min_children_x = Math.min(root.nwChild.min_children_x, root.neChild.min_children_x, root.swChild.min_children_x, root.seChild.min_children_x);
            root.min_children_y = Math.min(root.nwChild.min_children_y, root.neChild.min_children_y, root.swChild.min_children_y, root.seChild.min_children_y);
            root.max_children_x = Math.max(root.nwChild.max_children_x, root.neChild.max_children_x, root.swChild.max_children_x, root.seChild.max_children_x);
            root.max_children_y = Math.max(root.nwChild.max_children_y, root.neChild.max_children_y, root.swChild.max_children_y, root.seChild.max_children_y);

            root.data = this.averageColor(root.nwChild, root.neChild, root.swChild, root.seChild);
        }

        return root;
    }

    public prune(tolerance: number): void {
        debugger;
        this.root = this._prune(this.root, tolerance);
        debugger;
    }

    private _prune(root: QuadtreeNode<RgbaPixel>, tolerance: number): QuadtreeNode<RgbaPixel> {
        if (this.shouldPrune(root, root, tolerance)) {
            root = this.clearChildren(root);
        }
        else {
            root.neChild = this._prune(root.neChild, tolerance);
            root.nwChild = this._prune(root.nwChild, tolerance);
            root.seChild = this._prune(root.seChild, tolerance);
            root.swChild = this._prune(root.swChild, tolerance);
        }

        return root;
    }

    private shouldPrune(root: QuadtreeNode<RgbaPixel>, cursor: QuadtreeNode<RgbaPixel>, tolerance: number): boolean {
        if (cursor == null) {
            return true;
        }

        return this.colorDifference(root, cursor) <= tolerance &&
            this.shouldPrune(root, cursor.nwChild, tolerance) &&
            this.shouldPrune(root, cursor.neChild, tolerance) &&
            this.shouldPrune(root, cursor.seChild, tolerance) &&
            this.shouldPrune(root, cursor.swChild, tolerance);
    }

    private clearChildren(root: QuadtreeNode<RgbaPixel>): QuadtreeNode<RgbaPixel> {
        root.neChild = null;
        root.nwChild = null;
        root.seChild = null;
        root.swChild = null;

        return root;
    }

    private convertQuadtreeTo2DPixels(root: QuadtreeNode<RgbaPixel>, pixels: RgbaPixel[][], ctx: CanvasRenderingContext2D): void {
        if (!root) return;

        // at a leaf
        if (root.neChild == null && root.nwChild == null && root.swChild == null && root.seChild == null) {
            let pixel = root.data;
            if (root.mapped_x && root.mapped_y) {
                ctx.fillStyle = `rgb(${Math.floor(pixel.red)},
                                        ${Math.floor(pixel.green)},
                                        ${Math.floor(pixel.blue)})`;
                ctx.fillRect(root.mapped_x, root.mapped_y, 1, 1);
                debugger;
                //return;
            }
            else if (root.min_children_x) {
                pixel = root.data;
                ctx.fillStyle = ctx.strokeStyle = `rgb(${Math.floor(pixel.red)},${Math.floor(pixel.green)},${Math.floor(pixel.blue)})`;
                ctx.lineWidth = 5;
                ctx.strokeRect(root.min_children_x, root.min_children_y, root.max_children_x - root.min_children_x + 1, root.max_children_y - root.min_children_y + 1);
                ctx.fillRect(root.min_children_x, root.min_children_y, root.max_children_x - root.min_children_x + 1, root.max_children_y - root.min_children_y + 1);
            }
        }

        this.convertQuadtreeTo2DPixels(root.nwChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.neChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.swChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.seChild, pixels, ctx);
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

    /*
    private convertQuadtreeTo2DPixels(root: QuadtreeNode<RgbaPixel>, pixels: RgbaPixel[][], ctx: CanvasRenderingContext2D): void {
        if (!root.neChild && !root.nwChild && !root.swChild && !root.seChild) {
            let pixel = root.data;
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
    }*/

    public averageColor(...nodes: QuadtreeNode<RgbaPixel>[]): RgbaPixel {
        let totalRed: number = 0,
            totalGreen: number = 0,
            totalBlue: number = 0;

        nodes.forEach(element => {
            totalRed += (<RgbaPixel>element.data).red;
            totalGreen += (<RgbaPixel>element.data).green;
            totalBlue += (<RgbaPixel>element.data).blue;
        });

        return new RgbaPixel(totalRed / nodes.length, totalGreen / nodes.length, totalBlue / nodes.length);
    }

    public colorDifference(a: QuadtreeNode<RgbaPixel>, b: QuadtreeNode<RgbaPixel>): number {
        return Math.pow(a.data.red - b.data.red, 2) +
            Math.pow(a.data.green - b.data.green, 2) +
            Math.pow(a.data.blue - b.data.blue, 2);
    }

    public colorMap(root: QuadtreeNode<RgbaPixel>, cursor: QuadtreeNode<RgbaPixel>) {
        if (!cursor.neChild) {
            cursor.data = root.data;
            return;
        }

        this.colorMap(root, cursor.neChild);
        this.colorMap(root, cursor.nwChild);
        this.colorMap(root, cursor.seChild);
        this.colorMap(root, cursor.swChild);
    }
}
