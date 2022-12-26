import styles from './styles.module.scss';
import { SortInputProps } from './types';

function SortInput({ callback }: SortInputProps) {
    return (
        <div className={styles.SelectWrapper}>
            <select
                className={styles.select}
                name="sorting"
                defaultValue="high-rate"
                onChange={callback}
            >
                <option className={styles.option} value="high-price">
                    Ascending price
                </option>
                <option className={styles.option} value="low-price">
                    Price descending
                </option>
                <option className={styles.option} value="high-rate">
                    Highest rating
                </option>
                <option className={styles.option} value="low-rate">
                    Lowest rating
                </option>
            </select>
        </div>
    );
}

export default SortInput;
