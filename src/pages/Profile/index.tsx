/*
 * @Author: chenjie
 * @Date: 2022-07-19 18:55:40
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-20 19:26:33
 * @FilePath: \react-geekh5-ts\src\pages\Profile\index.tsx
 * @Description: Profile
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser, selectUser } from '@/store/festures/profile-slice';
export default function Profile() {
    const dispatch = useAppDispatch()
    dispatch(getUser())
    const { photo, name, like_count, follow_count, fans_count, art_count } = useAppSelector(selectUser)
    console.log(photo, name, like_count, follow_count, fans_count, art_count)
    return (
        <div>Profile</div>
    )
}
