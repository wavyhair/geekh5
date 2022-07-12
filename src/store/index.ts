/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:27:25
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-12 20:50:01
 * @FilePath: \react-geekh5-ts\src\store\index.ts
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { loginSlice } from "./festures/login-slice";
const store = configureStore({
    reducer: {
        login: loginSlice.reducer
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