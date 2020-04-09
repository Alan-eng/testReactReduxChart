import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chart',
  initialState: {
    value: 0,
    activeTimeRange: 'week',
    activeParameter: 'price',
    loading: false,
    data: {
      week: {
        labels: ["01.02", "02.02", "03.02", "04.02", "05.02", "06.02", "07.02"],
        ...createRandomData()
      },
      month: {
        labels: ["02.02", "06.02", "10.02", "14.02", "18.02", "22.02", "26.02"],
        ...createRandomData()
      },
      quarter: {
        labels: ["1 week", "2 week", "3 week", "4 week", "5 week", "6 week"],
        ...createRandomData()
      },
      year: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        ...createRandomData()
      },
      max: {
        labels: ["2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021"],
        ...createRandomData()
      },
    }
  },
  reducers: {
    setData: (state, action) => {
      const { expireDate, price, yeild, spread } = action.payload.data
      const timeInterval = action.payload.timeInterval

      state.data[timeInterval].expireDate = expireDate
      state.data[timeInterval].price = price
      state.data[timeInterval].yeild = yeild
      state.data[timeInterval].spread = spread
    },
    loadingStart: (state, action) => {
      state.loading = true
    },
    loadingStop: (state, action) => {
      state.loading = false
    },
    setChartTimeRange: (state, action) => {
      state.activeTimeRange = action.payload;
    },
    setChartParameter: (state, action) => {
      state.activeParameter = action.payload;
    },
  },
});

export const { 
  increment, 
  decrement, 
  incrementByAmount,
  setDataMonth,
  setData,
  loadingStart,
  loadingStop,
  setChartTimeRange,
  setChartParameter,
} = slice.actions;

function createRandomData () {
  const createRandomArray = () => {return Array.from({length: 10}, () => Math.floor(Math.random() * 1000))}
  const randomData ={
    expireDate: Date.now() + 5000,
    price: createRandomArray(),
    yeild: createRandomArray(),
    spread: createRandomArray()
  }
  return randomData
}

export const fetchDataAsync = timeInterval => (dispatch, getState) => {
  if (Date.now() > getState().chart.data[timeInterval].expireDate){
    dispatch(loadingStart())
    setTimeout(() => {
          dispatch(setData({
            timeInterval,
            data: createRandomData()
          }))
          dispatch(loadingStop())
    }, 1000);
   } else {
    console.log('вы используете свежие данные')
   }
};

export const selectLoadingStatus = state => state.chart.loading;
export const selectActiveParameter = state => state.chart.activeParameter;
export const selectActiveTimeRange = state => state.chart.activeTimeRange;
export const selectActiveData = state => {
  const timeRange = state.chart.activeTimeRange
  const parameter = state.chart.activeParameter
  return {
    labels: state.chart.data[timeRange].labels,
    data: state.chart.data[timeRange][parameter]
  }
}

export default slice.reducer;
