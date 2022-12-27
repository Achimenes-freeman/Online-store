import {useState, useEffect} from 'react';
import SortInput from '../../generics/SortInput/SortInput';
import styles from './styles.module.scss';
import { MainPageType, Product } from './types';
import Filters from '../Filters/Filters'
import ProductCard from '../ProductCard/ProductCard';



export default function MainPage({products}:MainPageType) {
    
    const productProt:Product = {
        id: 1,
        title: 'string',
        description: 'string',
        price: 1,
        discountPercentage: 1,
        rating: 1,
        stock: 1,
        brand: 'string',
        category: 'string',
        thumbnail: 'string',
        images: ['string[]']
    }
    const [someProducts, setSomeProducts] = useState([productProt]);

    useEffect(() => {
        async function fetchProductsFunc() {
            const res:Product[] = await fetch('https://dummyjson.com/products?limit=100').then(result=>result.json()).then(data => data.products);
            setSomeProducts(res);
        }
        
        fetchProductsFunc();
    }, [])
    return (
        <section className={styles.MainPage}>
            <div className={styles.wrapper}>
                <Filters products={someProducts}/>
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
                            someProducts || products
                            ? someProducts.map(product => <ProductCard product={product}/>)
                            : 'No products found'
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}