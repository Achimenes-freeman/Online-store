import styles from './styles.module.scss';
import { SortInputProps } from './types';

function SortInput({ callback }: SortInputProps) {
    return (
        <div className={styles.SelectWrapper}>
            <select
                className={styles.Select}
                name="sorting"
                defaultValue="high-rate"
                onChange={callback}
            >
                <option className={styles.Option} value="high-price">
                    Ascending price
                </option>
                <option className={styles.Option} value="low-price">
                    Price descending
                </option>
                <option className={styles.Option} value="high-rate">
                    Highest rating
                </option>
                <option className={styles.Option} value="low-rate">
                    Lowest rating
                </option>
            </select>
        </div>
    );
}

export default SortInput;
