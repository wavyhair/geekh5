/*
 * @Author: chenjie
 * @Date: 2022-07-23 15:29:01
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-24 18:00:32
 * @FilePath: \react-geekh5-ts\src\pages\Profile\Edit\components\EditInput\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { Input, NavBar } from 'antd-mobile'
import { useState } from 'react'

import styles from './index.module.scss'

type Props = {
  onClose: () => void
  value: string
  updateName: (name: string) => void
}
const EditInput = ({ onClose, value, updateName }: Props) => {
  const [inputValue, setInputValue] = useState(value)
  // 提交
  const onSave = () => {
    updateName(inputValue)
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={onClose}
        right={<span className="commit-btn" onClick={onSave}>提交</span>}
      >
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          <Input placeholder="请输入" value={inputValue} onChange={setInputValue} />
        </div>
      </div>
    </div>
  )
}

export default EditInput
