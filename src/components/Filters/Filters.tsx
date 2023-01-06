import RangeInputFilter from '../../generics/RangeInputFilter/RangeInputFilter';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import styles from './styles.module.scss';
import { FilterNames, FilterTypes, FiltersProps, IFilters } from './types';


export default function Filter({products, getFilters, newProducts}:FiltersProps) {

    const changeFilters = (filterName: FilterNames, filterValue: FilterTypes) => {
        const filters:IFilters = {};
        filters[filterName] = filterValue
        getFilters(filters)
    }
    
    return (
        <aside className={styles.FiltersContainer}>
            <CheckboxFilter 
                products={products} 
                prop='category' 
                title='Category' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
            />
            <CheckboxFilter 
                products={products} 
                prop='brand' 
                title='Brand' 
                changeFilters={changeFilters} 
                newProducts={newProducts}
            />
            <div className={styles.rangeContainer}>
                <h3 className={styles.rangeHeading}>Price</h3>
                <RangeInputFilter 
                    min={Math.min(...(products.map(product => product.price)))} 
                    max={Math.max(...(products.map(product => product.price)))} 
                    title='Price'
                    changeFilters={changeFilters}
                />
            </div>
            <div className={styles.rangeContainer}> 
            <h3 className={styles.rangeHeading}>Stock</h3>
                <RangeInputFilter 
                    min={Math.min(...(products.map(product => product.stock)))} 
                    max={Math.max(...(products.map(product => product.stock)))} 
                    title='Stock'
                    changeFilters={changeFilters}
                />
            </div>
        </aside>
    )
}