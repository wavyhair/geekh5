/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:25:22
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-26 21:39:09
 * @FilePath: \react-geekh5-ts\src\pages\Article\components\CommentItem\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import dayjs from 'dayjs'
import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'
import { ArtComment } from '@/types/data'

type Props = Partial<ArtComment> & {
  // normal 普通 - 文章的评论
  // origin 回复评论的原始评论，也就是对哪个评论进行回复
  // reply 回复评论
  type?: 'normal' | 'reply' | 'origin',
  onThumbsUp?: () => void
  onReply?: () => void
}

const CommentItem = ({
  // normal 普通
  // origin 回复评论的原始评论
  // reply 回复评论
  type = 'normal', onThumbsUp, onReply, aut_photo, aut_name, like_count, is_followed, is_liking, content, reply_count, pubdate
}: Props) => {
  // 回复按钮
  const replyJSX =
    type === 'normal' ? (
      <span className="replay" onClick={onReply}>
        {reply_count} 回复
        <Icon type="iconbtn_right" />
      </span>
    ) : null

  return (
    <div className={styles.root}>
      <div className="avatar">
        <img src={aut_photo || "http://geek.itheima.net/images/user_head.jpg"} alt="" />
      </div>
      <div className="comment-info">
        <div className="comment-info-header">
          <span className="name">{aut_name}</span>
          {/* 文章评论、评论的回复 */}
          {(type === 'normal' || type === 'reply') && (
            <span className="thumbs-up">
              {like_count}
              <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} onClick={onThumbsUp} />
            </span>
          )}
          {/* 要回复的评论 */}
          {type === 'origin' && (
            <span className={classnames('follow', is_followed ? 'followed' : '')}>
              {is_followed ? '已关注' : '关注'}
            </span>
          )}
        </div>
        <div className="comment-content">{content}</div>
        <div className="comment-footer">
          {replyJSX}
          {/* 非评论的回复 */}
          {type !== 'reply' && (
            <span className="comment-time">{dayjs().from(pubdate)}</span>
          )}
          {/* 文章的评论 */}
          {type === 'origin' && (
            <span className="thumbs-up">
              {like_count}
              <Icon type={is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} onClick={onThumbsUp} />
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentItem
