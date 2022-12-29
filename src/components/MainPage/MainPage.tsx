import {useState, useEffect} from 'react';
import SortInput from '../../generics/SortInput/SortInput';
import styles from './styles.module.scss';
import {  Product } from './types';
import Filters from '../Filters/Filters'
import ProductCard from '../ProductCard/ProductCard';



export default function MainPage() {
    const [products, setProducts] = useState<Product[]>()
    // const [shownProducts, setShownProducts] = useState(products)

    useEffect(() => {
        async function fetchProductsFunc() {
            const res:Product[] = await fetch('https://dummyjson.com/products?limit=100').then(result=>result.json()).then(data => data.products);
            setProducts(res);
        }
        fetchProductsFunc();
    }, [])


    return (
        <section className={styles.MainPage}>
            <div className={styles.wrapper}>
                <Filters products={products} />
                <div className={styles.productsContainer}>
                    <div className={styles.productsUIBar}>
                        <input className={styles.Search} type="search" placeholder='Search...'/>
                        <SortInput callback={() => 1}/>
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
                            ? products.map(product => <ProductCard key={product.id} product={product}/>)
                            : 'No products found'
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}