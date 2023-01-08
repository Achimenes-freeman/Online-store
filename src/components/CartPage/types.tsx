interface IProductCartData {
    productId: number;
    amount: number;
}

export interface ICartProducts {
    products: Array<IProductCartData>;
    totalPrice: number;
    changeTotalPrice: (num: number) => void;
}
