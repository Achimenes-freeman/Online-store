import Cart from '../../generics/Cart/Cart';
import styles from './styles.module.scss';
import { HeaderType } from './types';

export default function Header({productsCount, productsTotalPrice}:HeaderType) {
    let totalCount: string | number;
    if(productsTotalPrice) {
        totalCount = productsTotalPrice;
        if(productsTotalPrice >= 1000) {
            totalCount = `${Math.round(productsTotalPrice / 100) / 10}K`
        }
        if(productsTotalPrice >= 1000000) {
            totalCount = `${Math.round(productsTotalPrice / 10000) / 100}M`;
        }
    } else totalCount = 0;

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <button type='button' className={styles.headerLogo}>
                    <span className={styles.headerLogoSpan1}>Online</span>
                    <span className={styles.headerLogoSpan2}>Store</span>
                </button>
                <div className={styles.cartTotal}>Total Count: <span className={styles.cartTotalSpan}>€{totalCount}</span></div>
                <Cart productsAmount={productsCount}/>
            </div>
        </header>
    )
}