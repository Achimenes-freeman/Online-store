import React, { useState, useMemo, useCallback } from 'react';

import { TCartProductsData } from './types';

interface ICartDataChildren {
    children: React.ReactNode;
}

interface ContextValue {
    cartProducts: TCartProductsData;
    addCartProduct: (productsId: number, amount: number) => void;
    removeCartProduct: (productId: number) => void;
    changeProductAmount: (productId: number, currentAmount: number) => void;
}

const cartProductsData: TCartProductsData = localStorage.getItem(
    'cart-products'
)
    ? JSON.parse(localStorage.getItem('cart-products') || '')
    : [];

export const CartContext = React.createContext<ContextValue>({
    cartProducts: cartProductsData,
    addCartProduct: () => {},
    removeCartProduct: () => {},
    changeProductAmount: () => {},
});

export function CartContextProvider({ children }: ICartDataChildren) {
    const [cartProducts, setCartProducts] =
        useState<TCartProductsData>(cartProductsData);

    const addCartProduct = useCallback(
        (productId: number, amount: number) => {
            const newCartProducts = [...cartProducts, { productId, amount }];
            setCartProducts(newCartProducts);
            localStorage.setItem(
                'cart-products',
                JSON.stringify(newCartProducts)
            );
        },
        [cartProducts]
    );

    const removeCartProduct = useCallback(
        (productId: number) => {
            const productToRemove = cartProducts.findIndex(
                (item) => item.productId === productId
            );

            const newCartProducts = [
                ...cartProducts.slice(0, productToRemove),
                ...cartProducts.slice(productToRemove + 1),
            ];

            setCartProducts(newCartProducts);
            localStorage.setItem(
                'cart-products',
                JSON.stringify(newCartProducts)
            );
        },
        [cartProducts]
    );

    const changeProductAmount = useCallback(
        (productId: number, currentAmount: number) => {
            const newCartProducts = cartProducts.map((item) =>
                item.productId === productId
                    ? { ...item, amount: currentAmount }
                    : item
            );
            setCartProducts(newCartProducts);
            localStorage.setItem(
                'cart-products',
                JSON.stringify(newCartProducts)
            );
        },
        [cartProducts]
    );

    const contextValue = useMemo(
        () => ({
            cartProducts,
            addCartProduct,
            removeCartProduct,
            changeProductAmount,
        }),
        [cartProducts, addCartProduct, removeCartProduct, changeProductAmount]
    );

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}
