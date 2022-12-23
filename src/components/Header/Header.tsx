import styles from './styles.module.scss';
import { HeaderType } from './types';

export default function Header({productsCount, productsTotalPrice}:HeaderType) {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div>Online Store</div>
                <div>Total Count: €{productsTotalPrice}</div>
                <button type="button">Cart: {productsCount}</button>
            </div>
        </header>
    )
}