export class SvgElement {
    private svgUrl = "http://www.w3.org/2000/svg";
    public element: Element;
    private parent: Element;
    public x: number;
    public y: number;
    public type: string;

    constructor(type: string) {
        this.element = document.createElementNS(this.svgUrl, type);
        this.type = type;
    }

    public setAttribute(name: string, value: string) {
        this.element.setAttribute(name,value);
    }

}
