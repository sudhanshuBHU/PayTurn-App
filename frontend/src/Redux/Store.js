import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './features/CounterSlice'
import  dataReducer  from './features/DataSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    data: dataReducer,
  },
})



