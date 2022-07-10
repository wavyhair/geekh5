/*
 * @Author: chenjie
 * @Date: 2022-07-05 21:00:44
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 13:16:37
 * @FilePath: \react-geekh5-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { Button } from 'antd-mobile'
import styles from './index.module.scss'
export default function Layout() {
  return (
    <div className={styles.root}>
      <Button>test</Button>
      <div className='div-test'></div>
      <div className='line'></div>
    </div>
  )
}
