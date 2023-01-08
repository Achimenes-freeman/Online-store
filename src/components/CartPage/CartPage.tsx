import classNames from 'classnames';
import { useState, useEffect, useContext } from 'react';
import { CartProduct } from '../CartProduct/CartProduct';
import { CartContext } from '../../lib/CartContext/CartContext';

import Button from '../../generics/Button/Button';

import { ICartProducts } from '../../lib/CartContext/types';

import styles from './style.module.scss';

function Products({ products, totalPrice, changeTotalPrice }: ICartProducts) {
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
                {products?.map((item, index) => (
                    <CartProduct
                        productId={item.productId}
                        index={index + 1}
                        amountReceived={item.amount}
                        changeTotalPrice={changeTotalPrice}
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
                            {products.reduce(
                                (sum, item) => sum + item.amount,
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
                        <span className={styles.blueText}>{totalPrice}</span>
                    </p>
                    <input
                        className={styles.inputPromo}
                        type="text"
                        placeholder="enter promo code"
                        maxLength={10}
                    />
                    <Button callback={() => {}}>by now</Button>
                </div>
            </div>
        </div>
    );
}

export function CartPage() {
    const { cartProducts } = useContext(CartContext);

    const [totalPrice, setTotalPrice] = useState(0);

    const changeTotalPrice = (num: number) => {
        setTotalPrice((prev) => prev + num);
    };

    useEffect(() => {
        setTotalPrice(0);
    }, []);

    return cartProducts.length ? (
        <Products
            products={cartProducts}
            totalPrice={totalPrice}
            changeTotalPrice={changeTotalPrice}
        />
    ) : (
        <p>Empty cart</p>
    );
}
