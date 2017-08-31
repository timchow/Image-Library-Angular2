import { GraphVertex } from '../models/graph-vertex';
import { IGraph } from '../interfaces/i-graph';
import { SvgElement } from '../models/image/svg-element';

export default class PrintUtility {
    static prettyPrint(root: GraphVertex, svg): HTMLElement {
        return _prettyPrint(root, svg);
    }

    static height(root: GraphVertex) {
        return _height(root) - 1;
    }

    static ConvertToPerfectTree(root: GraphVertex, height: number, numNeighbors: number) {
        return _convertToPerfectTree(root, height, numNeighbors);
    }
}

// Private functions - not exposed as a part of static class ListUtility

export function _prettyPrint(root: GraphVertex, svg): HTMLElement {
    let height = _height(root);
    let numNeighbors = root.neighbors.length;
    let clonedRoot = _clone(root, height + 1);
    let levels: Array<Array<GraphVertex>> = getLevelsOfTree(clonedRoot, height);

    debugger;
    svg = appendLevelElementsToSVG(levels, svg);
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

// TODO: Make this work!
export function appendLevelElementsToSVG(levels: Array<Array<GraphVertex>>, svg: HTMLElement): HTMLElement {
    let numLeaves = levels[levels.length - 1].length;
    let width = (numLeaves * 800) + 10;
    let height = levels.length * 1000;
    svg.setAttribute("width", width.toString() + "px");
    svg.setAttribute("height", height.toString() + "px");
    let heightDif = 1000;
    levels = levels.reverse();
    let x_position = width/2;
    let idx = 1;
    levels.forEach(level => {
        level.forEach(node => {
            // leaves
            if (idx == 1) {
                node.svgCoord = {"x": x_position, 
                                "y": height-100};
                x_position += 300;
            }
            // inner nodes
            else {
                node.svgCoord = {"x": node.neighbors.map(n => n.svgCoord.x).reduce((x1, x2) => x1 + x2) / node.neighbors.length,
                                 "y": (node.neighbors.map(n => n.svgCoord).find(n => n != null).y - heightDif)}

                node.neighbors.forEach(neighbor => {
                    let line = new SvgElement("line");

                    line.setAttribute("x1", neighbor.svgCoord.x.toString());
                    line.setAttribute("y1", neighbor.svgCoord.y.toString());
                    line.setAttribute("x2", node.svgCoord.x.toString());
                    line.setAttribute("y2", node.svgCoord.y.toString());
                    line.setAttribute("stroke-width", "2");
                    line.setAttribute("stroke", "black");
                    if (neighbor.data != -1) {
                        svg.appendChild(line.element);
                    }
                    
                });
            }

            node.svgElements.find(n => n.type == "circle" ).setAttribute("cx", node.svgCoord.x + "px");
            node.svgElements.find(n => n.type == "circle").setAttribute("cy", node.svgCoord.y + "px");
            node.svgElements.find(n => n.type == "text" ).setAttribute("x", node.svgCoord.x-20 + "px");
            node.svgElements.find(n => n.type == "text").setAttribute("y", node.svgCoord.y+20 + "px");
            node.svgElements.find(n => n.type == "circle").setAttribute("height", "10px");
            node.svgElements.find(n => n.type == "circle").setAttribute("width", "10px")
            node.svgElements.find(n => n.type == "circle").setAttribute("r", "50px");
            node.svgElements.find(n => n.type == "text").setAttribute("font-size", "50px");
            node.svgElements.find(n => n.type == "text").element.innerHTML = node.data;


            if (node.data != -1) {
                node.svgElements.find(n => n.type == "circle").element.setAttribute("fill","white");
                node.svgElements.find(n => n.type == "circle").element.setAttribute("stroke","black");
                svg.appendChild(node.svgElements.find(n => n.type == "circle").element);
                
                node.svgElements.find(n => n.type == "text").element.setAttribute("fill","red");
                svg.appendChild(node.svgElements.find(n => n.type == "text").element);
            }
            
        });
        height = height - 50;
        idx++;
    });

    return svg;
}

// For tree-like structures
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