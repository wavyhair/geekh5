/*
 * @Author: chenjie
 * @Date: 2022-08-10 09:38:59
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-12 16:20:16
 * @Description: desc
 */

import {SearchResult, SearchResultResponse, Suggestion, SuggestionResponse} from "@/types/data";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from '..'
import http from "@/utils/http";

type SearchState = {
    suggestion: Suggestion['options']
    searchResult: SearchResult
}
const initialState: SearchState = {
    suggestion: [],
    searchResult: {
        page: 1,
        per_page: 10,
        total_count: 0,
        results: [],
    }
}

enum API {
    getSuggestion = '/suggestion',
    getSearchResult = '/search'
}

// 获取搜索建议
export const getSuggestion = createAsyncThunk('search/getSuggestion', async (value: string) => {
    const res = await http.get<SuggestionResponse>(API.getSuggestion, {params: {q: value}})
    return res.data.data
})

// 获取搜索结果
type SearchFnType = {
    page: number
    q: string
}
export const getSearchResult = createAsyncThunk('search/getSearchResult', async (obj: SearchFnType) => {
    const res = await http.get<SearchResultResponse>(API.getSearchResult, {params: {q: obj.q, page: obj.page}})
    return res.data.data
})

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        clearSuggestion: (state) => {
            state.suggestion = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getSuggestion.fulfilled, (state, {payload}) => {
            state.suggestion = payload.options
        })
            .addCase(getSearchResult.fulfilled, (state, {payload}) => {
                    const {page, per_page, results, total_count} = payload
                    state.searchResult.page = page
                    state.searchResult.per_page = per_page
                    state.searchResult.total_count = total_count
                    state.searchResult.results = [...state.searchResult.results,...results]
                }
            )
    }
})
export default searchSlice.reducer
export const {clearSuggestion} = searchSlice.actions
export const selectSuggestion = (state: RootState) => state.search.suggestion
export const selectSearchResult = (state: RootState) => state.search.searchResult
