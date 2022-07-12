/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:28:51
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-12 20:54:51
 * @FilePath: \react-geekh5-ts\src\store\festures\login-slice.ts
 * @Description: login-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/utils/http";
import type { ToKen } from "@/types/data";
enum API {
    Login = '/authorizations'
}
type LoginParams = {
    mobile: string;
    code: string
}
type LoginResponse = {
    message: string;
    data: ToKen
}
const initialState: ToKen = {
    token: '',
    refresh_token: ''
}
export const login = createAsyncThunk('login/login', async (values: LoginParams) => {
    const res = await http.post<LoginResponse>(API.Login, values)
    console.log('res ', res)
    return res
})
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    }
})
export default loginSlice.reducer