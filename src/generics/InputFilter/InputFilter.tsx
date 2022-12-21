import { GenericInputFilter } from "./InputFilterType";
import styles from "./InputFilter.module.scss"

export default function InputFilter({text, count, totalCount, callback}: GenericInputFilter) {
    return(
        <div className={styles.container}>
            <input className={styles.inputFilter} type="checkbox" id={text} onChange={callback}/>
            <label className={styles.inputLabel} htmlFor={text}>{text}</label>
            <span className={styles.countSpan}>{`(${count || totalCount}/${totalCount})`}</span>
        </div>
    )
}