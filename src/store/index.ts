/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:27:25
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-30 18:44:28
 * @FilePath: \react-geekh5-ts\src\store\index.ts
 * @Description: store
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import homeSlice from './festures/home-slice';
import loginSlice from "./festures/login-slice";
import profileSlice from './festures/profile-slice';
const store = configureStore({
    reducer: {
        login: loginSlice,
        profile: profileSlice,
        home: homeSlice
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