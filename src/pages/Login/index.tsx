/*
 * @Author: chenjie
 * @Date: 2022-07-05 21:00:57
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-30 09:46:42
 * @FilePath: \react-geekh5-ts\src\pages\Login\index.tsx
 * @Description: Login
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/store/hooks';
import { Button, NavBar, Form, Input, Toast } from 'antd-mobile';
import { login, getCode } from '@/store/festures/login-slice';
import styles from './index.module.scss';
import { useEffect, useRef, useState } from 'react';
import { InputRef } from 'antd-mobile/es/components/input';
import { useLocation } from 'react-router-dom';
import type { Location } from '@/types/data';

type LoginFrom = {
  mobile: string;
  code: string
}
export default function Login() {
  const dispatch = useAppDispatch()
  const navegete = useNavigate()
  const mobileRef = useRef<InputRef>(null)
  const timerRef = useRef(-1)
  const [form] = Form.useForm()
  const [timeLeft, setTimeLeft] = useState(0)
  const initialValues = {
    mobile: '13911112222',
    code: '246810'
  }

  const location = useLocation() as Location
  console.log('location.state?.from', location.state?.from)
  // 登录
  const onFinish = async (values: LoginFrom) => {
    await dispatch(login(values))
    Toast.show({ content: '登录成功', duration: 600, afterClose: () => { navegete(location.state?.from || '/home/index', { replace: true }) } })
  }
  // 发送验证码
  const sendCode = async () => {
    // 手机号
    const mobile = (form.getFieldValue('mobile') ?? '') as string
    // 手机号是否符合规则
    const hasError = form.getFieldError('mobile').length > 0
    if (mobile.trim() === '' || hasError) {
      return mobileRef.current?.focus()
    }
    // 获取验证码
    await dispatch(getCode(mobile))
    setTimeLeft(60)
    timerRef.current = window.setInterval(() => {
      setTimeLeft((timeLeft) => timeLeft - 1)
    }, 1000)
  }
  useEffect(() => {
    if (timeLeft === 0) {
      clearInterval(timerRef.current)
    }
  }, [timeLeft])
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current)
    }
  }, [])
  return (
    <div className={styles.root}>
      <NavBar></NavBar>
      <div className="login-form">
        <h2 className="title">账号登录</h2>
        <Form onFinish={onFinish} initialValues={initialValues} form={form} >
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
            extra={<span className="code-extra" onClick={timeLeft === 0 ? sendCode : undefined}>
              {timeLeft === 0 ? '发送验证码' : `${timeLeft}秒后重新获取验证码`}
            </span>}
            rules={[{ required: true, message: '请输入验证码' }]}
            validateTrigger="onBlur"
          >
            <Input placeholder="请输入验证码" autoComplete="off" ref={mobileRef} />
          </Form.Item>

          {/* noStyle 表示不提供 Form.Item 自带的样式 */}
          <Form.Item noStyle shouldUpdate>
            {
              () => {
                // form.isFieldsTouched 检查所有字段是否被操作过
                const untouched = !form.isFieldsTouched(true)
                const hasError = form.getFieldsError().filter(({ errors }) => errors.length).length !== 0
                const disabled = untouched || hasError
                return (<Button
                  block
                  type="submit"
                  className="login-submit"
                  disabled={disabled}
                >
                  登 录
                </Button>)
              }
            }
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}
