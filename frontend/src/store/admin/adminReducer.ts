import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from "./type";
import { UsersItem } from "../user/type";
export interface adminStateType {
    admin: AdminItem;
    users: UsersItem[];
    isLoading: boolean;
    error: any;
}

const initialState: adminStateType = {
    admin: {
        id: '',
        name: '',
        email: ''
    },
    users: [],
    isLoading: false,
    error: null
}

export const adminSlice: any = createSlice({
    name: "admin",
    initialState: initialState,
    reducers: {
        getAdminLoginAction: (state) => {
            state.isLoading = true;
        },
        getAdminLoginSuccessAction: (state, action) => {
            state.isLoading = false;
            state.admin = action.payload;
        },
        getAdminLoginFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        getUsersDetailsAction: (state) => {
            state.isLoading = true;
        },
        getUsersDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
            console.log('state.users have',state.users)
        },
        getUsersDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },

    }
})

export const {
    getAdminLoginAction,
    getAdminLoginSuccessAction,
    getAdminLoginFailureAction,
    getUsersDetailsAction,
    getUsersDetailsFailureAction,
    getUsersDetailsSuccessAction
} = adminSlice.actions;