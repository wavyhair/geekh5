/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:28:51
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-13 20:34:47
 * @FilePath: \react-geekh5-ts\src\store\festures\login-slice.ts
 * @Description: login-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "@/utils/http";
import type { ToKen } from "@/types/data";
import { setToken, getToken } from "@/utils/auth";
import { Toast } from "antd-mobile";

enum API {
    Login = '/authorizations',
    getCode = '/sms/codes/'
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
    token: getToken().token,
    refresh_token: getToken().refresh_token
}
// 登录
export const login = createAsyncThunk('login/login', async (values: LoginParams) => {
    try {
        const res = await http.post<LoginResponse>(API.Login, values)
        return res.data
    } catch (e: any) {
        throw Error(e.response.data.message)
    }
})
// 获取验证码
export const getCode = createAsyncThunk('login/getCode', async (mobile: string) => {
    try {
        const res = await http.get<LoginResponse>(API.getCode + mobile)
        return res.data
    } catch (e: any) {
        throw Error(e.response.data.message)
    }
})
export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, { payload }) => {
                state.refresh_token = payload!.data.refresh_token
                state.token = payload!.data.token
                setToken({ token: payload!.data.token, refresh_token: payload!.data.refresh_token })
            })
            .addCase(login.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
            .addCase(getCode.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
    }
})
export default loginSlice.reducer