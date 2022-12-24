import React, {useState } from "react";
import { GenericRangeInputFilter } from "./types";
import styles from "./styles.module.scss";

export default function RangeInputFilter({min, max, callback}: GenericRangeInputFilter) {
    const [value1, setValue1] = useState(min);
    const [value2, setValue2] = useState(max);
    const [fillRange, setFillRange] = useState({
        background: `linear-gradient(to right, #dae4ff ${(value1 / max) * 100}% , #0c75ff ${(value1 / max) * 100}% , #0c75ff ${(value2 / max) * 100}%, #dae4ff ${(value2 / max) * 100}%)`
    });
    
    const onChange1 = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const per1 = (newValue / Number(max)) * 100;
            const per2 = (value2 / Number(max)) * 100;
            if(newValue === max) {
                newValue = max - 1;
            }
            if((value2 - newValue) <= 0) {
                setValue2(newValue + 1)
            }
            
            setValue1(Number(newValue));

            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${per1}% , #0c75ff ${per1}% , #0c75ff ${per2}%, #dae4ff ${per2}%)`
            })
        }
        
        if(callback) {
            callback();
        }
    }
    const onChange2 = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const per1 = (value1 / Number(max)) * 100;
            const per2 = (newValue / Number(max)) * 100;
            if(newValue === min) {
                newValue = min + 1;
            }
            if((newValue - value1) <= 0) {
                setValue1(newValue - 1);
            }
            setValue2(newValue);

            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${per1}% , #0c75ff ${per1}% , #0c75ff ${per2}%, #dae4ff ${per2}%)`
            })
        }
        if(callback) {
            callback()
        }
    }

    return (
        <>
            <div className={styles.spanContainer}>
                <span>{value1}</span>—<span>{value2}</span>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.sliderTrack} style={fillRange}/>
                <input className={styles.input} type="range" min={min} max={max} onChange={onChange1} value={value1} />
                <input className={styles.input} type="range" min={min} max={max} onChange={onChange2} value={value2} />
            </div>
        </>
    )
}