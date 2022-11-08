import {  createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(sessionStorage.getItem('user'))

const LoginSlice = createSlice({
    name : 'login',
    initialState,
    reducers : {
        saveUser : (state) => {
            return [...state , ...JSON.parse(sessionStorage.getItem('user'))]
        }
    }
})

export const {saveUser} = LoginSlice.actions

export default LoginSlice.reducer