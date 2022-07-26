/*
 * @Author: chenjie
 * @Date: 2022-07-26 16:56:23
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-26 17:28:28
 * @FilePath: /src/components/AuthRoute/index.tsx
 * @Description: AuthRoute
 */
import { getToken } from "@/utils/auth"
import { Navigate,  useLocation } from "react-router-dom"
export default function AuthRoute(element:JSX.Element) {
    const isLogin = getToken().token
    const location = useLocation()
    location.pathname
  return (
   isLogin?(element):(<Navigate to="/login" replace state={{from:location.pathname}} />)
  )
}
