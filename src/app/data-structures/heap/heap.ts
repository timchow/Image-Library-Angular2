import { GraphVertex } from '../../models/graph-vertex';
import { IGraph } from '../../interfaces/i-graph';
import TreeUtility from '../../utility/tree-utility';
import { HeapType } from './enum-heap-type';

export class Heap {
    private heapArray: Array<GraphVertex> = [];
    private numNeighbors = 2;
    private levels = [];
    private type: HeapType // Can be MIN or MAX
    private root: GraphVertex;

    constructor(type: HeapType) {
        this.type = type;
        this.root = null;
        this.heapArray.push(new GraphVertex(-1, this.numNeighbors));
    }

    public getChildren(node: GraphVertex) {
        if (node.hasNeighbors) {
            return node.neighbors;
        }

        return null;
    }

    public insert(data: any) {
        this._insert(this.heapArray, data);
    }

    private _insert(heap: Array<GraphVertex>, data: any) {
        this.heapArray.push(new GraphVertex(data, this.numNeighbors));
        this.root = this.buildHeap(this.root, this.heapArray);

    }

    private buildHeap(root: GraphVertex, heap: Array<GraphVertex>) {
        if (heap.length > 2) {
            for (let j = Math.ceil(heap.length / 2) - 1; j > 0; j--) {
                let current = heap[j];

                if (current.neighbors[0] == null) {
                    let leftChild = heap[j * 2]
                    heap[j].neighbors[0] = leftChild;
                }

                if (current.neighbors[1] == null) {
                    let rightChild = heap[(j * 2) + 1];
                    heap[j].neighbors[1] = rightChild;
                }

                this.heapify(heap[j]);
            }
        }
        root = heap[1];
        return root;
    }

    private heapify(root: GraphVertex) {
        for (let neighbor of root.neighbors) {
            if (neighbor == null) continue;
            if (this.type == HeapType.MIN) {
                if (root.data > neighbor.data) {
                    this.swapData(root, neighbor);
                }
            }
            else if (this.type == HeapType.MAX) {
                if (root.data < neighbor.data) {
                    this.swapData(root, neighbor);
                }
            }
        }
    }

    private swapData(a: GraphVertex, b: GraphVertex) {
        let temp: GraphVertex = null;
        temp = a.data;
        a.data = b.data;
        b.data = temp;
    }

    public isEmpty(): boolean {
        return this.heapArray.length == 1 && this.heapArray[0].data == -1;
    }

    public getLevels() {

    }

    public extractRoot(): GraphVertex {
        return this._extractRoot(this.root, this.heapArray);
    }

    private _extractRoot(root: GraphVertex, heapArray: Array<GraphVertex>): GraphVertex {
        // Case: no elements
        if (heapArray.length == 1) return null;

        // Case: 1 element
        else if (heapArray.length == 2) {
            root = null;
            return heapArray.pop();
        }

        // Case: More than 1 element
        else {
            let lastElement = heapArray[heapArray.length - 1];
            this.swapData(root, lastElement);

            let rootElement = heapArray.pop();

            for (let i = 1; i < Math.floor(heapArray.length / 2); i++) {
                let current = heapArray[i];

                this.heapify(current);
            }

            return rootElement;
        }

    }

    public getHeapArray() {
        return this.heapArray;
    }

    public getHeapTree() {
        return this.root;
    }

    public heapSort() {
        let sortedHeap = this._heapSort(this.root, this.heapArray);

        this.root = sortedHeap["root"];
        this.heapArray = sortedHeap["heapArray"];
    }

    private _heapSort(root: GraphVertex, heapArray: Array<GraphVertex>) {
        if (heapArray.length < 3) {
            return;
        }
        else {
            let sortedHeap: Array<GraphVertex> = [];

            while (!this.isEmpty()) {
                sortedHeap.push(this.extractRoot());
            }

            heapArray = sortedHeap;
            heapArray.unshift(new GraphVertex(-1, this.numNeighbors));
            root = this.buildHeap(root,heapArray);

            return { "root": root, "heapArray": heapArray };
        }
    }
}