import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './apis/apiSlice'
import authReducer from './authSlice'
import compareReducer from './compareSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        compare: compareReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})