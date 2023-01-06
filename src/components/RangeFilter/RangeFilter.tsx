import RangeInputFilter from "../../generics/RangeInputFilter/RangeInputFilter";
import { FilterNames } from "../Filters/types";
import styles from './styles.module.scss';
import { RangeFilterProps } from "./types";

export default function RangeFilter({products, type, changeFilters, newProducts}:RangeFilterProps) {
    let rangeType:FilterNames;
    if(type === 'price') {
        rangeType = 'Price'
    } else {
        rangeType = 'Stock'
    }
    return(
        <div className={styles.rangeContainer}>
                <h3 className={styles.rangeHeading}>Price</h3>
                <RangeInputFilter 
                    min={Math.min(...(products.map(product => product[type])))} 
                    max={Math.max(...(products.map(product => product[type])))} 
                    minValue={Math.min(...(newProducts.map(product => product[type])))}
                    maxValue={Math.max(...(newProducts.map(product => product[type])))}
                    title={rangeType}
                    changeFilters={changeFilters}
                />
        </div>
    )
}