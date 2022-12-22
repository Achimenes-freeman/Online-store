import styles from './SortInput.module.scss';
// import { SortInputProps } from '../../types/types';

function SortInput() {
    return (
        <div className={styles.SelectWrapper}>
            <select className={styles.Select} name="sorting" defaultValue="1">
                <option className={styles.Option} value="1">
                    Ascending price
                </option>
                <option className={styles.Option} value="2">
                    Price descending
                </option>
                <option className={styles.Option} value="3">
                    Highest rating
                </option>
                <option className={styles.Option} value="4">
                    Lowest rating
                </option>
            </select>
        </div>
    );
}

export default SortInput;
