export class GraphVertex {
    public data: any;
    public visited: boolean;
    public neighbors: Array<GraphVertex>;

    constructor(value: any, numNeighbors: number) {
        this.data = value;
        this.visited = false;
        this.initializeNeighbors(numNeighbors);
    }

    private initializeNeighbors(numNeighbors: number) {
        this.neighbors = [];
        
        for(let i = 0; i < numNeighbors; i++) {
            this.neighbors.push(null);
        }
    }
}
