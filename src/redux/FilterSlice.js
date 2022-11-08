import {  createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(sessionStorage.getItem('filter')) || {}

const FilterSlice = createSlice({
    name : 'filter',
    initialState,
    reducers : {
        saveFilter : (state) => {
            let t = JSON.parse(sessionStorage.getItem('filter')) || {}
            console.log(t)
            return t
        }
    }
})

export const {saveFilter} = FilterSlice.actions

export default FilterSlice.reducer