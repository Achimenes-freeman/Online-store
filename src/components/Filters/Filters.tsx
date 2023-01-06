import { useState } from 'react';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import RangeFilter from '../RangeFilter/RangeFilter';
import styles from './styles.module.scss';
import { FilterNames, FilterTypes, FiltersProps, IFilters } from './types';


export default function Filter({products, getFilters, resetFilters, newProducts}:FiltersProps) {
    const [resetState, setResetState] = useState(false)
    const changeFilters = (filterName: FilterNames, filterValue: FilterTypes) => {
        const filters:IFilters = {};
        filters[filterName] = filterValue
        getFilters(filters)
    }
    const resetAllFilters = () => {
        resetFilters();
        setResetState(true)
    }
    const setResetFalse = () => {
        setResetState(false)
    }
    
    return (
        <aside className={styles.FiltersContainer}>
            <CheckboxFilter 
                products={products} 
                prop='category' 
                title='Category' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
                isReset={resetState}
                setResetFalse={setResetFalse}
            />
            <CheckboxFilter 
                products={products} 
                prop='brand' 
                title='Brand' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
                isReset={resetState}
                setResetFalse={setResetFalse}
            />
            {/* <div className={styles.rangeContainer}>
                <h3 className={styles.rangeHeading}>Price</h3>
                <RangeInputFilter 
                    min={Math.min(...(products.map(product => product.price)))} 
                    max={Math.max(...(products.map(product => product.price)))} 
                    title='Price'
                    changeFilters={changeFilters}
                />
            </div> */}
            <RangeFilter products={products} type='price' changeFilters={changeFilters} newProducts={newProducts}/>
            {/* <div className={styles.rangeContainer}> 
            <h3 className={styles.rangeHeading}>Stock</h3>
                <RangeInputFilter 
                    min={Math.min(...(products.map(product => product.stock)))} 
                    max={Math.max(...(products.map(product => product.stock)))} 
                    title='Stock'
                    changeFilters={changeFilters}
                />
            </div> */}
            <RangeFilter products={products} type='stock' changeFilters={changeFilters} newProducts={newProducts}/>
            <button className={styles.resetBut} type='button' onClick={resetAllFilters}>Reset filters</button>
        </aside>
    )
}