export interface ICartProduct {
    productId: number;
    index: number;
    amountReceived: number;
    changeTotalPrice: (num: number) => void;
}
