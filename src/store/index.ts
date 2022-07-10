/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:27:25
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 20:54:54
 * @FilePath: \react-geekh5-ts\src\store\index.ts
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./festures/login-slice";
const store = configureStore({
    reducer:{
        login:loginSlice.reducer 
    }
})
export default store