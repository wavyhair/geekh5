/*
 * @Author: chenjie
 * @Date: 2022-07-23 15:29:01
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-26 15:32:23
 * @FilePath: /src/pages/Profile/Edit/components/EditInput/index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { Input, NavBar, TextArea } from 'antd-mobile'
import { useMemo, useState } from 'react'

import styles from './index.module.scss'

type Props = {
  onClose: () => void
  value: string
  type: 'name' | 'intro' | 'gender' | 'photo' |'' | 'birthday'
  updateProfile: (key: Props['type'], value: string) => void
}
const EditInput = ({ onClose, value, updateProfile, type }: Props) => {
  const [inputValue, setInputValue] = useState(value)
  const inputType = useMemo(() => {
    return type === 'name' ? true : false
  }, [type])
  // 提交
  const onSave = () => {
    updateProfile(type, inputValue)
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={onClose}
        right={<span className="commit-btn" onClick={onSave}>提交</span>}
      >
        {inputType ? '编辑昵称' : '编辑简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3> {inputType ? '昵称' : '简介'}</h3>
        {inputType ?
          <div className="input-wrap">
            <Input placeholder="请输入昵称" value={inputValue} onChange={setInputValue} />
          </div> : <TextArea rows={3} maxLength={100} showCount className='textarea' placeholder='请输入简介' value={inputValue} onChange={setInputValue} />}

      </div>
    </div>
  )
}

export default EditInput
