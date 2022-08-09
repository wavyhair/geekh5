/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:45:02
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-09 21:21:02
 * @FilePath: \react-geekh5-ts\src\pages\Search\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import classnames from 'classnames'
import { NavBar, SearchBar } from 'antd-mobile'

import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SearchPage = () => {
  const navigate = useNavigate()
  const [searchText, setSearchText] = useState('')
  const flag = true
  // 搜索框发生变化
  const onSearchChange = (value: string) => {
    setSearchText(value)
  }
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onBack={() => navigate(-1)}
        right={<span className="search-text">搜索</span>}
      >
        <SearchBar value={searchText} onChange={onSearchChange} placeholder="请输入关键字搜索" />
      </NavBar>

      {flag && (
        <div
          className="history"
          style={{
            display: flag ? 'none' : 'block'
          }}
        >
          <div className="history-header">
            <span>搜索历史</span>
            <span>
              <Icon type="iconbtn_del" />
              清除全部
            </span>
          </div>

          <div className="history-list">
            <span className="history-item">
              <span className="text-overflow">黑马程序员</span>
              <Icon type="iconbtn_essay_close" />
            </span>
          </div>
        </div>
      )}

      <div className={classnames('search-result', flag ? 'show' : '')}>
        <div className="result-item">
          <Icon className="icon-search" type="iconbtn_search" />
          <div className="result-value text-overflow">
            <span>黑马</span>
            程序员
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
