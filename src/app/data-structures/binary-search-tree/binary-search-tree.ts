import { GraphVertex } from '../graph-vertex';
import { IGraph } from '../../interfaces/i-graph';
import TreeUtility from '../../utility/tree-utility';

export class BinarySearchTree implements IGraph {

    private root: GraphVertex;
    private numNeighbors = 2;
    private levels = [];

    constructor() {
        this.root = null;
	}
	
	public GetRoot() {
		return this.root;
	}

    public neighbors(v: GraphVertex): GraphVertex[] {
        return null;
    }

    public addVertex(data: any): void {
        if (this.keyExists(Math.floor(data))) return; // Enforcing unique keys

        if (!this.root) this.root = new GraphVertex(data, this.numNeighbors);

        else {
            this.root = this._addVertex(this.root, data);
        }
    }

    public removeVertex(v: GraphVertex): void {

    }

    public removeVertexWithKey(key: any): void {
        let nodeToRemove = this.findVertex(key);
        let parent = this.findParentOfGivenKey(this.root, nodeToRemove.data);


        if (nodeToRemove) {
            // no children
            if (nodeToRemove.data == this.root.data) {
                let successor = this.findSuccessor(nodeToRemove.neighbors[1], null);

                if (successor) {
                    nodeToRemove = successor
                    successor = null;
                    this.root = nodeToRemove;
                }
            }
            else if (!nodeToRemove.hasNeighbors) {
                if (parent.neighbors[0].data == nodeToRemove.data) {
                    parent.neighbors[0] = null;
                        nodeToRemove = null;
                }
                else {
                    parent.neighbors[1] = null;
                        nodeToRemove = null;
                }
            }
            // 1 child - right child present
            else if ((nodeToRemove.neighbors[0] == null && nodeToRemove.neighbors[1] != null)) {
                // parent's left child needs to be removed
                if (parent.neighbors[0] != null) {
                    if (parent.neighbors[0].data == nodeToRemove.data) {
                        parent.neighbors[0] = nodeToRemove.neighbors[1];
                        nodeToRemove = null;
                    }
                }
                else if (parent.neighbors[1] != null) {
                    if (parent.neighbors[1].data == nodeToRemove.data) {
                        parent.neighbors[1] = nodeToRemove.neighbors[1];
                        nodeToRemove = null;
                    }
                }

            }
            // 1 child - left child present
            else if ((nodeToRemove.neighbors[0] != null && nodeToRemove.neighbors[1] == null)) {
                if (parent.neighbors[0] != null) {
                    if (parent.neighbors[0].data == nodeToRemove.data) {
                        parent.neighbors[0] = nodeToRemove.neighbors[0];
                        nodeToRemove = null;
                    }
                }
                if (parent.neighbors[1] != null) {
                    if (parent.neighbors[1].data == nodeToRemove.data) {
                        parent.neighbors[1] = nodeToRemove.neighbors[0];
                        nodeToRemove = null;
                    }
                }

            }
            // 2 children
            else {
                let successor = this.findSuccessor(nodeToRemove.neighbors[1], null);

                if (successor) {
                    nodeToRemove.data = successor.data;
                    successor = null;
                }
            }

        }
    }

    private findParentOfGivenKey(root: GraphVertex, key): GraphVertex {
        if (!root) {
            return null;
        }

        if (root.neighbors[0]) {
            if (root.neighbors[0].data == key) {
                return root;
            }
        }
        if (root.neighbors[1]) {
            if (root.neighbors[1].data == key) {
                return root;
            }
        }


        let result = null;
        root.neighbors.forEach(neighbor => {
            let temp = this.findParentOfGivenKey(neighbor, key);

            if (temp) {
                result = temp;
            }
        });

        return result;
    }

    private _removeVertex(root: GraphVertex, v: GraphVertex) {

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
            return new GraphVertex(data, this.numNeighbors);
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
            "right": this._print(right)
        };
    }

    public height() {
        return TreeUtility.height(this.root);
    }

    public prettyPrint(svg): HTMLElement {
        //return TreeUtility.prettyPrint(this.root, svg);
		return null;
	}


    public Convert() {
        return TreeUtility.ConvertToPerfectTree(this.root, this.height(), this.numNeighbors);
    }

    public GetLevelsOfTree() {
        return TreeUtility.GetLevelsOfTree(this.root);
    }

    public getTreeLevelsWithPositions() {
        this.levels = this.GetLevelsOfTree();
        TreeUtility.SetSVGPositionsForLevels(this.levels, 1300, 1000);

        console.log(this.levels)
    }

    public keyExists(key: any): boolean {
        return TreeUtility.KeyExists(this.root, key);
    }

    public findVertex(key: any): GraphVertex {
        return TreeUtility.FindKey(this.root, key);
    }

    // Smallest value the right subtree
    private findSuccessor(root: GraphVertex, successor: GraphVertex): GraphVertex {
        if (!root) {
            return successor;
        }

        return this.findSuccessor(root.neighbors[0], root);
    }
}