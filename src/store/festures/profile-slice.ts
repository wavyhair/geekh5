/*
 * @Author: chenjie
 * @Date: 2022-07-19 20:54:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-24 22:02:52
 * @FilePath: \react-geekh5-ts\src\store\festures\profile-slice.ts
 * @Description: profile-slice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { User, UserResponse, UserProfileResponse, UserProfile } from "@/types/data";
import http from "@/utils/http";
import { Toast } from "antd-mobile";
import { RootState } from "..";

type ProfileState = {
    user: User
    userProfile: UserProfile
}


const initialState = {
    user: {},
    userProfile: {}
} as ProfileState

// 获取用户信息
export const getUser = createAsyncThunk('profile/getUser', async () => {
    try {
        const res = await http.get<UserResponse>('/user')
        return res.data.data
    } catch (e: any) {
        throw Error(e.response.data.message)
    }
})

// 获取个人信息
export const getuserProfile = createAsyncThunk('profile/getuserProfile', async () => {
    try {
        const res = await http.get<UserProfileResponse>('/user/profile')
        return res.data.data
    } catch (e: any) {
        throw Error(e.response.data.message)
    }
})

// 修改个人信息
export const updateUserProfile = createAsyncThunk('profile/updateUserProfile', async (userProfile: Partial<UserProfile>) => {
    try {
        await http.patch('/user/profile', userProfile)
        return userProfile
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
        builder
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.user = payload
            })
            .addCase(getUser.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
            .addCase(getuserProfile.fulfilled, (state, { payload }) => {
                state.userProfile = payload
            })
            .addCase(getuserProfile.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
            .addCase(updateUserProfile.rejected, (state, e) => {
                if (e.error.message) {
                    Toast.show(e.error.message)
                }
            })
    },
})
export default profileSlice.reducer
export const selectUser = (state: RootState) => state.profile.user
export const selectUserProfile = (state: RootState) => state.profile.userProfile