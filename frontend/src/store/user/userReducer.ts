import { createSlice } from "@reduxjs/toolkit";

import { UserItem } from "./type";

export interface userStateType {
    user: UserItem;
    isLoading: boolean;
    error: any;
}

const initialState: userStateType = {
    user: {
        id: '',
        name: '',
        email: '',
        image: ''
    },
    isLoading: false,
    error: null
}

export const userSlice: any = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        getLoginAction: (state) => {
            state.isLoading = true;
        },
        getLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        getSignupAction: (state) => {
            state.isLoading = true;
        },
        getSignupSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        getSignupFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        updateProfileAction: (state) => {
            state.isLoading = true;
        },
        updateProfileSuccessAction: (state, action) => {
            state.isLoading = false;
            state.user = action.payload;
        },
        updateProfileFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('error found', state.error)
        },

    }
})

export const {
    getLoginAction,
    getLoginSuccessAction,
    getLoginFailureAction,
    getSignupAction,
    getSignupSuccessAction,
    getSignupFailureAction,
    updateProfileAction,
    updateProfileSuccessAction,
    updateProfileFailureAction
} = userSlice.actions;