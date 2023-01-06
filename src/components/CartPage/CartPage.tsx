import { useContext } from 'react';
import { CartProduct } from '../CartProduct/CartProduct';
// import { ICartProducts } from '../../lib/CartContext/types';
import { CartContext } from '../../lib/CartContext/CartContext';

import styles from './style.module.scss';
// { products }: ICartProducts
export function CartPage() {
    const { cartProducts } = useContext(CartContext);
    console.log(cartProducts);
    return (
        <div className={styles.CartPage}>
            <div className={styles.products}>
                <div className={styles.pagination}>
                    <h3 className={styles.paginationTitle}>Products in cart</h3>
                    <div className={styles.paginationInputs}>
                        <span className={styles.input}>limit: 3</span>
                        <span className={styles.input}>page: 47</span>
                    </div>
                </div>
                {cartProducts?.map((item, index) => (
                    <CartProduct productId={item.productId} index={index + 1} />
                ))}
            </div>
            <div className={styles.summary}>
                <h3>Hello</h3>
            </div>
        </div>
    );
}
