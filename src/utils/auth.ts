/*
 * @Author: chenjie
 * @Date: 2022-06-08 20:27:35
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 20:53:53
 * @FilePath: \react-geekh5-ts\src\utils\auth.ts
 * @Description: auth
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import type { ToKen } from "@/types/data"

const TOKEN_KEY = 'geek-h5-token'
// 获取 token 
/**
 * 
 * 因为 token 存储的是 {token,refresh_token} 形式的对象
 *  所以此处设置的默认值也应该设置为 对象 格式 所以使用'{}' 
 */
export const getToken = ():ToKen => JSON.parse(sessionStorage.getItem(TOKEN_KEY) ?? '{}')
// 清除 token

export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY)
// 存储 token
export const setToken = (token: ToKen) => {
    sessionStorage.setItem(TOKEN_KEY, JSON.stringify(token
    ))
}

