/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:25:22
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-22 20:25:45
 * @FilePath: \react-geekh5-ts\src\pages\Article\components\CommentFooter\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import Icon from '@/components/Icon'
import { ArticleDetail } from '@/types/data'
import styles from './index.module.scss'

type Props = {
  // normal 普通评论
  // reply 回复评论
  type?: 'normal' | 'reply'
  onShowComment: () => void
  onLike: () => void
  onCollected: () => void
  onCommentShow: () => void
  attitude: number
  details: ArticleDetail
}

const CommentFooter = ({ type = 'normal', details, onShowComment, onLike, onCollected, onCommentShow }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onCommentShow}>
        <Icon type="iconbianji" />
        <span>抢沙发</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{1}</span>}
          </div>
          <div className="action-item" onClick={onLike} >
            <Icon type={details.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollected}>
            <Icon type={details.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}

      {type === 'reply' && (
        <div className="action-item" onClick={onLike}>
          <Icon type={details.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

      <div className="action-item">
        <Icon type="iconbtn_share" />
        <p>分享</p>
      </div>
    </div>
  )
}

export default CommentFooter
