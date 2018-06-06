import { GraphVertex } from '../models/graph-vertex';
import { IGraph } from '../interfaces/i-graph';
import { SvgElement } from '../models/image/svg-element';

export default class TreeUtility {
    static prettyPrint(root: GraphVertex, svg): {"levels","width","height"} {
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

    static SetSVGPositionsForLevels(levels: GraphVertex[][], svgWidth: number, svgHeight: number) {
        setSVGPositionsForLevelElements(levels, svgWidth, svgHeight)
    }

    static KeyExists(root: GraphVertex, key: any): boolean {
        return _findKey(root, key) != null;
    }

    static FindKey(root:GraphVertex, key: any): GraphVertex {
        return _findKey(root, key);
    }
}

// Private functions - not exposed as a part of static class ListUtility

export function _getLevelsOfTree(root: GraphVertex) {
	let height = _height(root),
		numNeighbors = root.neighbors.length,
		clonedRoot = _clone(root, height + 1),
		levels: GraphVertex[][] = getLevelsOfTree(clonedRoot, height);

    return levels;
}

export function _prettyPrint(root: GraphVertex, svg: HTMLElement): {"levels","width","height"} {
	let height = _height(root),
		numNeighbors = root.neighbors.length,
		clonedRoot = _clone(root, height + 1),
		levels: GraphVertex[][] = getLevelsOfTree(clonedRoot, height);

	let obj = setSVGPositionsForLevelElements(levels,svg.clientWidth,svg.clientHeight);
	levels = obj.levels;

    return {
		levels: levels,
		width: obj.width+(obj.width/2),
		height: obj.height+(100)
	};
}

export function getLevelsOfTree(root: GraphVertex, height: number): GraphVertex[][] {
	let levels: GraphVertex[][] = [],
		level: GraphVertex[] = [root];

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

// Refactor the name
export function setSVGPositionsForLevelElements(levels: GraphVertex[][], svgWidth: number, svgHeight: number) {

	let numLeaves = levels[levels.length - 1].length,
		horizontalSpaceBetweenLeaves = 150,
		verticalDistanceBetweenNodes = 100,
		width = horizontalSpaceBetweenLeaves * numLeaves,
		height = verticalDistanceBetweenNodes * levels.length;

    levels = levels.reverse();
	let x_position = width / 2,
	idx = 1;

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

    return {
		levels: levels,
		width: width,
		height: height
	}
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
	let clonedRoot = _clone(root, height + 1),
		levels: GraphVertex[][] = [],
		level: GraphVertex[] = [clonedRoot];
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

	let data = root ? root.data : -1,
		numNeighbors = root ? root.neighbors.length : 2/*handle this later*/,
		newRoot = new GraphVertex(data, numNeighbors);

    for (let idx = 0; idx < numNeighbors; idx++) {
        newRoot.neighbors[idx] = _clone(root ? root.neighbors[idx] : null, height, depth + 1);
    }

    return newRoot;
}

export function _findKey(root: GraphVertex, key: any) {
    if (!root) {
        return null;
    }

    if (root.data == key) {
        return root;
    }

    let result: GraphVertex = null;

    root.neighbors.forEach(neighbor => {
        let temp = _findKey(neighbor, key);
        if (temp) {
            result = temp;
        }
    });

    return result;
}

export function _removeKey(root: GraphVertex, key: any): void {
    if (!root) {
        return;
    }

    if (root.data == key) {

    }
}