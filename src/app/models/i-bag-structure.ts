export interface IBagStructure {
    add(data: any): void;
    remove(): any;
    peek(): any;
    isEmpty(): boolean;
    getSize(): number;
}
