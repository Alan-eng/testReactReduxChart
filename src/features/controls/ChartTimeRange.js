import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    setChartTimeRange,
    selectActiveTimeRange,
    selectLoadingStatus,
    fetchDataAsync
} from '../../app/chartSlice';
import styles from './ChartTimeRange.module.css';


export function TimeRangeButtons({ data }) {
    const dispatch = useDispatch();
    const activeTimeRange = useSelector(selectActiveTimeRange);
    const loading = useSelector(selectLoadingStatus);

    return (
        <>
            < div className={styles.radioToolbar} >
                {['Week', 'Month', 'Quarter', 'Year', 'Max'].map((el) =>
                    <div key={el}>
                        <input
                            type="radio"
                            id={`radio${el}`}
                            name="radioTime"
                            checked={activeTimeRange === el.toLowerCase() ? true : false}
                            onChange={() => {
                                dispatch(fetchDataAsync(el.toLowerCase()))
                                dispatch(setChartTimeRange(el.toLowerCase()))
                            }}
                        />
                        <label htmlFor={`radio${el}`}>{el}</label>
                    </div>
                )}
            </div>
            <p>{loading ? 'Загружаю новые данные...' : 'Данные обновлены'}</p>
        </>

    )
}


export default TimeRangeButtons;
