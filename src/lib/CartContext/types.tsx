interface IProductCartData {
    productId: number;
    amount: number;
}

export type TCartProductsData = Array<IProductCartData>;

export interface ICartProducts {
    totalPrice: number;
}

export interface ICartData {
    [key: number]: { amount: number; price: number };
}
