interface IProductCartData {
    productId: number;
    amount: number;
}

export type TCartProductsData = Array<IProductCartData>;

export interface ICartProducts {
    products: Array<IProductCartData>;
    totalPrice: number;
    changeTotalPrice: (num: number) => void;
}
