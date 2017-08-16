import { RgbaPixel } from '../image/rgba-pixel';

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

    constructor(_data: T = null) {
        this.nwChild = null;//new QuadtreeNode<T>();
        this.neChild = null;//new QuadtreeNode<T>();
        this.swChild = null;//new QuadtreeNode<T>();
        this.seChild = null;//new QuadtreeNode<T>();

        this.data = _data;
    }
}
