export type TProduct = {
    id?: number;
    name: string;
};
export declare class Product {
    id: number | undefined;
    name: string;
    constructor({ id, name }: TProduct);
}
