import {useState, useEffect, useCallback} from 'react';
import SortInput from '../../generics/SortInput/SortInput';
import styles from './styles.module.scss';
import { IFilters, Product } from './types';
import Filters from '../Filters/Filters'
import ProductCard from '../ProductCard/ProductCard';
import SPLink from '../../assets/icons/small-products-icon.svg';
import BPLink from '../../assets/icons/big-products-icon.svg';

export default function MainPage() {
    const [products, setProducts] = useState<Product[]>()
    const [shownProducts, setShownProducts] = useState<Product[]>([])
    const [sortMethod, setSortMethod] = useState<string>('high-rate')
    const [filters, setFilters] = useState<IFilters>()
    const [canSort, setCanSort] = useState<boolean>(true);

    const sortProducts = ( method: string = sortMethod, ableToSort: boolean = canSort) => {
        if(ableToSort) {
            const res = [...shownProducts];
            switch(method) {
                case 'high-rate':
                    res.sort((a, b) => b.rating - a.rating)
                    break;
                case 'low-rate':
                    res.sort((a, b) => a.rating - b.rating)
                    break;
                case 'high-price':
                    res.sort((a, b) => b.price - a.price)
                    break;
                case 'low-price':
                    res.sort((a, b) => a.price - b.price)
                    break;
                default: 
                    break;
            }
            setShownProducts(res);
            setCanSort(false)
        }
    }
    const getSortMethod = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSortMethod(event.target.value);
        sortProducts(event.target.value, true)
    }
    const getFilters = (newFilters:IFilters) => {
        setFilters({...filters, ...newFilters});
        sortProducts(sortMethod, true);
    }
    const getFilteredProducts = () => {
        if(products && filters) {
            let filteredProducts:Product[] = [...products];
            if(filters.Brand) {
                for(let i = 0; i < filters.Brand.length; i += 1){
                    if(i === 0) {
                        filteredProducts = filteredProducts
                        .filter(item => 
                            filters.Brand && item.brand.toUpperCase() === filters.Brand[i].toUpperCase()
                        )
                    } else {
                        filteredProducts = filteredProducts.concat(products
                            .filter(item => 
                                filters.Brand && item.brand.toUpperCase() === filters.Brand[i].toUpperCase()
                            ))
                    }
                }
            }
            if(filters.Category) {
                if(filters.Brand) {
                    const oldFilteredProducts = [...filteredProducts]
                    for(let i = 0; i < filters.Category.length; i += 1){
                        if(i === 0) {
                            filteredProducts = filteredProducts
                            .filter(item => 
                                filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                            )
                        } else {
                            filteredProducts = filteredProducts.concat(oldFilteredProducts
                                .filter(item => 
                                    filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                ))
                        }
                    }
                } else {
                    for(let i = 0; i < filters.Category.length; i += 1){
                        if(i === 0) {
                            filteredProducts = filteredProducts
                            .filter(item => 
                                filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                            )
                        } else {
                            filteredProducts = filteredProducts.concat(products
                                .filter(item => 
                                    filters.Category && item.category.toUpperCase() === filters.Category[i].toUpperCase()
                                ))
                        }
                    }
                }
            }
            if(filters.Price) {
                filteredProducts = filteredProducts
                .filter(item => 
                    filters.Price && item.price >= filters.Price[0] && item.price <= filters.Price[1]
                )
            }
            if(filters.Stock) {
                filteredProducts = filteredProducts
                .filter(item => 
                    filters.Stock && item.stock >= filters.Stock[0] && item.stock <= filters.Stock[1]
                )
            }

            setShownProducts(filteredProducts);
            setCanSort(true);
        }
    }

    const memoGetFilteredProducts = useCallback(getFilteredProducts, [filters, products])
    const memoSortProducts = useCallback(sortProducts, [shownProducts, sortMethod, canSort])

    useEffect(() => {
        async function fetchProductsFunc() {
            const res:Product[] = await fetch('https://dummyjson.com/products?limit=100').then(result=>result.json()).then(data => data.products);
            setProducts(res);
            setShownProducts(res)
        }
        fetchProductsFunc();
    }, [])
    useEffect(memoSortProducts, [memoSortProducts])
    useEffect(memoGetFilteredProducts, [memoGetFilteredProducts])

    return (
        <section className={styles.MainPage}>
            {products
            ?<div className={styles.wrapper}>
                <Filters products={products} getFilters={getFilters} newProducts={shownProducts}/>
                <div className={styles.productsContainer}>
                    <div className={styles.productsUIBar}>
                        <input className={styles.Search} type="search" placeholder='Search...'/>
                        <SortInput callback={getSortMethod}/>
                        <div className={styles.UIBarButtonsContainer}>
                            <button className={styles.UIBarButton} type='button'>
                                <img className={styles.UIBarButtonImg} src={BPLink} alt="BP" />
                            </button>
                            <button className={styles.UIBarButton} type='button'>
                                <img className={styles.UIBarButtonImg} src={SPLink} alt="SP" />
                            </button>
                        </div>
                    </div>
                    <div className={styles.productsList}>
                        {
                            shownProducts
                            ? shownProducts.map(product => <ProductCard key={product.id} product={product}/>)
                            : 'No products found'
                        }
                    </div>
                </div>
            </div>
            : 'Loading'}
        </section>
    )
}