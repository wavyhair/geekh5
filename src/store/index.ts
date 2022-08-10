/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:27:25
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-10 09:46:52
 * @FilePath: \react-geekh5-ts\src\store\index.ts
 * @Description: store
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeSlice from './festures/home-slice';
import loginSlice from "./festures/login-slice";
import profileSlice from './festures/profile-slice';
import searchSlice from "@/store/festures/search-slice";
const store = configureStore({
    reducer: {
        login: loginSlice,
        profile: profileSlice,
        home: homeSlice,
        search: searchSlice
    }
})
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export default store