import { TProduct } from "../data/itemClass";
export declare class productsServices {
    data: TProduct[];
    constructor();
    showAll(): Promise<TProduct[]>;
    showbyID(id: number): Promise<TProduct[] | undefined>;
    createProduct(body: TProduct): Promise<void>;
}
