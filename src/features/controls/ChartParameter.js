import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectActiveParameter,
    setChartParameter
} from '../../app/chartSlice';
import styles from './ChartParameter.module.css';


export function ChartParameter({ data }) {
    const select = useRef(null);
    const dispatch = useDispatch();
    const activeParameter = useSelector(selectActiveParameter);


    return (
        <select
            ref={select}
            defaultValue={activeParameter}
            onChange={(selected) => {
                dispatch(setChartParameter(select.current.value.toLowerCase()))
            }}
            className={styles.select} id="cars" name="cars"
            >
            {['Yeild', 'Spread', 'Price'].map((el) =>
                <option key={el}>{el}</option>
            )}
        </select>

    )
}


export default ChartParameter;
