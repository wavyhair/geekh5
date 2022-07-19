/*
 * @Author: chenjie
 * @Date: 2022-07-19 20:54:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-19 21:12:59
 * @FilePath: \react-geekh5-ts\src\store\festures\profile-slice.ts
 * @Description: profile-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User } from "@/types/data";
import http from "@/utils/http";
import { Toast } from "antd-mobile";

type ProfileState = {
    user: User
}

type UserResponse = {
    message: string;
    data: User
}
const initialState = {
    user: {}
} as ProfileState


export const getUser = createAsyncThunk('profile/getUser', async () => {
    try {
        const res = await http.get<UserResponse>('/user')
        return res
    } catch (e: any) {
        throw Error(e.response.data.message)
    }
})

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {

    },
    extraReducers(builder) {
        builder.addCase(getUser.fulfilled, (state, { payload }) => {
            console.log('payload', payload)
        })
            .addCase(getUser.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
    },
})
export default profileSlice.reducer