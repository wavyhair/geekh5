/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:25:22
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-14 17:11:13
 * @FilePath: \react-geekh5-ts\src\pages\Article\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


import hljs from 'highlight.js'
import 'highlight.js/styles/dark.css'
import { NavBar, InfiniteScroll } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'

import Icon from '@/components/Icon'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'
import { useInitialState } from '@/utils/use-initial-state'
import { getArticleById, selectArticleDetail } from '@/store/festures/article-slice'
import { ArticleDetail } from '@/types/data'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'



const Article = () => {
  const params = useParams<{ artId: string }>()
  const details: ArticleDetail = useInitialState(() => getArticleById(params.artId), selectArticleDetail)
  const navigate = useNavigate()

  const loadMoreComments = async () => {
    console.log('加载更多评论')
  }

  // 处理代码高亮
  useEffect(() => {
    const codes = document?.querySelectorAll('.dg-html pre > code')
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        hljs.highlightElement(el as HTMLElement)
      })
    }
    hljs.configure({
      // 忽略警告
      ignoreUnescapedHTML: true
    })
  }, [details])

  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{details.title}</h1>

            <div className="info">
              <span>{details.pubdate}</span>
              <span>{details.read_count}</span>
              <span>{details.comm_count}</span>
            </div>

            <div className="author">
              <img src={details.aut_photo ?? "http://geek.itheima.net/images/user_head.jpg"} alt="" />
              <span className="name">{details.aut_name}</span>
              <span className={classNames('follow', details.is_followed ? 'followed' : '')}>
                {details.is_collected ? '已关注' : '关注'}
              </span>
            </div>
          </div>

          <div className="content">
            <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: details.content }}></div>
            <div className="date">发布文章时间：{details.pubdate}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{details.comm_count}）</span>
            <span>{details.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }
  const flag = true

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => navigate(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {flag && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames('follow', flag ? 'followed' : '')}>
                {flag ? '已关注' : '关注'}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
