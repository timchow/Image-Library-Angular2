import { GraphVertex } from '../models/graph-vertex';

export interface IGraph {
    //isAdjacent(v1: GraphVertex,v2: GraphVertex): boolean;
    neighbors(v: GraphVertex): GraphVertex[];
    addVertex(v: GraphVertex): void;
    removeVertex(v: GraphVertex): void;
    //addEdge(v1: GraphVertex,v2: GraphVertex): void;
    //removeEdge(v1,v2): void;
    getVertexValue(v: GraphVertex): any;
    setVertexValue(v: GraphVertex, value: any);
}
