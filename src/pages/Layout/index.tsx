/*
 * @Author: chenjie
 * @Date: 2022-07-05 21:00:44
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 14:17:22
 * @FilePath: \react-geekh5-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { Button } from 'antd-mobile'
import styles from './index.module.scss'
import Icon from '@/components/Icon'
export default function Layout() {
  const iconClick = () => {
    console.log('icon被点击 ')
  }
  return (
    <div className={styles.root}>
      <Button>test</Button>
      <div className='div-test'></div>
      <div className='line'></div>
      <Icon type='iconbtn_like_sel' onClick={iconClick} />
    </div>
  )
}
