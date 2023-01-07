import { useState } from 'react';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import RangeFilter from '../RangeFilter/RangeFilter';
import styles from './styles.module.scss';
import { FilterNames, FilterTypes, FiltersProps, IFilters } from './types';


export default function Filters({products, getFilters, resetFilters, newProducts}:FiltersProps) {
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
                newProducts={newProducts}
                
                changeFilters={changeFilters} 
                
                isReset={resetState}
                setResetFalse={setResetFalse}
            />
            <CheckboxFilter 
                products={products} 
                prop='brand' 
                title='Brand'
                newProducts={newProducts} 

                changeFilters={changeFilters} 

                isReset={resetState}
                setResetFalse={setResetFalse}
            />
            <RangeFilter 
                products={products} 
                type='price' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
            />
            <RangeFilter 
                products={products} 
                type='stock' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
            />
            <button className={styles.resetBut} type='button' onClick={resetAllFilters}>Reset filters</button>
        </aside>
    )
}