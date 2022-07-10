/*
 * @Author: chenjie
 * @Date: 2022-06-17 22:01:05
 * @LastEditors: chenjie
 * @LastEditTime: 2022-06-26 21:26:58
 * @FilePath: \cnblogs\src\utils\http.js
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import { getToken } from './auth'
import { customHistory } from '../utils'
import { message } from 'antd'
import { loguout } from '@/store/festures/user-slice'
const baseURL = process.env.REACT_APP_URL
const request = axios.create({
  baseURL,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getToken()
    token && (config.headers.Authorization = `Bearer ${token}`)
    return config
  },
  (e) => {
    Promise.reject(e)
  }
)
// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res?.data?.data || res
  },
  (e) => {
    if (e.response.status === 401) {
      message.error('登录失效')
      store.dispatch(loguout())
      customHistory.push({
        pathname: '/login',
        state: { from: customHistory.location.pathname }, // 当前的页面
      })
    }
    return Promise.reject(e)
  }
)
export { request }
