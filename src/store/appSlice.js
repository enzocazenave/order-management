import { createSlice } from '@reduxjs/toolkit';

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        password: 'thiago123',
        auth: false,
        price_package: 0,
        price_album: 0
    },
    reducers: {
        login: (state, action) => {
            state.price_album = action.payload[0];
            state.price_package = action.payload[1];
            state.auth = true;
        },
    }
});

export const { login } = appSlice.actions;