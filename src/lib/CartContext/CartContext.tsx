import React, { useState, useEffect, useMemo, useCallback } from 'react';

import { ICartData } from './types';

interface ICartContext {
    cartData: ICartData;
    modalState: boolean;
    addProductToCart: (productId: number, price: number) => void;
    deleteProductFromCart: (productId: number) => void;
    clearProductFromCart: () => void;
    changeProductAmount: (productId: number, amount: number) => void;
    closeModal: () => void;
    openModal: () => void;
}

export const CartContext = React.createContext<ICartContext>({
    cartData: {},
    modalState: false,
    addProductToCart: () => {},
    deleteProductFromCart: () => {},
    changeProductAmount: () => {},
    clearProductFromCart: () => {},
    closeModal: () => {},
    openModal: () => {}
});

export function CartContextProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cartData, setCartData] = useState<ICartData>({});
    const [modalState, setModalState] = useState(false);

    const closeModal = () => {
        setModalState(false)
    }
    const openModal = () => {
        setModalState(true)
    }

    useEffect(() => {
        setCartData(JSON.parse(localStorage.getItem('cart-data') || '{}'));
    }, []);

    const changeLocalStorage = (data: ICartData) => {
        localStorage.setItem('cart-data', JSON.stringify(data));
    };

    const addProductToCart = useCallback(
        (productId: number, price: number) => {
            const obj = { ...cartData, [productId]: { amount: 1, price } };
            changeLocalStorage(obj);

            setCartData(obj);
        },
        [cartData]
    );

    const deleteProductFromCart = useCallback(
        (productId: number) => {
            delete cartData[productId];
            const obj = { ...cartData };
            changeLocalStorage(obj);
            setCartData(obj);
        },
        [cartData]
    );

    const clearProductFromCart = useCallback(() => {
        changeLocalStorage({});
        setCartData({});
    }, [])

    const changeProductAmount = useCallback(
        (productId: number, amount: number) => {
            cartData[productId].amount = amount;
            const obj = { ...cartData };
            changeLocalStorage(obj);
            setCartData(obj);
        },
        [cartData]
    );

    const cartContextValue: ICartContext = useMemo(
        () => ({
            cartData,
            modalState,
            addProductToCart,
            deleteProductFromCart,
            changeProductAmount,
            clearProductFromCart,
            closeModal,
            openModal
        }),
        [cartData, modalState, addProductToCart, clearProductFromCart, deleteProductFromCart, changeProductAmount]
    );

    return (
        <CartContext.Provider value={cartContextValue}>
            {children}
        </CartContext.Provider>
    );
}
