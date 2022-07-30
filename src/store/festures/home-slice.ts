/*
 * @Author: chenjie
 * @Date: 2022-07-30 18:34:19
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-30 20:36:28
 * @FilePath: \react-geekh5-ts\src\store\festures\home-slice.ts
 * @Description: homeSlice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { getToken } from "@/utils/auth";
import http from "@/utils/http";
import type { Channel, UserChannelResponse } from "@/types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
export const getUserChannel = createAsyncThunk('home/getUserChannel', async () => {
    const CHANNEL_KEY = 'GEEK_CHANNEL_KEY'
    const token = getToken().token
    if (token) {
        const res = await http.get<UserChannelResponse>('/user/channels')
        return res.data.data.channels
    } else {
        const localChannel = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as Channel[]
        if (localChannel.length === 0) {
            const res = await http.get<UserChannelResponse>('/user/channels')
            console.log('未登录 本地没有频道数据 ', res)
            localStorage.setItem(CHANNEL_KEY, JSON.stringify(res.data.data))
            return res.data.data.channels
            // 未登录 本地没有频道数据
        } else {
            // 未登录 本地有频道数据
            console.log('未登录 本地有频道数据 ', localChannel)
            return localChannel
        }
    }
})

type HomeState = {
    userChannel: Channel[]
}
const initialState: HomeState = {
    userChannel: []
}
export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (buider) => {
        buider.addCase(getUserChannel.fulfilled, (state, { payload }) => {
            state.userChannel = payload
        })
    }
})
export default homeSlice.reducer
export const selectChannels = (state: RootState) => state.home.userChannel