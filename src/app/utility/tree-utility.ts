import { GraphVertex } from '../models/graph-vertex';
import { IGraph } from '../interfaces/i-graph';
import { SvgElement } from '../models/image/svg-element';

export default class TreeUtility {
    static prettyPrint(root: GraphVertex, svg): HTMLElement {
        return _prettyPrint(root, svg);
    }

    static height(root: GraphVertex) {
        return _height(root) - 1;
    }

    static ConvertToPerfectTree(root: GraphVertex, height: number, numNeighbors: number) {
        return _convertToPerfectTree(root, height, numNeighbors);
    }

    static GetLevelsOfTree(root: GraphVertex) {
        return _getLevelsOfTree(root);
    }

    static SetSVGPositionsForLevels(levels: Array<Array<GraphVertex>>, svgWidth: number, svgHeight: number) {
        setSVGPositionsForLevelElements(levels, svgWidth, svgHeight)
    }

    static KeyExists(root: GraphVertex, key: any) {
        return _keyExists(root, key);
    }
}

// Private functions - not exposed as a part of static class ListUtility

export function _getLevelsOfTree(root: GraphVertex) {
    let height = _height(root);
    let numNeighbors = root.neighbors.length;
    let clonedRoot = _clone(root, height + 1);
    let levels: Array<Array<GraphVertex>> = getLevelsOfTree(clonedRoot, height);
    return levels;
}

export function _prettyPrint(root: GraphVertex, svg): HTMLElement {
    let height = _height(root);
    let numNeighbors = root.neighbors.length;
    let clonedRoot = _clone(root, height + 1);
    let levels: Array<Array<GraphVertex>> = getLevelsOfTree(clonedRoot, height);

    debugger;
    //svg = appendLevelElementsToSVG(levels, svg);
    // Add here

    return svg;
}

export function getLevelsOfTree(root: GraphVertex, height: number): Array<Array<GraphVertex>> {
    let levels: Array<Array<GraphVertex>> = [];
    let level: Array<GraphVertex> = [root];

    levels.push(level);
    for (let idx = 0; idx < height - 1; idx++) {
        let item = levels[idx];
        level = [];
        item.forEach((node: GraphVertex) => {
            node.neighbors.forEach((n) => {
                level.push(n);
            })
        });
        levels.push(level);
    }
    return levels;
}

export function setSVGPositionsForLevelElements(levels: Array<Array<GraphVertex>>, svgWidth: number, svgHeight: number) {
    let width = svgWidth; // width of svg
    let height = svgHeight; // height of svg
    let numLeaves = levels[levels.length - 1].length;
    let horizontalSpaceBetweenLeaves = width / numLeaves;
    let verticalDistanceBetweenNodes = height / levels.length;
    levels = levels.reverse();
    let x_position = width / 2;
    let idx = 1;
    levels.forEach(level => {
        level.forEach(node => {
            // leaves
            if (idx == 1) {
                node.svgCoord = {
                    "x": x_position,
                    "y": height - 100
                };
                x_position += horizontalSpaceBetweenLeaves;
            }
            // inner nodes
            else {
                node.svgCoord = {
                    "x": node.neighbors.map(n => n.svgCoord.x).reduce((x1, x2) => x1 + x2) / node.neighbors.length,
                    "y": (node.neighbors.map(n => n.svgCoord).find(n => n != null).y - verticalDistanceBetweenNodes)
                }
            }

        });
        height = height - 25;
        idx++;
    });

    return levels;
}

// finds the height of a tree with k children, where k is a positive integer
export function _height(root: GraphVertex) {
    if (!root) {
        return 0;
    }

    let max = 0;
    for (let i = 0; i < root.neighbors.length; i++) {
        max = Math.max(max, _height(root.neighbors[i]));
    }

    return max + 1;
}

export function _convertToPerfectTree(root: GraphVertex, height: number, numNeighbors: number, depth = 0): GraphVertex {
    let clonedRoot = _clone(root, height + 1);
    let levels: Array<Array<GraphVertex>> = [];
    let level: Array<GraphVertex> = [clonedRoot];
    levels.push(level);
    let idx = 0;
    while (idx < height) {
        level = levels[idx];
        let newLevel = [];

        level.forEach((nodes) => {
            nodes.neighbors.forEach((neighbor) => {
                let data = neighbor ? neighbor.data : -1;
                neighbor = new GraphVertex(data, numNeighbors);
                newLevel.push(neighbor);
            });
        });
        levels.push(newLevel);
        idx++;
    };
    return clonedRoot;
}

// Cloning a BST into a perfect BST with placeholder nodes
export function _clone(root: GraphVertex, height, depth = 0) {
    if (depth == height) {
        return null;
    }

    let data = root ? root.data : -1;

    let numNeighbors = root ? root.neighbors.length : 2/*handle this later*/;
    let newRoot = new GraphVertex(data, numNeighbors);

    for (let idx = 0; idx < numNeighbors; idx++) {
        newRoot.neighbors[idx] = _clone(root ? root.neighbors[idx] : null, height, depth + 1);
    }

    return newRoot;
}

export function _keyExists(root: GraphVertex, key: any): boolean {
    if (!root) {
        return false;
    }

    if (root.data == key) {
        return true;
    }

    let exists: boolean = false;
    root.neighbors.forEach(neighbor => {
        exists = exists || _keyExists(neighbor, key);
    });

    return exists;
}