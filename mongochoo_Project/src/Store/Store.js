import { configureStore, createSlice } from "@reduxjs/toolkit";
import { ServicesApi } from "./ApiSlice";


export const ServiceFilter = createSlice({
    name: 'Filter',
    initialState: { filter: '' },
    reducers: {
        AddFilter: (state, action) => {
            state.filter = action.payload;
        }
    }
})

export const { AddFilter } = ServiceFilter.actions;

export const Store = configureStore({
    reducer: {
        [ServicesApi.reducerPath]: ServicesApi.reducer,
        filter: ServicesApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(ServicesApi.middleware),
})