import { configureStore } from '@reduxjs/toolkit'

import memberReducer from './memberSlice'
import { apiSlice } from './apiSlice'

const store = configureStore({
  reducer: {
    members: memberReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

export default store
