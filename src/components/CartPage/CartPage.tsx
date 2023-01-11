import classNames from 'classnames';
import { useState, useContext, useEffect } from 'react';
import { CartProduct } from '../CartProduct/CartProduct';
import { CartContext } from '../../lib/CartContext/CartContext';
import Button from '../../generics/Button/Button';

import { ICartProducts } from '../../lib/CartContext/types';
import { IProductData } from '../ProductPage/types';

import styles from './style.module.scss';

function Products({ totalPrice }: ICartProducts) {
    const { cartData, openModal } = useContext(CartContext);
    const [productsData, setProductsData] = useState<Array<IProductData>>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            Promise.all(
                Object.keys(cartData).map((item) =>
                    fetch(`https://dummyjson.com/products/${item}`)
                )
            )
                .then((values) =>
                    Promise.all(values.map((item) => item.json()))
                )
                .then((values) => {
                    setProductsData(
                        values.map((item) => ({
                            ...item,
                            amount: cartData[item.id].amount,
                        }))
                    );
                    setLoading(false);
                });
        }
    }, [cartData, loading]);

    const changeProductData = (productId: number) => {
        const arr = productsData.filter((item) => item.id !== productId);
        setProductsData(arr);
    };

    return (
        <div className={styles.CartPage}>
            <div className={styles.products}>
                <div
                    className={classNames(styles.pagination, styles.sideTitle)}
                >
                    <h3 className={styles.Title}>Products in cart</h3>
                    <div className={styles.paginationInputs}>
                        <span className={styles.input}>limit: 3</span>
                        <span className={styles.input}>page: 47</span>
                    </div>
                </div>
                {loading && <p className={styles.loading}>loading...</p>}
                {!!productsData.length &&
                    productsData.map((item, index) => (
                        <CartProduct
                            productData={item}
                            index={index + 1}
                            changeProductData={changeProductData}
                            key={item.id}
                        />
                    ))}
            </div>
            <div className={classNames(styles.summary)}>
                <h3 className={classNames(styles.Title, styles.sideTitle)}>
                    Summary
                </h3>
                <div className={styles.summaryInfo}>
                    <p className={classNames(styles.amount, styles.summaryPar)}>
                        Products to by:{' '}
                        <span className={styles.blueText}>
                            {Object.values(cartData).reduce(
                                (sum, { amount }) => sum + amount,
                                0
                            )}
                        </span>
                    </p>
                    <p
                        className={classNames(
                            styles.totalPrice,
                            styles.summaryPar
                        )}
                    >
                        Total price:{' '}
                        <span className={styles.redText}>€{totalPrice}</span>
                    </p>
                    <input
                        className={styles.inputPromo}
                        type="text"
                        placeholder="enter promo code"
                        maxLength={10}
                    />
                    <Button callback={openModal}>by now</Button>
                </div>
            </div>
        </div>
    );
}

export function CartPage() {
    const { cartData } = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(
        Object.values(cartData).reduce(
            (sum, { amount, price }) => sum + amount * price,
            0
        )
    );

    useEffect(() => {
        setTotalPrice(
            Object.values(cartData).reduce(
                (sum, { amount, price }) => sum + amount * price,
                0
            )
        );
    }, [cartData]);

    return Object.keys(cartData).length ? (
        <Products totalPrice={totalPrice} />
    ) : (
        <p>empty cart</p>
    );
}
