import RangeInputFilter from '../../generics/RangeInputFilter/RangeInputFilter';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import styles from './styles.module.scss';
import { FiltersProps } from './types';


export default function Filter({products}:FiltersProps) {
    return (
        <aside className={styles.FiltersContainer}>
            <CheckboxFilter items={products} prop='category' title='Category'/>
            <CheckboxFilter items={products}  prop='brand' title='Brand'/>
            <div className={styles.rangeContainer}>
                <h3 className={styles.rangeHeading}>Price</h3>
                <RangeInputFilter min={0} max={100} />
            </div>
            <div className={styles.rangeContainer}>
            <h3 className={styles.rangeHeading}>Stock</h3>
                <RangeInputFilter min={0} max={100} />
            </div>
        </aside>
    )
}