/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:25:22
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-26 21:58:35
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
  onShowComment?: () => void
  onLike?: () => void
  onCollected?: () => void
  onCommentShow?: () => void
  attitude?: number
  details?: ArticleDetail,
  placeholder: string,
    isShow?:boolean
}

const CommentFooter = ({ type = 'normal', isShow=true,details, onShowComment, onLike, onCollected, onCommentShow, placeholder = "抢沙发~" }: Props) => {
  return (
    <div className={styles.root}>
      <div className="input-btn" onClick={onCommentShow}>
        <Icon type="iconbianji" />
        <span>{placeholder}</span>
      </div>

      {type === 'normal' && (
        <>
          <div className="action-item" onClick={onShowComment}>
            <Icon type="iconbtn_comment" />
            <p>评论</p>
            {!!1 && <span className="bage">{details?.comm_count}</span>}
          </div>
          <div className="action-item" onClick={onLike} >
            <Icon type={details?.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
            <p>点赞</p>
          </div>
          <div className="action-item" onClick={onCollected}>
            <Icon type={details?.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
            <p>收藏</p>
          </div>
        </>
      )}



      {(type === 'reply' && isShow)&& (
        <div className="action-item" onClick={onLike}>
          <Icon type={details?.attitude === 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
          <p>点赞</p>
        </div>
      )}

        {
            isShow && (
                <div  className="action-item">
                    <Icon type="iconbtn_share" />
                    <p>分享</p>
                </div>

            )
        }


    </div>
  )
}

export default CommentFooter
