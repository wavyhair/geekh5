/*
 * @Author: chenjie
 * @Date: 2022-07-30 18:34:19
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-01 17:40:12
 * @FilePath: \react-geekh5-ts\src\store\festures\home-slice.ts
 * @Description: homeSlice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import {getToken} from "@/utils/auth";
import http from "@/utils/http";
import type {AllChannelsResponse, Channel, UserChannelResponse} from "@/types/data";
import {createAsyncThunk, createSlice, current, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "..";
import differenceBy from 'lodash/differenceBy'
import sortBy from "lodash/sortBy";
import {UserChannel} from "@/types/data";

enum API {
    getUserChannel = '/user/channels',
    getAllChannel = 'channels',
    delChannel = '/user/channels/'
}

const CHANNEL_KEY = 'GEEK_CHANNEL_KEY'

// 获取用户频道
export const getUserChannel = createAsyncThunk('home/getUserChannel', async () => {
    const token = getToken().token
    if (token) {
        console.log('登录')
        const res = await http.get<UserChannelResponse>(API.getUserChannel)
        return res.data.data.channels
    } else {
        console.log('未登录本地没有数据')
        const localChannel = JSON.parse(localStorage.getItem(CHANNEL_KEY) ?? '[]') as UserChannel
        if (localChannel.channels.length === 0) {
            const res = await http.get<UserChannelResponse>(API.getUserChannel)
            localStorage.setItem(CHANNEL_KEY, JSON.stringify(res.data.data))
            return res.data.data.channels
            // 未登录 本地没有频道数据
        } else {
            console.log('未登录有数据')
            console.log('localChannel', localChannel)
            // 未登录 本地有频道数据
            return localChannel.channels
        }
    }
})

// 获取所有频道
export const getAllChannel = createAsyncThunk('home/getAllChannel', async () => {
    const res = await http.get<AllChannelsResponse>(API.getAllChannel)
    return res.data.data.channels
})

// 删除频道
export const delChannel = createAsyncThunk('home/delChannel', async (channel: Channel) => {
    // 登录
    if (getToken().token) {
        await http.delete(API.delChannel + channel.id)
    } else {
        // 没有登录

        return channel
    }
})

type HomeState = {
    userChannel: Channel[]
    restChannel: Channel[]
    channelActiveKey: string
}
const initialState: HomeState = {
    userChannel: [],
    restChannel: [],
    channelActiveKey: '',
}
export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        changeTab: (state, action: PayloadAction<string>) => {
            state.channelActiveKey = action.payload
        }
    },
    extraReducers: (buider) => {
        buider.addCase(getUserChannel.fulfilled, (state, {payload}) => {
            state.userChannel = payload
            state.channelActiveKey = payload[0].id + ''
        })
            .addCase(getAllChannel.fulfilled, (state, {payload}) => {
                // 在redux 工具包中，状态打印为代理对象。但是有基于 redux-toolkit 的函数 dosc current您可以使用它在 reducer 操作中打印您的状态
                const userChannel = current(state.userChannel)
                const restChannels = differenceBy(payload, userChannel, 'id')
                state.restChannel = restChannels
            })
            .addCase(delChannel.fulfilled, (state, {payload}) => {
                const userChannel: Channel[] = current(state.userChannel)
                const restChannel: Channel[] = current(state.restChannel)
                state.userChannel = userChannel.filter(item => item.id !== payload?.id)
                state.restChannel = sortBy([...restChannel, payload]) as Channel[]
                localStorage.setItem(CHANNEL_KEY, JSON.stringify(restChannel))
            })
    }
})
export default homeSlice.reducer
export const {changeTab,} = homeSlice.actions
export const selectChannels = (state: RootState) => state.home.userChannel
export const selectRestChannels = (state: RootState) => state.home.restChannel
export const selectChannelActiveKey = (state: RootState) => state.home.channelActiveKey