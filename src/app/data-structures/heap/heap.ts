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
        this.buildHeap(this.root, this.heapArray);
    }

    private buildHeap(root: GraphVertex, heap: Array<GraphVertex>) {
        if (heap.length == 2) {
            this.root = this.heapArray[1];
        }
        else if (heap.length > 2) {
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
    }

    private heapify(root: GraphVertex) {
        for (let neighbor of root.neighbors) {
            if (neighbor == null) continue;
            if (this.type == HeapType.MIN) {
                if (root.data > neighbor.data) {
                    this.swapData(root, neighbor);
                    break;
                }
            }
            else if (this.type == HeapType.MAX) {
                if (root.data < neighbor.data) {
                    this.swapData(root, neighbor);
                    break;
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

    public getHeapArray() {
        return this.heapArray;
    }

    public getHeapTree() {
        return this.root;
    }
}
