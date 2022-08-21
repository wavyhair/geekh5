/*
 * @Author: chenjie
 * @Date: 2022-07-10 18:32:23
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-21 16:14:33
 * @FilePath: \react-geekh5-ts\src\types\data.d.ts
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import { type } from "os";


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
    channels: Channel[]
}

// 搜索关键词
export type Suggestion = {
    options: string[]
}

// 搜索结果数据
export type SearchResult = {
    page: number;
    per_page: number;
    total_count: number;
    results: Articles['results'];
}

// 文章详情
export type ArticleDetail = {
    art_id: string;
    title: string;
    pubdate: string;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    is_followed: boolean;
    attitude: number;
    content: string;
    is_collected: boolean;
    // 接口中缺失
    comm_count: number;
    like_count: number;
    read_count: number;
}

// 评论项的类型
export type ArtComment = {
    com_id: string;
    aut_id: string;
    aut_name: string;
    aut_photo: string;
    like_count: number;
    reply_count: number;
    pubdate: string;
    content: string;
    is_liking: boolean;
    is_followed: boolean;
}
// 文章评论的类型
export type ArticleComment = {
    total_count: number;
    end_id: string | null;
    last_id: string | null;
    results: ArtComment[];
}

// 关注作者 收藏文章 点赞文章类型
export type ArticleAction = {
    name: 'is_followed' | 'is_collected' | 'attitude';
    value: boolean | number;
    id?: string
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

// 文章详情响应数据
export type ArticleDetailResponse = ApiResponse<ArticleDetail>

// 评论响应数据
export type ArticleCommentResponse = ApiResponse<ArticleComment>
