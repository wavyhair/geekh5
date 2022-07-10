/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:28:51
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 18:47:59
 * @FilePath: \react-geekh5-ts\src\store\festures\login-slice.ts
 * @Description: login-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { ToKen } from "@/types/data";
const initialState:ToKen = {
    token:'',
    refresh_token:''
}
export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{

    }
})
export const {} = loginSlice.actions
export default loginSlice.reducer