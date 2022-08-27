/*
 * @Author: CHENJIE
 * @Date: 2022-08-26 21:04:02
 * @LastEditors: CHENJIE
 * @LastEditTime: 2022-08-27 11:31:40
 * @FilePath: \react-geekh5-ts\src\pages\Article\components\Reply\index.tsx
 * @Description: 评论回复组件
 */
import {Popup, NavBar} from 'antd-mobile'

import CommentItem from '../CommentItem'
import CommentFooter from '../CommentFooter'
// import CommentInput from '../CommentInput'
import NoneComment from '../NoneComment'

import styles from './index.module.scss'
import {AddCommentReplyResponse, ArtComment, ArticleComment, ArticleCommentResponse} from '@/types/data'
import {useEffect, useState} from 'react'
import http from '@/utils/http'
import CommentInput from "@/pages/Article/components/CommentInput";

type Props = {
    onClose: (commentId: string, total: number) => void
    commentItem: ArtComment // 原始评论
    onReplyThumbsUp: (art_id: string, is_liking: boolean) => void // 点赞
    articleId?:string
}

const Reply = ({onClose, commentItem, onReplyThumbsUp,articleId}: Props) => {
    // 评论组件显示状态
    const [replyVisible, setReplyVisible] = useState(false)
    // 原始评论项的状态
    const [originComment, setOriginComment] = useState(commentItem)
    // 拿到原始评论的 id
    const {com_id, is_liking, like_count} = originComment
    // 评论项的回复列表状态
    const [commentReply, setCommentReply] = useState({} as ArticleComment)
    useEffect(() => {
        const loadData = async () => {
            const res = await http.get<ArticleCommentResponse>('/comments', {params: {type: 'c', source: com_id}})
            setCommentReply(res.data.data)
        }
        loadData()
    }, [articleId])

    // 点赞
    const onOriginThumbsUp = () => {
        // 通知父组件更新当前评论的点赞状态
        onReplyThumbsUp(com_id, is_liking)
        const likeCount = is_liking ? -1 : 1
        setOriginComment({
            ...originComment,
            is_liking: !is_liking,
            like_count: like_count + likeCount
        })
    }

    // 评论展示
    const onReplyInputShow = ()=>{
        setReplyVisible(true)
    }


    // 评论隐藏
    const onReplyInputHide = ()=>{
        setReplyVisible(false)
    }


    // 添加评论
    const onAddReply = async (content:string)=>{
    const  res =await http.post<AddCommentReplyResponse>('/comments',{
        target:com_id,
        content,
        art_id:com_id
    })
        // 更新当前页面内容
        setCommentReply({
            ...commentReply,
            total_count:commentReply.total_count+1,
            results:[res.data.data.new_obj,...commentReply.results]
        })
        onReplyInputHide()
    }
    return (
        <div className={styles.root}>
            <div className="reply-wrapper">
                <NavBar className="transparent-navbar" onBack={()=>onClose(com_id,commentReply.total_count)}>
                    {commentReply.results?.length}条回复
                </NavBar>

                {/* 要回复的评论 */}
                <div className="origin-comment">
                    <CommentItem type="origin" {...originComment} onThumbsUp={onOriginThumbsUp}/>
                </div>

                <div className="reply-list">
                    <div className="reply-header">全部回复</div>
                    {commentReply.total_count > 0 ? (
                        commentReply.results.map((item) => <CommentItem type="reply" key={item.com_id} {...item} />)
                    ) : <NoneComment/>}
                </div>

                <CommentFooter placeholder={commentReply.total_count>0?"去评论":"抢沙发"} type="reply"  onCommentShow={onReplyInputShow} isShow={false}/>
            </div>

            {/* 回复文本框对应的抽屉 */}

            <Popup className="reply-popup" position="bottom" visible={replyVisible} destroyOnClose>
                <CommentInput name={originComment.aut_name}  onClose={onReplyInputHide } onAddComment={onAddReply } />
            </Popup>
        </div>
    )
}

export default Reply
