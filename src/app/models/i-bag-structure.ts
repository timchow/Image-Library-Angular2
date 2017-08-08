export interface IBagStructure<T> {
    add(data: any): void;
    remove(): any;
    peek(): any;
    isEmpty(): boolean;
    getSize(): number;
}
