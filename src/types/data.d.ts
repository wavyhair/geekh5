/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:32:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-19 20:53:04
 * @FilePath: \react-geekh5-ts\src\types\data.d.ts
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
// token
export type ToKen = {
    token: string;
    refresh_token: string
}
// 个人信息
export type User = {
    id: string;
    name: string;
    photo: string;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
}
// 响应类型
type ApiResponse<Data> = {
    message:string;
    data:Data
}
// 登录
export type LoginResponse = ApiResponse<ToKen>

// 用户个人信息
export  type UserResponse = ApiResponse<User>