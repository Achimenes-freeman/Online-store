import RangeInputFilter from '../../generics/RangeInputFilter/RangeInputFilter';
import CheckboxFilter from '../CheckboxFilter/CheckboxFilter';
import styles from './styles.module.scss';


export default function Filter() {
    return (
        <aside className={styles.FiltersContainer}>
            <CheckboxFilter />
            <CheckboxFilter />
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