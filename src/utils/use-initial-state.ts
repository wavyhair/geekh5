

/**
 * @description: 
 * @param {string} action
 * @param {Function} seSelectorHook
 * @return {获取的状态}
 */
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { useEffect } from 'react';
const useInitialState = (asyncAction: any, selectorHook: any) => {
    const dispatch = useAppDispatch()
   
    const state = useAppSelector(selectorHook)

    // console.log('state',state)
    useEffect(() => {
        dispatch(asyncAction())
    }, [dispatch, asyncAction])
    return state
}

export { useInitialState }