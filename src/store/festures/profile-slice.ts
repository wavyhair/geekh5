/*
 * @Author: chenjie
 * @Date: 2022-07-19 20:54:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-20 19:09:07
 * @FilePath: \react-geekh5-ts\src\store\festures\profile-slice.ts
 * @Description: profile-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User,UserResponse } from "@/types/data";
import http from "@/utils/http";
import { Toast } from "antd-mobile";
import { RootState } from "..";

type ProfileState = {
    user: User
}


const initialState = {
    user: {}
} as ProfileState


export const getUser = createAsyncThunk('profile/getUser', async () => {
    try {
        const res = await http.get<UserResponse>('/user')
        return res.data.data
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
            state.user = payload
        })
            .addCase(getUser.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
    },
})
export default profileSlice.reducer
export const selectUser = (state: RootState) => state.profile.user