interface IProductCartData {
    productId: number;
    amount: number;
}

export type TCartProductsData = Array<IProductCartData>;

export type ICartProducts = {
    products?: TCartProductsData;
};
