import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { ICartData } from './types';

interface ICartContext {
    cartData: ICartData;
    addProductToCart: (productId: number, price: number) => void;
    deleteProductFromCart: (productId: number) => void;
    changeProductAmount: (productId: number, amount: number) => void;
}

export const CartContext = React.createContext<ICartContext>({
    cartData: {},
    addProductToCart: () => {},
    deleteProductFromCart: () => {},
    changeProductAmount: () => {},
});

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cartData, setCartData] = useState<ICartData>({});
    // const [totalPrice, setTotalPrice] = useState<number>(0);

    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem('cart-data') || '{}'));
    }, []);

    // useEffect(() => {
    //     localStorage.setItem('cart-data', JSON.stringify(cartData));
    // }, [cartData]);

    const addProductToCart = useCallback(
        (productId: number, price: number) => {
            setCartData({ ...cartData, [productId]: { amount: 1, price } });
        },
        [cartData]
    );

    const deleteProductFromCart = useCallback(
        (productId: number) => {
            delete cartData[productId];
            const obj = { ...cartData };
            setCartData(obj);
        },
        [cartData]
    );

    const changeProductAmount = useCallback(
        (productId: number, amount: number) => {
            cartData[productId].amount = amount;
            const obj = { ...cartData };

            setCartData(obj);
        },
        [cartData]
    );

    const cartContextValue: ICartContext = useMemo(
        () => ({
            cartData,
            addProductToCart,
            deleteProductFromCart,
            changeProductAmount,
        }),
        [cartData, addProductToCart, deleteProductFromCart, changeProductAmount]
    );

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}
