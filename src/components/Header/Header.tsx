import { Link } from 'react-router-dom';
import Cart from '../../generics/Cart/Cart';
import formatTotalCount from './helpers';
import styles from './styles.module.scss';
import { HeaderType } from './types';

export default function Header({
    productsCount,
    productsTotalPrice,
    logoCallback,
    cartCallback,
}: HeaderType) {
    const totalCount = formatTotalCount(productsTotalPrice);

    return (
        <header className={styles.Header}>
            <div className={styles.container}>
                <Link className={styles.link} to="/">
                    <button
                        type="button"
                        className={styles.headerLogo}
                        onClick={logoCallback}
                    >
                        <span className={styles.headerLogoSpan1}>Online</span>
                        <span className={styles.headerLogoSpan2}>Store</span>
                    </button>
                </Link>

                <div className={styles.cartTotal}>
                    Total Count:{' '}
                    <span className={styles.cartTotalSpan}>€{totalCount}</span>
                </div>
                <Link className={styles.link} to="/cart">
                    <Cart
                        productsAmount={productsCount}
                        callback={cartCallback}
                    />
                </Link>
            </div>
        </header>
    );
}
