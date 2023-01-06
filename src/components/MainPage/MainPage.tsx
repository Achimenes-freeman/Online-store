import {useState, useEffect, useCallback, useReducer} from 'react';
import SortInput from '../../generics/SortInput/SortInput';
import styles from './styles.module.scss';
import { CardSizes, IFilters, Product } from './types';
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
    const [searchFilter, setSearchFilter] = useState<string>('');
    const chooseBut = (curState:CardSizes, clickedBut:string) => {
        switch(clickedBut) {
            case 'small':
                return {
                    ...curState,
                    bigCards: false,
                    smallCards: true,
                }
            case 'big': 
                return {
                    ...curState,
                    bigCards: true,
                    smallCards: false,
                }
            default: throw new Error('Card Sizes Error')
        }
    }
    const [curCardState, dispatchCurState] = useReducer(chooseBut, {
        bigCards: false,
        smallCards: true,
    })

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
        if(products) {
            let filteredProducts:Product[] = [...products];
            if(filters) {
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
            }

            if(searchFilter) {
                filteredProducts = filteredProducts
                .filter( item =>
                    item.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.category.toLowerCase().includes(searchFilter.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchFilter.toLowerCase()) || 
                    item.price === Number(searchFilter.toLowerCase()) || 
                    item.title.toLowerCase().includes(searchFilter.toLowerCase())
                )
            }

            setShownProducts(filteredProducts);
            setCanSort(true);
        }
    }

    const memoGetFilteredProducts = useCallback(getFilteredProducts, [filters, products, searchFilter])
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
                        <input 
                            className={styles.Search} 
                            type="search" 
                            placeholder='Search...' 
                            value={searchFilter} 
                            onChange={
                                (event:React.ChangeEvent<HTMLInputElement>) => setSearchFilter(event.target.value)
                            }
                        />
                        <SortInput callback={getSortMethod}/>
                        <div className={styles.UIBarButtonsContainer}>
                            <button 
                                className={`${styles.UIBarButton}\n${curCardState.smallCards ? styles.UIBarButtonInactive: ''}`} 
                                type='button' 
                                onClick={() => dispatchCurState('big')}
                            >
                                <img className={styles.UIBarButtonImg} src={BPLink} alt="BP" />
                            </button>
                            <button 
                                className={`${styles.UIBarButton}\n${curCardState.bigCards ? styles.UIBarButtonInactive : ''}`} 
                                type='button' 
                                onClick={() => dispatchCurState('small')}
                            >
                                <img className={styles.UIBarButtonImg} src={SPLink} alt="SP" />
                            </button>
                        </div>
                    </div>
                    <div className={`${styles.productsList}\n${curCardState.smallCards ? styles.productsListSmall : styles.productsListBig}`}>
                        {
                            shownProducts
                            ? shownProducts.map(product => <ProductCard key={product.id} product={product} cardSize={curCardState}/>)
                            : 'No products found'
                        }
                    </div>
                </div>
            </div>
            : 'Loading'}
        </section>
    )
}