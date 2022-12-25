import Cart from '../../generics/Cart/Cart';
import formatTotalCount from './helpers';
import styles from './styles.module.scss';
import { HeaderType } from './types';

export default function Header({productsCount, productsTotalPrice, logoCallback, cartCallback}:HeaderType) {
    const totalCount = formatTotalCount(productsTotalPrice);

    return (
        <header className={styles.Header}>
            <div className={styles.container}>
                <button type='button' className={styles.headerLogo} onClick={logoCallback}>
                    <span className={styles.headerLogoSpan1}>Online</span>
                    <span className={styles.headerLogoSpan2}>Store</span>
                </button>
                <div className={styles.cartTotal}>Total Count: <span className={styles.cartTotalSpan}>€{totalCount}</span></div>
                <Cart productsAmount={productsCount} callback={cartCallback} />
            </div>
        </header>
    )
}