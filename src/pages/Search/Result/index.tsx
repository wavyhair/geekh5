/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:45:02
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-11 10:02:08
 * @FilePath: \react-geekh5-ts\src\pages\Search\Result\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import {useLocation, useNavigate} from 'react-router-dom'
import { NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'

const Result = () => {
  const navigate = useNavigate()
  const location = useLocation()
  console.log(location);

  const renderArticleList = () => {
    return [].map((item, index) => {
      const {
        title,
        pubdate,
        comm_count,
        aut_name,
        art_id,
        cover: { type, images }
      } = item

      const articleData = {
        title,
        pubdate,
        comm_count,
        aut_name,
        type,
        images
      }

      return (
        <div
          key={index}
          className="article-item"
        >
          <ArticleItem {...articleData} />
        </div>
      )
    })
  }

  return (
    <div className={styles.root}>
      <NavBar onBack={()=>navigate(-1)}>搜索结果</NavBar>
      <div className="article-list">{renderArticleList()}</div>
    </div>
  )
}

export default Result
