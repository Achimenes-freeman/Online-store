import { useState } from 'react';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import RangeFilter from '../RangeFilter/RangeFilter';
import styles from './styles.module.scss';
import { FilterNames, FilterTypes, FiltersProps, IFilters } from './types';


export default function Filters({defaultProducts, filteredProducts, getFilters, resetFilters, filters}:FiltersProps) {
    const [resetState, setResetState] = useState(false)
    const updateFilters = (filterName: FilterNames, filterValue: FilterTypes) => {
        const newUpdateFilters:IFilters = {};
        newUpdateFilters[filterName] = filterValue
        getFilters(newUpdateFilters)
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
                defaultProducts={defaultProducts} 
                prop='category' 
                title='Category' 
                filteredProducts={filteredProducts}
                
                isReset={resetState}
                setResetFalse={setResetFalse}

                changeFilters={updateFilters} 
                currentFilters={filters?.Category}
            />
            <CheckboxFilter 
                defaultProducts={defaultProducts} 
                prop='brand' 
                title='Brand'
                filteredProducts={filteredProducts} 

                isReset={resetState}
                setResetFalse={setResetFalse}

                changeFilters={updateFilters} 
                currentFilters={filters?.Brand}
            />
            <RangeFilter 
                defaultProducts={defaultProducts} 
                filteredProducts={filteredProducts}
                type='price' 
                changeFilters={updateFilters} 
                currentFilters={filters?.Price}
            />
            <RangeFilter 
                defaultProducts={defaultProducts} 
                filteredProducts={filteredProducts}
                type='stock' 
                changeFilters={updateFilters} 
                currentFilters={filters?.Stock}
            />
            <button className={styles.resetBut} type='button' onClick={resetAllFilters}>Reset filters</button>
        </aside>
    )
}