/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:28:51
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-27 23:21:09
 * @FilePath: \react-geekh5-ts\src\store\festures\login-slice.ts
 * @Description: login-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "@/utils/http";
import type { ToKen, LoginResponse } from "@/types/data";
import { setToken, getToken, clearToken } from "@/utils/auth";
import { Toast } from "antd-mobile";

enum API {
    Login = '/authorizations',
    getCode = '/sms/codes/'
}
type LoginParams = {
    mobile: string;
    code: string
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
        logout: (state) => {
            state.token = ''
            clearToken()
        },
        // 因为不清楚在非 react components 环境下如何调用 thunk action 所以写了一个普通的 reducer
        refreshToken: (state, action: PayloadAction<ToKen>) => {
            state.token = action.payload.token
            state.refresh_token = action.payload.refresh_token
            console.log('state', state.refresh_token, state.token)
        }
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
export const { logout, refreshToken } = loginSlice.actions