import InputFilter from '../../generics/InputFilter/InputFilter';
import styles from './styles.module.scss';
import { CheckboxFilterProps } from './types';

export default function CheckboxFilter({items, prop, title}:CheckboxFilterProps) {
    const newItems:string[] = [];
    new Set(items.map(item => item[prop])).forEach(item => typeof item === 'string' && newItems.push(item));
    
    return (
    <div className={styles.Container}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.checkboxContainer}>
            {newItems.sort((a, b) => a.localeCompare(b)).map(item => <InputFilter text={item} totalCount={5}/>)}
        </div>
    </div>
    )
}