import { QuadtreeNode } from './quadtree-node';
import { Photo } from '../../models/image/image';
import { RgbaPixel } from '../../models/image/rgba-pixel';
import { SvgElement } from '../../models/image/svg-element';
import { Queue } from '../../abstract-data-types/queue/queue';

export class Quadtree {
    public root: QuadtreeNode<RgbaPixel> ;
    public resolution: number;

    constructor(otherQuadtree: Quadtree = null) {
        if (otherQuadtree == null) {
            this.root = null;
        } else {
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

    private _buildTree(root: QuadtreeNode<RgbaPixel> , image: Photo, offset: number, res: number, x: number, y: number): QuadtreeNode<RgbaPixel> {
        if (res == 1) {
            root = new QuadtreeNode<RgbaPixel>(image.getPixel(x - 1, y - 1));
            root.mapped_x = x - 1;
            root.mapped_y = y - 1;
            root.min_children_x = x - 1;
            root.max_children_x = x - 1;
            root.min_children_y = y - 1;
			root.max_children_y = y - 1;
        } else {
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
        this.root = this._prune(this.root, tolerance);
    }

    private _prune(root: QuadtreeNode<RgbaPixel> , tolerance: number): QuadtreeNode<RgbaPixel> {
		if (this.shouldPrune(root, root, tolerance)) {
			root = this.clearChildren(root);
			root.isPrunedRoot = true;
        } else {
            root.neChild = this._prune(root.neChild, tolerance);
            root.nwChild = this._prune(root.nwChild, tolerance);
            root.seChild = this._prune(root.seChild, tolerance);
            root.swChild = this._prune(root.swChild, tolerance);
        }

        return root;
    }

    private shouldPrune(root: QuadtreeNode<RgbaPixel> , cursor: QuadtreeNode<RgbaPixel> , tolerance: number): boolean {
        if (cursor.isLeaf) {
            return this.colorDifference(root, cursor) <= tolerance;;
		}
		
		return this.shouldPrune(root, cursor.neChild, tolerance) &&
				this.shouldPrune(root, cursor.nwChild, tolerance) &&
				this.shouldPrune(root, cursor.seChild, tolerance) &&
				this.shouldPrune(root, cursor.swChild, tolerance);

	}
	
    public colorDifference(a: QuadtreeNode<RgbaPixel>, b: QuadtreeNode<RgbaPixel> ): number {
        return Math.pow(a.data.red - b.data.red, 2) +
            Math.pow(a.data.green - b.data.green, 2) +
            Math.pow(a.data.blue - b.data.blue, 2);
    }

    private clearChildren(root: QuadtreeNode<RgbaPixel> ): QuadtreeNode<RgbaPixel> {
		root.neChild = null;
		root.nwChild = null;
		root.seChild = null;
		root.swChild = null;

        return root;
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
        if (root.isLeaf) {
            let pixel = root.data;
			ctx.fillStyle = `rgb(${pixel.red},${pixel.green},${pixel.blue})`;
			
			if (root.isPrunedRoot) {
				ctx.fillRect(root.min_children_x,root.min_children_y,root.max_children_x-root.min_children_x+1,root.max_children_y-root.min_children_y+1);
			}
			else {
				ctx.fillRect(root.mapped_x, root.mapped_y, 1, 1);
			}
            
            return;
        }

        this.convertQuadtreeTo2DPixels(root.nwChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.neChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.swChild, pixels, ctx);
        this.convertQuadtreeTo2DPixels(root.seChild, pixels, ctx);
    }

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

    public colorMap(root: QuadtreeNode <RgbaPixel> , cursor: QuadtreeNode <RgbaPixel> ) {
        if (!cursor.neChild) {
            cursor.data = root.data;
            return;
        }

        this.colorMap(root, cursor.neChild);
        this.colorMap(root, cursor.nwChild);
        this.colorMap(root, cursor.seChild);
        this.colorMap(root, cursor.swChild);
    }

    public getQuadTreeHeight(): number {
        return Math.log2(this.resolution);
    }

    private getLevelsOfQuadTree(): QuadtreeNode < RgbaPixel > [][] {
		let levels: QuadtreeNode < RgbaPixel > [][] = [],
			level: QuadtreeNode < RgbaPixel > [] = [this.root];
        levels.push(level);

        for (let idx = 0; idx < this.getQuadTreeHeight(); idx++) {
            let item = levels[idx];
            level = [];
            item.forEach((node: QuadtreeNode < RgbaPixel > ) => {
                if (node.nwChild) {
                    level.push(node.nwChild);
                }
                if (node.neChild) {
                    level.push(node.neChild);
                }
                if (node.swChild) {
                    level.push(node.swChild);
                }
                if (node.seChild) {
                    level.push(node.seChild);
                }
            });
            levels.push(level);
        }
        return levels;
    }

    private appendLevelElementsToSVG(levels: QuadtreeNode < RgbaPixel > [][], svg: HTMLElement): HTMLElement {
        let numLeaves = levels[levels.length - 1].length;
        let width = (numLeaves * 60) + 10;
        let height = this.getQuadTreeHeight() * 1000;
        svg.setAttribute("width", width.toString() + "px");
        svg.setAttribute("height", height.toString() + "px");
        let heightDif = 800;
        levels = levels.reverse();
        let x_position = 10;
        levels.forEach(level => {
            let idx = 1;
            level.forEach(node => {
                if (node.neChild == null && node.nwChild == null && node.swChild == null && node.seChild == null) {
                    node.svgElement.x = x_position;
                    node.svgElement.y = height - 10;
                    x_position += 50;
                } else {
                    node.svgElement.x = (node.neChild.svgElement.x + node.nwChild.svgElement.x + node.swChild.svgElement.x + node.seChild.svgElement.x) / 4;
                    node.svgElement.y = (node.neChild.svgElement.y - heightDif);
                }

                if (!node.isActive) {
                    node.svgElement.setAttribute("fill", "white");
                }

                if (node.nwChild) {

                    let nwLine = new SvgElement("line");

                    nwLine.setAttribute("x1", node.nwChild.svgElement.x.toString());
                    nwLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                    nwLine.setAttribute("x2", node.svgElement.x.toString());
                    nwLine.setAttribute("y2", node.svgElement.y.toString());
                    nwLine.setAttribute("stroke-width", "2");
                    nwLine.setAttribute("stroke", node.nwChild.isActive ? "black" : "white");
                    svg.appendChild(nwLine.element);
                }

                if (node.neChild) {
                    let neLine = new SvgElement("line");
                    neLine.setAttribute("x1", node.neChild.svgElement.x.toString());
                    neLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                    neLine.setAttribute("x2", node.svgElement.x.toString());
                    neLine.setAttribute("y2", node.svgElement.y.toString());
                    neLine.setAttribute("stroke-width", "2");
                    neLine.setAttribute("stroke", node.neChild.isActive ? "black" : "white");
                    svg.appendChild(neLine.element);
                }

                if (node.swChild) {
                    let swLine = new SvgElement("line");
                    swLine.setAttribute("x1", node.swChild.svgElement.x.toString());
                    swLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                    swLine.setAttribute("x2", node.svgElement.x.toString());
                    swLine.setAttribute("y2", node.svgElement.y.toString());
                    swLine.setAttribute("stroke-width", "2");
                    swLine.setAttribute("stroke", node.swChild.isActive ? "black" : "white");
                    svg.appendChild(swLine.element);
                }


                if (node.seChild) {
                    let seLine = new SvgElement("line");
                    seLine.setAttribute("x1", node.seChild.svgElement.x.toString());
                    seLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                    seLine.setAttribute("x2", node.svgElement.x.toString());
                    seLine.setAttribute("y2", node.svgElement.y.toString());
                    seLine.setAttribute("stroke-width", "2");
                    seLine.setAttribute("stroke", node.seChild.isActive ? "black" : "white");
                    svg.appendChild(seLine.element);
                }

                node.svgElement.setAttribute("cx", node.svgElement.x + "px");
                node.svgElement.setAttribute("cy", node.svgElement.y + "px");
                node.svgElement.setAttribute("height", "10px");
                node.svgElement.setAttribute("width", "10px")
                node.svgElement.setAttribute("r", "20px");

                svg.appendChild(node.svgElement.element);
            });
            height = height - 100;
            idx++;
        });

        return svg;
    }

    public prettyPrint(): void {
        let levels: QuadtreeNode < RgbaPixel > [][] = this.getLevelsOfQuadTree();

        let svg = document.getElementById("svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("version", "1.1")

        svg = this.appendLevelElementsToSVG(levels, svg);
        let appImage = document.getElementsByTagName("app-image");
        appImage[0].appendChild(svg);

    }

    private fillQueue(root: QuadtreeNode<RgbaPixel>, q: Queue): void {
        if (!root.neChild) return;


    }
}