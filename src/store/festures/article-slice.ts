/*
 * @Author: chenjie
 * @Date: 2022-08-13 17:10:29
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-20 21:40:45
 * @FilePath: \react-geekh5-ts\src\store\festures\article-slice.ts
 * @Description: articleSlice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


import dayjs from "dayjs";
import { ArticleAction, ArticleDetail, ArticleDetailResponse } from "@/types/data";
import http from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


enum API {
    getArticleById = '/articles/',
    followings = '/user/followings',
    likings = '/article/likings',
    collections = '/article/collections'
}

type ArticleState = {
    detail: ArticleDetail
}

const initialState: ArticleState = {
    detail: {
        art_id: '',
        title: '',
        pubdate: '',
        aut_id: '',
        aut_name: '',
        aut_photo: '',
        is_followed: true,
        attitude: 0,
        content: '',
        is_collected: true,
        comm_count: 0,
        like_count: 0,
        read_count: 0
    }
}

// 获取文章详情
export const getArticleById = createAsyncThunk('article/getArticleById', async (id?: string) => {
    const res = await http.get<ArticleDetailResponse>(API.getArticleById + id)
    return res.data.data

})

// 关注 点赞 收藏
export const updateInfo = createAsyncThunk('article/updateInfo', async (data: ArticleAction) => {
    // 是否点赞
    if (data.name === 'is_followed') {
        console.log('data.value', data.value)
        if (data.value) {
            // 取消关注
            await http.delete(API.followings + '/' + data.id)
        } else {
            // 关注
            await http.post(API.followings, { target: data.id })
        }
    } else if (data.name === 'attitude') { // 是否点赞
        if (data.value === 1) {
            // 取消点赞
            await http.delete(API.likings + '/' + data.id)
        } else {
            // 点赞
            await http.post(API.likings, { target: data.id })
        }
    } else {
        // 是否收藏
        if (data.value) {
            // 取消收藏
            await http.delete(API.collections + '/' + data.id)

        } else {
            // 收藏
            await http.post(API.collections, { target: data.id })
        }
    }
    return data
})

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(getArticleById.fulfilled, (state, { payload }) => {
                state.detail = payload
                state.detail.pubdate = dayjs(payload.pubdate).locale('zh-cn').fromNow()
            })
            .addCase(updateInfo.fulfilled, (state, { payload }) => {
                if (payload.name === 'attitude') { // 单独处理点赞
                    state.detail = { ...state.detail, attitude: payload.value === 1 ? 0 : 1 }
                } else {
                    state.detail = { ...state.detail, [payload.name]: !payload.value }

                }
            })
    },
})

export default articleSlice.reducer
export const selectArticleDetail = (state: RootState) => state.article.detail
