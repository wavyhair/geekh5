/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:32:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-27 13:25:00
 * @FilePath: /src/types/data.d.ts
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


// token
export type ToKen = {
    token: string;
    refresh_token: string
}
// 用户信息
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

// 用户信息响应
export type UserResponse = ApiResponse<User>

// 个人信息
export type UserProfile = {
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string;
    intro: string;
}

export type Location = {
    hash:string
    key:string
    pathname:string
    search:string
    state:{
      from :string
    }
  }

// 修改头像响应信息
export type UserPhotoResponse = ApiResponse<{photo:string}>

// 个人信息响应
export type UserProfileResponse =ApiResponse<UserProfile>
