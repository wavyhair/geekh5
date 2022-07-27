/*
 * @Author: chenjie
 * @Date: 2022-06-17 22:01:05
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-27 23:25:38
 * @FilePath: \react-geekh5-ts\src\utils\http.ts
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import axios from 'axios'
import store from '@/store'
import customHistory from '@/utils/history'
import { Toast } from 'antd-mobile'
import { setToken } from './auth'
import { login, logout, refreshToken } from '@/store/festures/login-slice'
const baseURL = process.env.REACT_APP_URL
const http = axios.create({
  baseURL,
  timeout: 5000,
})
// 请求拦截器
http.interceptors.request.use(
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
http.interceptors.response.use(
  (res) => {
    return res
  },
  async (e) => {
    if (!e.response) {
      // 网络超时
      Toast.show({ content: '网络繁忙，请稍后再试', duration: 1000 })
    }
    if (e.response.status === 401) {
      try {
        // 先判断 redux 中是否有 refesh_token
        const { refresh_token } = store.getState().login
        if (!refresh_token) {
          /**
           * 因为 try catch 无法直接捕获 Promise 错误
           * 所以 此处通过 await 等待 Promise 完成之后就可以捕获到异常了
           */
          await Promise.reject(e)
        }
        const res = await axios.put(`${baseURL}/authorizations`, null, { headers: { Authorization: `Bearer ${refresh_token}` } })
        const tokens = {
          token: res.data.data.token,
          refresh_token
        }
        setToken(tokens)
        store.dispatch(refreshToken(tokens))
        console.log('store.getState()', store.getState())
        return http(e.config)
      } catch (e) {
        store.dispatch(logout)
        Toast.show({ content: '登录失效', duration: 1000 })
        // store.dispatch(loguout())
        customHistory.push(
          '/login',
          { from: customHistory.location.pathname }
        )
      }


    }
    return Promise.reject(e)
  }
)
export default http 
