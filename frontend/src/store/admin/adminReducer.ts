import { createSlice } from "@reduxjs/toolkit";

import { AdminItem } from "./type";
import { UsersItem } from "../admin/type";
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
        // login
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
        // 
        // user details
        getUsersDetailsAction: (state) => {
            state.isLoading = true;
        },
        getUsersDetailsSuccessAction: (state, action) => {
            state.isLoading = false;
            state.users = action.payload;
        },
        getUsersDetailsFailureAction: (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            console.log('eror found', state.error)
        },
        // 
        // Add User
        adduserAction: (state) => {
            state.isLoading = true;
        },
        adduserSuccessAction: (state) => {
            state.isLoading = false;
        },
        adduserFailureAction: (state, action) => {
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
    getUsersDetailsSuccessAction,
    adduserAction,
    adduserSuccessAction, 
    adduserFailureAction
} = adminSlice.actions;