/*
 * @Author: chenjie
 * @Date: 2022-06-17 22:01:05
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-11 19:22:12
 * @FilePath: \react-geekh5-ts\src\utils\http.ts
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import customHistory from '@/utils/history'
import { Toast } from 'antd-mobile'
const baseURL = process.env.REACT_APP_URL
const request = axios.create({
  baseURL,
  timeout: 5000,
})
// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const { login: { token } } = store.getState()
    token && (config.headers!.Authorization = `Bearer ${token}`)
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
    if (!e.response) {
      // 网络超时
      Toast.show({ content: '网络繁忙，请稍后再试', duration: 1000 })
    }
    if (e.response.status === 401) {
      Toast.show({ content: '登录失效', duration: 1000 })
      // store.dispatch(loguout())
      customHistory.push(
        '/login',
        { from: customHistory.location.pathname }
      )
    }
    return Promise.reject(e)
  }
)
export { request }
