import { RgbaPixel } from '../image/rgba-pixel';
import { SvgElement } from '../image/svg-element';

export class QuadtreeNode<T> {

    public nwChild: QuadtreeNode<T>
    public neChild: QuadtreeNode<T>;
    public swChild: QuadtreeNode<T>;
    public seChild: QuadtreeNode<T>;
    public data: T;
    public mapped_x: number;
    public mapped_y: number;
    public min_children_x: number;
    public max_children_x: number;
    public min_children_y: number;
    public max_children_y: number;
    public svgElement: SvgElement;
	public isActive: boolean;
	public isPrunedRoot: boolean;
	public get isLeaf(): boolean {
		return !this.neChild && !this.nwChild && !this.swChild && !this.seChild;
	}

    constructor(_data: T = null) {
        this.nwChild = null;//new QuadtreeNode<T>();
        this.neChild = null;//new QuadtreeNode<T>();
        this.swChild = null;//new QuadtreeNode<T>();
        this.seChild = null;//new QuadtreeNode<T>();

        this.data = _data;
		this.isActive = true;
		this.isPrunedRoot = false;
        this.createElement("circle");
    }


    public createElement(type: string): SvgElement {
        this.svgElement = new SvgElement(type);
        
        if (this.data instanceof RgbaPixel) {
            this.svgElement.setAttribute("fill",`rgb(${(<RgbaPixel><any>this.data).red},${(<RgbaPixel><any>this.data).green},${(<RgbaPixel><any>this.data).blue})`);
        }
        
        return this.svgElement;
	}
}
