import React, { useState, useEffect, useMemo, useCallback } from 'react';

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

// const cartProductsData: TCartProductsData = localStorage.getItem(
//     'cart-products'
// )
//     ? JSON.parse(localStorage.getItem('cart-products') || '')
//     : [];

export const CartContext = React.createContext<ContextValue>({
    cartProducts: [],
    addCartProduct: () => {},
    removeCartProduct: () => {},
    changeProductAmount: () => {},
});

export function CartContextProvider({ children }: ICartDataChildren) {
    const [cartProducts, setCartProducts] = useState<TCartProductsData>([]);

    useEffect(() => {
        setCartProducts(
            JSON.parse(localStorage.getItem('cart-products') || '[]')
        );
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('cart-products', JSON.stringify(cartProducts));
    // }, [cartProducts]);

    const addCartProduct = useCallback(
        (productId: number, amount: number) => {
            setCartProducts([...cartProducts, { productId, amount }]);
        },
        [cartProducts]
    );

    const removeCartProduct = useCallback(
        (productId: number) => {
            const productToRemove = cartProducts.findIndex(
                (item) => item.productId === productId
            );

            setCartProducts([
                ...cartProducts.slice(0, productToRemove),
                ...cartProducts.slice(productToRemove + 1),
            ]);
        },
        [cartProducts]
    );

    const changeProductAmount = useCallback(
        (productId: number, currentAmount: number) => {
            setCartProducts(
                cartProducts.map((item) =>
                    item.productId === productId
                        ? { ...item, amount: currentAmount }
                        : item
                )
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
