import { SvgElement } from '../models/image/svg-element';

export class GraphVertex {
    public data: any;
    public visited: boolean;
    public neighbors: GraphVertex[] = [];
    public svgElements: SvgElement[];
    public svgCoord: {"x","y"};

    constructor(value: any, numNeighbors: number) {
        this.data = value;
        this.visited = false;
        this.initializeNeighbors(numNeighbors);
        this.createElement("circle");
        this.createElement("text");
    }

    private initializeNeighbors(numNeighbors: number) {
        this.neighbors = [];
        
        for(let i = 0; i < numNeighbors; i++) {
            this.neighbors.push(null);
        }
    }

    get hasNeighborsSVG(): boolean {
        return !this.neighbors.every(x => x.data == -1);
    }

    get hasNeighbors(): boolean {
        return !this.neighbors.every(x => x == null);
    }

    public createElement(type: string) {
        if (this.svgElements == null) {
            this.svgElements = [];
        }
        this.svgElements.push(new SvgElement(type));
    }
}
