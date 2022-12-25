import styles from './styles.module.scss';
import { MainPageType } from './types';

export default function MainPage({products}:MainPageType) {
    return (
        <section className={styles.mainPage}>
            <div className={styles.wrapper}>
                <aside className={styles.filtersContainer}>
                    Filters
                </aside>
                <div className={styles.productsContainer}>
                    <div className={styles.productsUIBar}>
                        <input className={styles.Search} type="search" placeholder='Search...'/>
                        <select className={styles.Sort} name="sort" id="sort">
                            <option value="HP">Sort to highest price</option>
                            <option value="LP">Sort to lowest price</option>
                            <option value="HR">Sort to highest rating</option>
                            <option value="LR">Sort to lowest rating</option>
                        </select>
                        <div className={styles.UIBarButtonsContainer}>
                            <button className={styles.UIBarButton} type='button'>
                                <img src="" alt="BP" />
                            </button>
                            <button className={styles.UIBarButton} type='button'>
                                <img src="" alt="SP" />
                            </button>
                        </div>
                    </div>
                    <div className={styles.productsList}>
                        {
                            products
                            ? products.map(product => <div>{product.title}</div>)
                            : 'No products found'
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}