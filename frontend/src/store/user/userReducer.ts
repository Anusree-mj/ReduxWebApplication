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
            console.log('getloginaction reducer triggered')
            state.isLoading = true;
        },
        getLoginSuccessAction: (state, action) => {
            // console.log('action n succes action', action)
            state.isLoading = false;
            // state.user = action.payload;
        },
        getLoginFailureAction: (state, action) => {
            console.log('action in failure', action)
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

    }
})

export const {
    getLoginAction,
    getLoginSuccessAction,
    getLoginFailureAction,
    getSignupAction,
    getSignupSuccessAction, getSignupFailureAction,

} = userSlice.actions;