/*
 * @Author: chenjie
 * @Date: 2022-08-13 17:10:29
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-14 17:55:27
 * @FilePath: \react-geekh5-ts\src\store\festures\article-slice.ts
 * @Description: articleSlice
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


import dayjs from "dayjs";
import { ArticleDetail, ArticleDetailResponse } from "@/types/data";
import http from "@/utils/http";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


enum API {
    getArticleById = '/articles/'
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

export const articleSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getArticleById.fulfilled, (state, { payload }) => {
            state.detail = payload
            state.detail.pubdate = dayjs(payload.pubdate).locale('zh-cn').fromNow()
        })
    },
})

export default articleSlice.reducer
export const selectArticleDetail = (state: RootState) => state.article.detail
