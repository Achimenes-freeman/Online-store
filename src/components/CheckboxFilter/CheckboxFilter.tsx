import { useEffect, useState } from 'react';
import InputFilter from '../../generics/InputFilter/InputFilter';
import styles from './styles.module.scss';
import { CheckboxFilterProps, FiltersArr, ICheckboxFilters } from './types';

export default function CheckboxFilter({products, prop, title, changeFilters, newProducts, isReset, setResetFalse}:CheckboxFilterProps) {
    const productsMap = new Map();
    const newProductsMap = new Map();
    let filters:FiltersArr = [];
    
    products.map(item => item[prop].toString().toUpperCase()).forEach(item => {
        if(productsMap.has(item)) {
            const newValue = productsMap.get(item)[0] + 1;
            productsMap.set(item, [newValue, newValue]);
        } else {
            productsMap.set(item, [1, 1])
        }
    })
    newProducts.map(item => item[prop].toString().toUpperCase()).forEach(item => {
        if(newProductsMap.has(item)) {
            const newValue = newProductsMap.get(item)[0] + 1;
            newProductsMap.set(item, [newValue, newValue]);
        } else {
            newProductsMap.set(item, [1, 1])
        }
    })
    Array.from(productsMap.keys()).forEach(key => {
        if(!newProductsMap.has(key)) {
            const newValue = productsMap.get(key)[1];
            newProductsMap.set(key, [0, newValue])
        } else {
            const newValue = productsMap.get(key)[1];
            const oldValue = newProductsMap.get(key)[0]
            newProductsMap.set(key, [oldValue, newValue])
        }
    })
    filters = Array.from(newProductsMap.entries()).sort((a, b) => a[0].localeCompare(b[0]));

    const [checkboxFilters, setCheckboxFilters] = useState<ICheckboxFilters>([])

    const onCheck = (filterName: string) => {
        let resFilters:ICheckboxFilters = [...checkboxFilters]
        if(checkboxFilters.length === checkboxFilters.filter(filter => filter !== filterName).length) {
            resFilters.push(filterName)
        } else {
            resFilters = resFilters.filter(filter => filter !== filterName)
        }
        setCheckboxFilters(resFilters);
        changeFilters(title, resFilters)
    }

    useEffect(() => {
        if(isReset) {
            setCheckboxFilters([])
        }
    }, [isReset])

    return (
    <div className={styles.Container}>
        <h3 className={styles.title}>{title}</h3>
        {filters.length ?
            <div className={styles.checkboxContainer}>
                {filters.map(filter => <InputFilter isReset={isReset} setResetFalse={setResetFalse} callback={onCheck} key={filter[0]} text={filter[0]} count={filter[1][0]} totalCount={filter[1][1]}/>)}
            </div>
            : 'Loading'}
    </div>
    )
}