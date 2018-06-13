import { GraphVertex } from '../../data-structures/graph-vertex';
import { IGraph } from '../../interfaces/i-graph';
import TreeUtility from '../../utility/tree-utility';
import { HeapType } from './enum-heap-type';

export class Heap {
    private heapArray: GraphVertex[] = [];
    private numNeighbors = 2;
    private levels = [];
    private type: HeapType // Can be MIN or MAX
    private root: GraphVertex;

    constructor(type: HeapType = null) {
        this.type = type || HeapType.MAX;
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

    private _insert(heap: GraphVertex[], data: any) {
		let newEntry = new GraphVertex(data, this.numNeighbors);
		this.heapArray.push(newEntry);

		if (this.heapArray.length < 3) return;

		let child = (this.heapArray.length-1)/2 % 1; // left is 0, right is .5
		let parentIdx = (Math.floor((this.heapArray.length-1)/2));
		this._heapifyUp(this.heapArray.length-1);
		this.root = this.heapArray[1];
    }

    private buildHeap(root: GraphVertex, heap: GraphVertex[]) {
        if (heap.length > 2) {
			// Math.ceil(heap.length / 2) - 1, represents all the non leaves
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
            } else if (this.type == HeapType.MAX) {
                if (root.data < neighbor.data) {
					this.swapData(root, neighbor);
                }
            }
        }
	}
	
	// Purpose of this function is to correct all violations starting from idx
	private _heapifyDown(idx: number) {
		// if we have reached a leaf
		if ((this.heapArray.length-1)/2 < idx) return;

		let leftChildIdx = idx*2;
		let rightChildIdx = (idx*2)+1;

		if (this.type == HeapType.MIN) {
			let smallerChildKeyIdx = leftChildIdx;

			if (leftChildIdx < this.heapArray.length && rightChildIdx < this.heapArray.length) {
				smallerChildKeyIdx = this.heapArray[leftChildIdx].data > this.heapArray[rightChildIdx].data ? rightChildIdx : leftChildIdx;
			}
			
			if (this.heapArray[idx].data > this.heapArray[smallerChildKeyIdx].data) {
				this.swapData(this.heapArray[idx], this.heapArray[smallerChildKeyIdx]);
				this._heapifyDown(smallerChildKeyIdx);
			}
		}

		if (this.type == HeapType.MAX) {
			let largerChildKeyIdx = leftChildIdx;

			if (leftChildIdx < this.heapArray.length && rightChildIdx < this.heapArray.length) {
				largerChildKeyIdx = this.heapArray[leftChildIdx].data > this.heapArray[rightChildIdx].data ? leftChildIdx : rightChildIdx;
			}

			if (this.heapArray[idx].data < this.heapArray[largerChildKeyIdx].data) {
				this.swapData(this.heapArray[idx], this.heapArray[largerChildKeyIdx]);
				this._heapifyDown(largerChildKeyIdx);
			}
		}
	}

	private _heapifyUp(idx: number) {
		let parentIdx = (Math.floor(idx/2));

		// swap with parent if needed
		if (this.type == HeapType.MIN && this.heapArray[idx].data < this.heapArray[parentIdx].data) {
			this.swapData(this.heapArray[idx],this.heapArray[parentIdx]);
			this._heapifyUp(parentIdx);
		}
		else if (this.type == HeapType.MAX && this.heapArray[idx].data > this.heapArray[parentIdx].data) {
			this.swapData(this.heapArray[idx],this.heapArray[parentIdx]);
			this._heapifyUp(parentIdx);
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

    private _extractRoot(root: GraphVertex, heapArray: GraphVertex[]): GraphVertex {
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
            let extractedRoot = heapArray.pop();
			this._heapifyDown(1);

            return extractedRoot;
        }
	}
	
	public RandomPopulate() {
		for (let idx = 0; idx < 10; idx++) {
			this.insert(Math.floor(Math.random() * 100) + 1);  
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

    private _heapSort(root: GraphVertex, heapArray: GraphVertex[]) {
        if (heapArray.length < 3) {
            return;
        } else {
            let sortedHeap: GraphVertex[] = [];

            while (!this.isEmpty()) {
                sortedHeap.push(this.extractRoot());
            }

            heapArray = sortedHeap;
            heapArray.unshift(new GraphVertex(-1, this.numNeighbors));
            root = this.buildHeap(root, heapArray);

            return { "root": root, "heapArray": heapArray };
        }
    }
}