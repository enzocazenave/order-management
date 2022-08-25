import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        orders: [],
        completed_orders: []
    },
    reducers: {
        setOrders: (state, action) => {
            state.orders = action.payload;
        },
    }
});

export const { setOrders } = appSlice.actions;