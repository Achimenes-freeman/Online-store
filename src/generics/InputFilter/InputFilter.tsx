import { useEffect, useState } from "react";
import { GenericInputFilter } from "./types";
import styles from "./styles.module.scss"

export default function InputFilter({text, count, totalCount, callback, isReset = false, setResetFalse}: GenericInputFilter) {

    const [checkState, setCheckState] = useState(false);
    // const [resetState, setResetState] = useState(false)
    useEffect(() => {
        if(isReset) {
            setCheckState(false)
            // setResetState(true)
            setResetFalse();
        }
    }, [isReset, setResetFalse])
    // useEffect(() => {
    //     if(resetState) {

    //     }
    // }, [resetState])
    const onChange = () => {
        if(callback) {
            callback(text)
        }
        setCheckState(!checkState);
    }
    return(
        <div className={count ? styles.container : styles.containerOff}>
            <input className={styles.inputFilter} type="checkbox" id={text} onChange={onChange} checked={checkState}/>
            <label className={styles.inputLabel} htmlFor={text}>{text}</label>
            <span className={styles.countSpan}>{`(${count}/${totalCount})`}</span>
        </div>
    )
}