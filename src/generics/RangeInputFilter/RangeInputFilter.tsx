import React, { useState } from "react";
import { GenericRangeInputFilter } from "./types";
import styles from "./styles.module.scss";

export default function RangeInputFilter({min, max, title, changeFilters}: GenericRangeInputFilter) {
    const gap = Math.floor(max / 18);
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
            if(newValue >= max - gap) {
                newValue = max - gap;
            }
            if((maxValue - newValue) <= gap) {
                setMaxValue(newValue + gap);
                changeFilters(title, [minValue, newValue + gap])
            }
            
            setMinValue(Number(newValue));
            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${perMin}% , #0c75ff ${perMin}% , #0c75ff ${perMax}%, #dae4ff ${perMax}%)`
            })

            changeFilters(title, [newValue, maxValue])
        }
    }
    const onChangeMax = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const perMin = (minValue / Number(max)) * 100;
            const perMax = (newValue / Number(max)) * 100;
            if(newValue <= min + gap) {
                newValue = min + gap;
            }
            if((newValue - minValue) <= gap) {
                setMinValue(newValue - gap);
                changeFilters(title, [newValue - gap, maxValue])
            }
            
            setMaxValue(newValue);
            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${perMin}% , #0c75ff ${perMin}% , #0c75ff ${perMax}%, #dae4ff ${perMax}%)`
            })

            changeFilters(title, [minValue, newValue])
        }
    }


    return (
        <div className={styles.Container}>
            <div className={styles.spanContainer}>
                <span>{minValue}</span>—<span>{maxValue}</span>
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.sliderTrack} style={fillRange}/>
                <input className={styles.input} type="range" min={min} max={max} onChange={onChangeMin} value={minValue} />
                <input className={styles.input} type="range" min={min} max={max} onChange={onChangeMax} value={maxValue} />
            </div>
        </div>
    )
}