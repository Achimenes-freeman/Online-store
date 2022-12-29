import InputFilter from '../../generics/InputFilter/InputFilter';
import styles from './styles.module.scss';
import { CheckboxFilterProps } from './types';

export default function CheckboxFilter({items, prop, title}:CheckboxFilterProps) {
    const productsMap = new Map();
    if(items) {
        items.forEach(item => {
            if(productsMap.has(item[prop])) {
                const newValue = productsMap.get(item[prop]) + 1;
                productsMap.set(item[prop], newValue);
            } else {
                productsMap.set(item[prop], 1)
            }
        })
    }
    const filters:[string, number][] = Array.from(productsMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))

    return (
    <form className={styles.Container}>
        <h3 className={styles.title}>{title}</h3>
        {filters.length ?
            <div className={styles.checkboxContainer}>
                {filters.map(filter => <InputFilter key={filter[0]} text={filter[0]} totalCount={filter[1]}/>)}
            </div>
            : 'Loading'}
    </form>
    )
}