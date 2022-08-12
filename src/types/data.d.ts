/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:32:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-12 14:34:39
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
    message: string;
    data: Data
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

// useLocation 的返回值
export type Location = {
    hash: string
    key: string
    pathname: string
    search: string
    state: {
        from: string
    }
}

// 文章数据
export type Articles = {
    pre_timestamp: string;
    results: {
      art_id: string;
      aut_id: string;
      aut_name: string;
      comm_count: number;
      cover: {
        type: number;
        images: string[];
      };
      pubdate: string;
      title: string;
    }[];
  };

// 频道数据类型
export type Channel = {
    id: number
    name: string
}

// 用户频道数据
export type UserChannel = {
    channels: Channel[]
}
// 所有频道数据
export type AllChannles = {
    channels:Channel[]
}

// 搜索关键词
export type Suggestion = {
    options:string[]
}

// 搜索结果数据
export type SearchResult = {
    page: number;
    per_page: number;
    total_count: number;
    results: Articles['results'];
}

// 修改头像响应信息
export type UserPhotoResponse = ApiResponse<{ photo: string }>

// 个人信息响应
export type UserProfileResponse = ApiResponse<UserProfile>

// 用户频道数据响应
export type UserChannelResponse = ApiResponse<UserChannel>

// 所有频道响应数据
export type AllChannelsResponse = ApiResponse<AllChannles>

// 文章响应数据
export type ArticlesResponse = ApiResponse<Articles>

// 搜索关键词响应数据
export type SuggestionResponse = ApiResponse<Suggestion>

// 搜索结果响应数据
export type SearchResultResponse = ApiResponse<SearchResult>
