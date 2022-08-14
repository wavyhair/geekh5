/*
 * @Author: chenjie
 * @Date: 2022-07-23 15:29:01
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-14 18:57:53
 * @FilePath: \react-geekh5-ts\src\utils\use-initial-state.ts
 * @Description: 获取状态的自定义hooks
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


/**
 * @description:
 * @param {Function} asyncAction
 * @param {Function} selectorHook
 * @param {Function} afterAction
 * @return {获取的状态}
 */

import { useMemoizedFn } from 'ahooks'
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
import type { RootState } from '@/store';

const useInitialState = (asyncAction: () => any, selectorHook: (state: RootState) => any, afterAction = () => {
    // 空函数必须包含注释  no-empty-function
}) => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(selectorHook)
    const memorizedAction = useMemoizedFn(asyncAction)
    const memorizedAfterAction = useMemoizedFn(afterAction)
    useEffect(() => {
        const loadData = async () => {
            await dispatch(memorizedAction())
            memorizedAfterAction()
        }
        loadData()
    }, [dispatch])
    return state
}

export { useInitialState }
