/*
 * @Author: chenjie
 * @Date: 2022-07-26 16:56:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-26 20:11:27
 * @FilePath: \react-geekh5-ts\src\components\AuthRoute\index.tsx
 * @Description: AuthRoute
 */
import { getToken } from "@/utils/auth"
import { Navigate, useLocation } from "react-router-dom"
export default function AuthRoute({ element }: any) {
  const isLogin = getToken().token
  const { pathname } = useLocation()
  location.pathname
  return (
    isLogin ? (element) : (<Navigate to="/login" replace state={{ from: pathname }} />)
  )
}
