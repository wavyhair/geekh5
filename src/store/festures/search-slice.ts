/*
 * @Author: chenjie
 * @Date: 2022-08-10 09:38:59
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-10 14:36:47
 * @Description: desc
 */

import {Suggestion, SuggestionResponse} from "@/types/data";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {RootState} from '..'
import http from "@/utils/http";

type SearchState = {
    suggestion: Suggestion['options']
}
const initialState: SearchState = {
    suggestion: []
}

enum API {
    getSuggestion = '/suggestion'
}

export const getSuggestion = createAsyncThunk('search/getSuggestion', async (value: string) => {
    const res = await http.get<SuggestionResponse>(API.getSuggestion, {params: {q: value}})
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
    }
})
export default searchSlice.reducer
export const {clearSuggestion} = searchSlice.actions
export const selectSuggestion = (state: RootState) => state.search.suggestion