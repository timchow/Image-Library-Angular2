import { GraphVertex } from '../models/graph-vertex';
import { IGraph } from '../interfaces/i-graph';

export default class PrintUtility {
    static prettyPrint() {
        this.prettyPrint();
    }

    static height(root: GraphVertex) {
        return _height(root) - 1;
    }
}

// Private functions - not exposed as a part of static class ListUtility

export function prettyPrint() {
    let levels: Array<Array<GraphVertex>> = this.getLevelsOfQuadTree();

    let svg = document.getElementById("svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("version", "1.1")

    svg = this.appendLevelElementsToSVG(levels, svg);
}

export function getLevelsOfQuadTree(root: GraphVertex): Array<Array<GraphVertex>> {
    let levels: Array<Array<GraphVertex>> = [];
    let level: Array<GraphVertex> = [root];
    levels.push(level);

    for (let idx = 0; idx < this.getQuadTreeHeight(); idx++) {
        let item = levels[idx];
        level = [];
        item.forEach((node: GraphVertex) => {
            node.neighbors.forEach((n) => {
                if (n) {
                    level.push(n)
                }
            })
        });
        levels.push(level);
    }
    return levels;
}

/*
export function appendLevelElementsToSVG(levels: Array<Array<GraphVertex>>, svg: HTMLElement): HTMLElement {
    let numLeaves = levels[levels.length - 1].length;
    let width = (numLeaves * 60) + 10;
    let height = this.getQuadTreeHeight() * 1000;
    svg.setAttribute("width", width.toString() + "px");
    svg.setAttribute("height", height.toString() + "px");
    let heightDif = 800;
    levels = levels.reverse();
    let x_position = 10;
    levels.forEach(level => {
        let idx = 1;
        level.forEach(node => {
            if (node.neChild == null && node.nwChild == null && node.swChild == null && node.seChild == null) {
                node.svgElement.x = x_position;
                node.svgElement.y = height - 10;
                x_position += 50;
            }
            else {
                node.svgElement.x = (node.neChild.svgElement.x + node.nwChild.svgElement.x + node.swChild.svgElement.x + node.seChild.svgElement.x) / 4;
                node.svgElement.y = (node.neChild.svgElement.y - heightDif);
            }

            if (!node.isActive) {
                node.svgElement.setAttribute("fill", "white");
            }

            if (node.nwChild) {

                let nwLine = new SvgElement("line");

                nwLine.setAttribute("x1", node.nwChild.svgElement.x.toString());
                nwLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                nwLine.setAttribute("x2", node.svgElement.x.toString());
                nwLine.setAttribute("y2", node.svgElement.y.toString());
                nwLine.setAttribute("stroke-width", "2");
                nwLine.setAttribute("stroke", node.nwChild.isActive ? "black" : "white");
                svg.appendChild(nwLine.element);
            }

            if (node.neChild) {
                let neLine = new SvgElement("line");
                neLine.setAttribute("x1", node.neChild.svgElement.x.toString());
                neLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                neLine.setAttribute("x2", node.svgElement.x.toString());
                neLine.setAttribute("y2", node.svgElement.y.toString());
                neLine.setAttribute("stroke-width", "2");
                neLine.setAttribute("stroke", node.neChild.isActive ? "black" : "white");
                svg.appendChild(neLine.element);
            }

            if (node.swChild) {
                let swLine = new SvgElement("line");
                swLine.setAttribute("x1", node.swChild.svgElement.x.toString());
                swLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                swLine.setAttribute("x2", node.svgElement.x.toString());
                swLine.setAttribute("y2", node.svgElement.y.toString());
                swLine.setAttribute("stroke-width", "2");
                swLine.setAttribute("stroke", node.swChild.isActive ? "black" : "white");
                svg.appendChild(swLine.element);
            }


            if (node.seChild) {
                let seLine = new SvgElement("line");
                seLine.setAttribute("x1", node.seChild.svgElement.x.toString());
                seLine.setAttribute("y1", node.nwChild.svgElement.y.toString());
                seLine.setAttribute("x2", node.svgElement.x.toString());
                seLine.setAttribute("y2", node.svgElement.y.toString());
                seLine.setAttribute("stroke-width", "2");
                seLine.setAttribute("stroke", node.seChild.isActive ? "black" : "white");
                svg.appendChild(seLine.element);
            }

            node.svgElement.setAttribute("cx", node.svgElement.x + "px");
            node.svgElement.setAttribute("cy", node.svgElement.y + "px");
            node.svgElement.setAttribute("height", "10px");
            node.svgElement.setAttribute("width", "10px")
            node.svgElement.setAttribute("r", "20px");

            svg.appendChild(node.svgElement.element);
        });
        height = height - 100;
        idx++;
    });

    return svg;
}
*/

// For tree-like structures
export function _height(root: GraphVertex) {
    if (!root) {
        return 0;
    }

    let max = 0;
    for (let i = 0; i < root.neighbors.length; i++) {
         max = Math.max(max,_height(root.neighbors[i]));
    }

    return max + 1;
}