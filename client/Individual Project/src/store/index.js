import { configureStore } from '@reduxjs/toolkit'
import albumReducer from './album'

export const store = configureStore({
  reducer: {
    albums: albumReducer
  },
})