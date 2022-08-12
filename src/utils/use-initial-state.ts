/*
 * @Author: chenjie
 * @Date: 2022-07-23 15:29:01
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-12 15:07:32
 * @FilePath: \react-geekh5-ts\src\utils\use-initial-state.ts
 * @Description: 获取状态的自定义hooks
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


/**
 * @description:
 * @param {Function} asyncAction
 * @param {Function} selectorHook
 * @return {获取的状态}
 */
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import {useEffect, useRef} from 'react';
import type { RootState } from '@/store';

const useInitialState = (asyncAction: () => any, selectorHook: (state: RootState) => any) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(selectorHook)
    const asyncActionRef = useRef(asyncAction)
    useEffect(() => {
        dispatch(asyncActionRef.current())
    }, [dispatch])
    return state
}

export { useInitialState }
