import React, { useEffect, useState } from "react";
import { GenericRangeInputFilter } from "./types";
import styles from "./styles.module.scss";

export default function RangeInputFilter({min, max, title,  changeFilters, minValue, maxValue}: GenericRangeInputFilter) {
    const gap = Math.floor(max / 18);
    const [canFind, setCanFind] = useState<boolean>(true);
    const [minValueState, setMinValueState] = useState(minValue);
    const [maxValueState, setMaxValueState] = useState(maxValue);
    const [fillRange, setFillRange] = useState({
        background: `linear-gradient(to right, #dae4ff ${(minValueState / max) * 100}% , #0c75ff ${(minValueState / max) * 100}% , #0c75ff ${(maxValueState / max) * 100}%, #dae4ff ${(maxValueState / max) * 100}%)`
    });
    useEffect(() => {
        if(minValue !== Infinity && maxValue !== Infinity) {
            setMinValueState(minValue)
            setMaxValueState(maxValue);
            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${(minValue / max) * 100}% , #0c75ff ${(minValue / max) * 100}% , #0c75ff ${(maxValue / max) * 100}%, #dae4ff ${(maxValue / max) * 100}%)`
            })
            setCanFind(true)
        } else if(canFind) {
            setCanFind(false);
        }
    }, [minValue, maxValue, max, canFind])
    
    
    const onChangeMin = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const perMin = (newValue / Number(max)) * 100;
            const perMax = (maxValueState / Number(max)) * 100;
            if(newValue >= max - gap) {
                newValue = max - gap;
            }
            if((maxValueState - newValue) <= gap) {
                setMaxValueState(newValue + gap);
                changeFilters(title, [minValueState, newValue + gap])
            }
            
            setMinValueState(Number(newValue));
            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${perMin}% , #0c75ff ${perMin}% , #0c75ff ${perMax}%, #dae4ff ${perMax}%)`
            })

            changeFilters(title, [newValue, maxValueState])
        }
    }
    const onChangeMax = (event:React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.value) {
            let newValue = Number(event.target.value);
            const perMin = (minValueState / Number(max)) * 100;
            const perMax = (newValue / Number(max)) * 100;
            if(newValue <= min + gap) {
                newValue = min + gap;
            }
            if((newValue - minValueState) <= gap) {
                setMinValueState(newValue - gap);
                changeFilters(title, [newValue - gap, maxValueState])
            }
            
            setMaxValueState(newValue);
            setFillRange({
                background: `linear-gradient(to right, #dae4ff ${perMin}% , #0c75ff ${perMin}% , #0c75ff ${perMax}%, #dae4ff ${perMax}%)`
            })

            changeFilters(title, [minValueState, newValue])
        }
    }


    return (
        <div className={styles.Container}>
            <div className={styles.spanContainer}>
                {canFind 
                    ? <><span>{minValueState}</span>—<span>{maxValueState}</span></> 
                    : <div className={styles.NoProdCont}>No products found!</div>
                }
            </div>
            <div className={styles.inputContainer}>
                <div className={styles.sliderTrack} style={fillRange}/>
                <input className={styles.input} type="range" min={min} max={max}  onChange={onChangeMin} value={minValueState}/>
                <input className={styles.input} type="range" min={min} max={max} onChange={onChangeMax} value={maxValueState}/>
            </div>
        </div>
    )
}