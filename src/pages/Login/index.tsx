/*
 * @Author: chenjie
 * @Date: 2022-07-05 21:00:57
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-12 20:58:18
 * @FilePath: \react-geekh5-ts\src\pages\Login\index.tsx
 * @Description: Login
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { login } from '@/store/festures/login-slice';
import styles from './index.module.scss';
import { Button, NavBar, Form, Input } from 'antd-mobile';
import { useAppDispatch } from '@/store/hooks';
type LoginFrom = {
  mobile: string;
  code: string
}
export default function Login() {
  const dispatch = useAppDispatch()
  const onFinish = async (values: LoginFrom) => {
    await dispatch(login(values))
  }
  const initialValues = {
    mobile: '18064324942',
    code: '121212'
  }
  return (
    <div className={styles.root}>
      <NavBar></NavBar>
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form onFinish={onFinish} initialValues={initialValues}>
          <Form.Item
            className="login-item"
            validateTrigger="onBlur"
            name="mobile"
            rules={[
              { required: true, message: '请输入手机号' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误'
              }
            ]}>
            <Input placeholder="请输入手机号" />
          </Form.Item>

          <Form.Item
            className="login-item"
            name="code"
            extra={<span className="code-extra">发送验证码</span>}
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
          >
            <Input placeholder="请输入验证码" autoComplete="off" />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle>
            <Button
              block
              type="submit"
              className="login-submit"
            >
              登 录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}
