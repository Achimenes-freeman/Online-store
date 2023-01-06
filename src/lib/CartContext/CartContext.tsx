import React, { useState } from 'react';

import { TCartProductsData } from './types';

interface ICartDataChildren {
    children: React.ReactNode;
}

interface ContextValue {
    cartProducts: TCartProductsData;
    changeCartProducts: (productsId: number, amount: number) => void;
}

const cartProductsData: TCartProductsData = localStorage.getItem(
    'cart-products'
)
    ? JSON.parse(localStorage.getItem('cart-products') || '')
    : [];

export const CartContext = React.createContext<ContextValue>({
    cartProducts: [
        { productId: 1, amount: 1 },
        { productId: 2, amount: 1 },
        { productId: 3, amount: 1 },
        { productId: 4, amount: 1 },
    ],
    changeCartProducts: () => {},
});

export function CartContextProvider({ children }: ICartDataChildren) {
    const [cartProducts, setCartProducts] =
        useState<TCartProductsData>(cartProductsData);

    const changeCartProducts = (productId: number, amount: number) => {
        setCartProducts([...cartProducts, { productId, amount }]);
    };

    const [value] = useState<ContextValue>({
        cartProducts: [
            { productId: 1, amount: 1 },
            { productId: 2, amount: 1 },
            { productId: 3, amount: 1 },
            { productId: 4, amount: 1 },
        ],
        changeCartProducts,
    });

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}
