import { Link } from 'react-router-dom';

import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../lib/CartContext/CartContext';
import { IProductData } from '../ProductPage/types';
import { InfoIcons } from '../InfoIcons/InfoIcons';

import { ICartProduct } from './types';

import styles from './style.module.scss';

import PlusIcon from '../../assets/icons/plus-icon.svg';
import MinusIcon from '../../assets/icons/minus-icon.svg';

export function CartProduct({
    productId,
    index,
    amountReceived,
}: ICartProduct) {
    const { removeCartProduct, changeProductAmount } = useContext(CartContext);

    const [productData, setProductData] = useState<IProductData>();
    const [amount, setAmount] = useState(amountReceived);
    const [cost, setCost] = useState(
        productData?.price && productData.price * amount
    );

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then((res) => res.json())
            .then((data) => setProductData(data));
    }, [productId]);

    useEffect(() => {
        setCost(productData?.price && productData.price * amount);
    }, [amount, productData]);

    const incProduct = () => {
        if (productData?.stock && productData?.stock > amount) {
            const currentAmount = amount + 1;
            setAmount(currentAmount);
            changeProductAmount(productId, currentAmount);
        }
    };
    const decProduct = () => {
        if (amount > 1) {
            const currentAmount = amount - 1;
            setAmount(currentAmount);
            changeProductAmount(productId, currentAmount);
        } else {
            removeCartProduct(productId);
        }
    };

    return (
        <div className={styles.CartProduct}>
            <div className={styles.order}>{index}</div>
            <div className={styles.info}>
                <Link to={`/${productId}`} className={styles.picture}>
                    <img
                        className={styles.thumbnail}
                        src={productData?.thumbnail}
                        alt=""
                    />
                </Link>

                <Link to={`/${productId}`} className={styles.content}>
                    <div className={styles.title}>
                        <h4 className={styles.name}>{productData?.title}</h4>
                        <span>{productData?.brand}</span>
                    </div>
                    <p className={styles.description}>
                        {productData?.description}
                    </p>
                    <InfoIcons
                        rating={productData?.rating}
                        stock={productData?.stock}
                        category={productData?.category}
                    />
                </Link>

                <div className={styles.price}>
                    <div className={styles.amount}>
                        <button
                            className={styles.btn}
                            type="button"
                            onClick={incProduct}
                        >
                            <img
                                className={styles.icon}
                                src={PlusIcon}
                                alt=""
                            />
                        </button>
                        <span className={styles.amountNum}>{amount}</span>
                        <button
                            className={styles.btn}
                            type="button"
                            onClick={decProduct}
                        >
                            <img
                                className={styles.icon}
                                src={MinusIcon}
                                alt=""
                            />
                        </button>
                    </div>

                    <p className={styles.cost}>
                        <span className={styles.costText}>Cost: </span>
                        {cost}
                        <span className={styles.euro}>€</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
