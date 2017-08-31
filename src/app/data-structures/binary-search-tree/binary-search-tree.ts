import { GraphVertex } from '../../models/graph-vertex';
import { IGraph } from '../../interfaces/i-graph';
import PrintUtility from '../../utility/print-utility';

export class BinarySearchTree implements IGraph {

    private root: GraphVertex;
    private numNeighbors = 2;

    constructor() {
        this.root = null;
    }

    public neighbors(v: GraphVertex): Array<GraphVertex> {
        return null;
    }

    public addVertex(data: any): void {
        if (!this.root) this.root = new GraphVertex(data,this.numNeighbors);

        else {
            this.root = this._addVertex(this.root,data);
        }
    }

    public removeVertex(v: GraphVertex): void {

    }

    public getVertexValue(v: GraphVertex): any {

    }

    public setVertexValue(v: GraphVertex, value: any) {

    }

    public findMin(): any {
        return this._findMin(this.root);
    }

    private _findMin(root: GraphVertex): any {
        if (!root.neighbors[0] && !root.neighbors[1]) return root.data;

        return this._findMin(root.neighbors[0]);
    }

    public findMax(): any {
        return this._findMax(this.root);
    }

    private _findMax(root: GraphVertex): any {
        if (!root.neighbors[0] && !root.neighbors[1]) return root.data;

        return this._findMin(root.neighbors[1]);
    }

    public _addVertex(root, data): GraphVertex {
        if (!root) {
            return new GraphVertex(data,this.numNeighbors);
        }

        let left = root.neighbors[0],
            right = root.neighbors[1];

        if (root.data < data) {
            root.neighbors[1] = this._addVertex(right, data);
        }
        else {
            root.neighbors[0] = this._addVertex(left, data);
        }
        return root;
    }

    public print() {
        return this._print(this.root);
    }

    private _print(root) {
        if (!root) return null;

        let left = root.neighbors[0],
            right = root.neighbors[1];

        return { 
                "data": root.data, 
                "left": this._print(left), 
                "right": this._print(right) };
    }

    public height() {
        return PrintUtility.height(this.root);
    }

    public prettyPrint(svg): HTMLElement {
        return PrintUtility.prettyPrint(this.root,svg);
    }

    public Convert() {
        return PrintUtility.ConvertToPerfectTree(this.root, this.height(), this.numNeighbors);
    }
}
