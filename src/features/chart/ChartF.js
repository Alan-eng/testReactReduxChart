import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    selectActiveData,
} from '../../app/chartSlice';
import { Chart as ChartJS } from 'chart.js';

export function Chart({ data }) {
    const canvas = useRef(null);
    const dataToShow = useSelector(selectActiveData);


    useEffect(() => {
        new ChartJS(canvas.current, {
            type: 'line',
            data: {
                labels: dataToShow.labels,
                datasets: [ {
                    type: "line",
                    label: '',
                    fill: false,
                    data: dataToShow.data,
                    borderColor: 'rgba(22, 115, 143, 0.8)',
                    backgroundColor: 'rgba(22, 115, 143, 1)'
                }]
            }
        });
    });


    return (
            <canvas ref={canvas}></canvas>
    )
}

export default Chart;
