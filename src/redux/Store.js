import { configureStore } from '@reduxjs/toolkit'
import loginReducer  from './LoginSlice'

const store = configureStore({
    reducer : {
        user : loginReducer,
    }
})

export default store