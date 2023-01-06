import { GenericInputFilter } from "./types";
import styles from "./styles.module.scss"

export default function InputFilter({text, count, totalCount, callback}: GenericInputFilter) {

    const onChange = () => {
        if(callback) {
            callback(text)
        }
    }
    return(
        <div className={count ? styles.container : styles.containerOff}>
            <input className={styles.inputFilter} type="checkbox" id={text} onChange={onChange}/>
            <label className={styles.inputLabel} htmlFor={text}>{text}</label>
            <span className={styles.countSpan}>{`(${count}/${totalCount})`}</span>
        </div>
    )
}