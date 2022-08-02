/*
 * @Author: chenjie
 * @Date: 2022-08-02 16:29:18
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-02 16:51:34
 * @FilePath: /src/pages/Home/components/ArticleList/index.tsx
 * @Description: null
 */
import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { InfiniteScroll, List } from 'antd-mobile'
import { useState } from 'react'
import { mockRequest } from './mock-request'
const ArticleList = () => {
  const [data, setData] = useState<string[]>([])
  const [hasMore, setHasMore] = useState(true)
  async function loadMore() {
    const append = await mockRequest()
    setData(val => [...val, ...append])
    setHasMore(append.length > 0)
  }
  return (
    <div className={styles.root}>
      {/* 文章列表中的每一项 */}
      <div className="article-item">
        <ArticleItem type={1} />
      </div>
    <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />

    </div>
   
  )
}

export default ArticleList
