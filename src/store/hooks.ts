/*
 * @Author: chenjie
 * @Date: 2022-07-12 20:49:24
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-12 20:50:06
 * @FilePath: \react-geekh5-ts\src\store\hooks.ts
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
