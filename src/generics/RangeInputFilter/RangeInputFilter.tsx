import React, {useState } from "react";
import { GenericRangeInputFilter } from "./types";
import styles from "./styles.module.scss";

export default function RangeInputFilter({min, max, callback}: GenericRangeInputFilter) {
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);
    const [fillRange, setFillRange] = useState({
        background: `linear-gradient(to right, #dae4ff ${(minValue / max) * 100}% , #0c75ff ${(minValue / max) * 100}% , #0c75ff ${(maxValue / max) * 100}%, #dae4ff ${(maxValue / max) * 100}%)`
    });
    
    const onChangeMin = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const perMin = (newValue / Number(max)) * 100;
            const perMax = (maxValue / Number(max)) * 100;
            if(newValue === max) {
                newValue = max - 1;
            }
            if((maxValue - newValue) <= 0) {
                setMaxValue(newValue + 1)
            }
            
            setMinValue(Number(newValue));

            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${perMin}% , #0c75ff ${perMin}% , #0c75ff ${perMax}%, #dae4ff ${perMax}%)`
            })
        }
        
        if(callback) {
            callback();
        }
    }
    const onChangeMax = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const per1 = (minValue / Number(max)) * 100;
            const per2 = (newValue / Number(max)) * 100;
            if(newValue === min) {
                newValue = min + 1;
            }
            if((newValue - minValue) <= 0) {
                setMinValue(newValue - 1);
            }
            setMaxValue(newValue);

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
                <span>{minValue}</span>—<span>{maxValue}</span>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.sliderTrack} style={fillRange}/>
                <input className={styles.input} type="range" min={min} max={max} onChange={onChangeMin} value={minValue} />
                <input className={styles.input} type="range" min={min} max={max} onChange={onChangeMax} value={maxValue} />
            </div>
        </>
    )
}