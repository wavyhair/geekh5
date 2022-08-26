/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:25:22
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-26 22:02:44
 * @FilePath: \react-geekh5-ts\src\pages\Article\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */



import ContentLoader from 'react-content-loader'
import hljs from 'highlight.js'
import 'highlight.js/styles/dark.css'
import { NavBar, InfiniteScroll, Popup } from 'antd-mobile'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import styles from './index.module.scss'
import { useThrottleFn } from 'ahooks'

import Icon from '@/components/Icon'
import NoneComment from './components/NoneComment'
import CommentInput from './components/CommentInput'
import CommentItem from './components/CommentItem'
import CommentFooter from './components/CommentFooter'

import { useInitialState } from '@/utils/use-initial-state'
import { addComment, getArticleById, getArticleComment, likeComment, selectArticleDetail, selectComment, updateInfo } from '@/store/festures/article-slice'
import { ArticleDetail } from '@/types/data'
import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import Reply from './components/Reply'


/**
   * 导航栏高度常量
   */
const NAV_BAR_HEIGTH = 45

const Article = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)
  const params = useParams<{ artId: string }>()
  const details: ArticleDetail = useInitialState(() => getArticleById(params.artId), selectArticleDetail, () => { setLoading(false) })
  const comments = useAppSelector(selectComment)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const authorRef = useRef<HTMLDivElement>(null)
  const [showNavAuthor, setShowNavAuthor] = useState(false)
  const [commentVisible, setCommentVisible] = useState(false)
  // 评论回复的弹出层
  const [showRepaly, setShowRepaly] = useState(false)

  const commentRef = useRef<HTMLDivElement>(null)
  const isShowComment = useRef(false)
  const loadMoreComments = async () => {
    params.artId && await dispatch(getArticleComment({ type: CommentType.Article, id: params.artId, sort: 'notFirst' }))
  }
  const hasMore = comments.end_id !== comments.last_id
  // 防抖函数
  const { run } = useThrottleFn(() => {
    const { bottom } = authorRef.current!.getBoundingClientRect()
    if (bottom - 44 <= 0) {
      setShowNavAuthor(true)
    } else {
      setShowNavAuthor(false)
    }
  }, { wait: 300 })

  // 导航栏中展示作者信息
  useEffect(() => {
    const wrapperDOM = wrapperRef.current
    wrapperDOM?.addEventListener('scroll', run)
    return () => wrapperDOM?.removeEventListener('scroll', run)
  }, [loading])

  // 展示/隐藏 评论内容
  const onShowComment = () => {
    const wrapper = wrapperRef.current
    const comment = commentRef.current
    if (!wrapper || !comment) return

    const commentTop = comment.getBoundingClientRect().top
    if (!isShowComment.current) {
      // 还没有展示评论信息 需要展示评论信息
      wrapper.scrollTo({
        // wrapper.scrollTop 表示已经滚动的距离
        top: commentTop - NAV_BAR_HEIGTH + wrapper.scrollTop,
        // 如果想要滚动时，带有动画效果，可以使用 smooth 即可
        behavior: 'smooth'
      })
      isShowComment.current = true
    } else {
      // 已经展示评论信息 需要返回页面顶部
      wrapper.scrollTo({ top: 0, behavior: 'smooth' })
      isShowComment.current = false
    }
  }

  // 评论回复弹窗关闭
  const onCommentReplyHide = () => {
    setShowRepaly(false)
  }

  // 来表示评论类型
  enum CommentType {
    Article = 'a', // 文章
    Comment = 'c' // 评论
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

  // 第一次获取评论数据
  useEffect(() => {
    params.artId && dispatch(getArticleComment({ type: CommentType.Article, id: params.artId, sort: 'first' }))
  }, [])

  // 打开评论抽屉
  const onCommentShow = () => {
    setCommentVisible(true)
  }

  // 关闭评论抽屉
  const onCommentHide = () => {
    setCommentVisible(false)
  }

  // 添加评论
  const onAddComment = async (content: string) => {
    await dispatch(addComment({ target: details.art_id, content }))
    onCommentHide()
  }

  // 点赞/取消点赞
  const onThumbsUp = async (art_id: string, is_liking: boolean) => {
    await dispatch(likeComment({ art_id, is_liking }))
  }

  // 渲染评论抽屉方法

  const renderCommentPopup = () => {
    return (
      <Popup
        className="comment-popup"
        position="bottom"
        visible={commentVisible}
        destroyOnClose
        onMaskClick={onCommentHide}
      >
        <div className="comment-popup-wrapper">
          <CommentInput onClose={onCommentHide} onAddComment={onAddComment} />
        </div>
      </Popup>
    )
  }

  const renderArticle = () => {
    // 文章详情
    return (

      <div className="wrapper" ref={wrapperRef}>
        {
          !loading ? (
            <div className="article-wrapper">
              <div className="header">
                <h1 className="title">{details.title}</h1>

                <div className="info">
                  <span>{details.pubdate}</span>
                  <span>{details.read_count}评论</span>
                  <span>{details.comm_count}阅读</span>
                </div>

                <div className="author" ref={authorRef}>
                  <img src={details.aut_photo ?? "http://geek.itheima.net/images/user_head.jpg"} alt="" />
                  <span className="name">{details.aut_name}</span>
                  <span
                    className={classNames('follow', details.is_followed ? 'followed' : '')}
                    onClick={() => {
                      dispatch(updateInfo({ name: 'is_followed', value: details.is_followed, id: details.art_id }))
                    }}
                  >
                    {details.is_followed ? '已关注' : '关注'}
                  </span>
                </div>
              </div>

              <div className="content">
                <div className="content-html dg-html" dangerouslySetInnerHTML={{ __html: details.content }}></div>
                <div className="date">发布文章时间：{details.pubdate}</div>
              </div>
            </div>
          ) : (
            <ContentLoader
              speed={2}
              width={375}
              height={230}
              viewBox="0 0 375 230"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
            >
              <rect x="16" y="8" rx="3" ry="3" width="340" height="10" />
              <rect x="16" y="26" rx="0" ry="0" width="70" height="6" />
              <rect x="96" y="26" rx="0" ry="0" width="50" height="6" />
              <rect x="156" y="26" rx="0" ry="0" width="50" height="6" />
              <circle cx="33" cy="69" r="17" />
              <rect x="60" y="65" rx="0" ry="0" width="45" height="6" />
              <rect x="304" y="65" rx="0" ry="0" width="52" height="6" />
              <rect x="16" y="114" rx="0" ry="0" width="340" height="15" />
              <rect x="263" y="208" rx="0" ry="0" width="94" height="19" />
              <rect x="16" y="141" rx="0" ry="0" width="340" height="15" />
              <rect x="16" y="166" rx="0" ry="0" width="340" height="15" />
            </ContentLoader>
          )
        }


        <div className="comment" ref={commentRef}>
          <div className="comment-header">
            <span>全部评论（{details.comm_count}）</span>
            <span>{details.like_count} 点赞</span>
          </div>
          {
            comments.total_count === 0 ? (<NoneComment />) :
              (<div className="comment-list">
                {
                  comments.results.map((item) => {
                    return <CommentItem
                      key={item.com_id}
                      {...item}
                      onThumbsUp={() => onThumbsUp(item.com_id, item.is_liking)}
                      onReply={() => { setShowRepaly(true) }}

                    />
                  })
                }
                <InfiniteScroll hasMore={hasMore} loadMore={loadMoreComments} />
              </div>)
          }

        </div>
      </div>
    )
  }

  // 渲染评论回复的弹出层
  const renderReply = () => {
    return (
      <Popup
        className="reply-popup"
        position="right"
        visible={showRepaly}
      >
        <div className="comment-popup-wrapper">
          <Reply onClose={onCommentReplyHide} />
        </div>
      </Popup>
    )
  }

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
          {
            showNavAuthor && (<div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">{details.aut_name}</span>
              <span

                className={classNames('follow', details.is_followed ? 'followed' : '')}
                onClick={() => {
                  dispatch(updateInfo({ name: 'is_followed', value: details.is_followed, id: details.art_id }))
                }}
              >
                {details.is_followed ? '已关注' : '关注'}
              </span>
            </div>)
          }
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter
          placeholder='抢沙发~'
          onShowComment={onShowComment}
          onCommentShow={onCommentShow}
          onLike={() => dispatch(updateInfo({ name: 'attitude', value: details.attitude, id: details.art_id }))}
          attitude={details.attitude}
          onCollected={() => dispatch(updateInfo({ name: 'is_collected', value: details.is_collected, id: details.art_id }))}
          details={details}
        />
        {renderCommentPopup()}
        {renderReply()}
      </div>
    </div>
  )
}

export default Article
