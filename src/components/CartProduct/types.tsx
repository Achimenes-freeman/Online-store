import { IProductData } from '../ProductPage/types';

export interface ICartProduct {
    // productId: number;
    index: number;
    // amountReceived: number;
    // changeTotalPrice: (num: number) => void;
    productData: IProductData;
    changeProductData: (productId: number) => void;
}
