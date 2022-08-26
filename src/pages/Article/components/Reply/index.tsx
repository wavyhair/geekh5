/*
 * @Author: CHENJIE
 * @Date: 2022-08-26 21:04:02
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-26 21:56:46
 * @FilePath: \react-geekh5-ts\src\pages\Article\components\Reply\index.tsx
 * @Description: 评论回复组件
 */
import { Popup, NavBar } from 'antd-mobile'

import CommentItem from '../CommentItem'
import CommentFooter from '../CommentFooter'
// import CommentInput from '../CommentInput'
import NoneComment from '../NoneComment'

import styles from './index.module.scss'

type Props = {
  onClose: () => void
}
const flag = true

const Reply = ({ onClose }: Props) => {
  return (
    <div className={styles.root}>
      <div className="reply-wrapper">
        <NavBar className="transparent-navbar" onBack={onClose}>
          {0}条回复
        </NavBar>

        {/* 要回复的评论 */}
        <div className="origin-comment">
          <CommentItem type="origin" />
        </div>

        <div className="reply-list">
          <div className="reply-header">全部回复</div>
          {flag ? <CommentItem type="reply" /> : <NoneComment />}
        </div>

        <CommentFooter placeholder="去评论" type="reply" />
      </div>

      {/* 回复文本框对应的抽屉 */}

      <Popup className="reply-popup" position="bottom" visible={false}>
        {/* <CommentInput onClose={} /> */}
      </Popup>
    </div>
  )
}

export default Reply
