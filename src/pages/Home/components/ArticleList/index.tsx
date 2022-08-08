/*
 * @Author: chenjie
 * @Date: 2022-08-02 19:56:03
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-08 21:30:26
 * @FilePath: \react-geekh5-ts\src\pages\Home\components\ArticleList\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { InfiniteScroll, PullToRefresh } from 'antd-mobile'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getArticleList, selectArticleList } from "@/store/festures/home-slice";
import { useNavigate } from 'react-router-dom';

type Props = {
    channel_id: number
}
const ArticleList = ({ channel_id }: Props) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const channelArticles = useAppSelector(selectArticleList)
    // 此处 频道对应的 文章列表数据 可能是不存在的 所以此处设置默认值
    const currentChannelArticle = channelArticles[channel_id] ?? { pre_timestamp: Date.now() + '', results: [] }
    const { pre_timestamp, results } = currentChannelArticle

    // 加载更多数据的函数
    async function loadMore() {
        await dispatch(getArticleList({ channel_id, pre_timestamp, isPullDown: false }))
    }

    // 是否加载更多数据的条件
    // 如果  pre_timestamp 的值为 null 说明没有更多数据
    // 此时 hasMore 值为 false 那么 InfiniteScroll 组件不会再次获取数据了
    const hasMore = pre_timestamp !== null
    const renderArticleList = () => {
        return results.map((item) => {
            const { title, pubdate, aut_name, comm_count, cover: {
                type,
                images
            }
            } = item
            const articleData = {
                title, pubdate, aut_name, type, images, comm_count
            }
            return <div className="article-item" onClick={() => navigate(`/article/${item.art_id}`)} key={item.art_id}>
                <ArticleItem {...articleData} />
            </div>
        }
        )

    }
    // 下拉刷新
    const onRefresh = async () => {
        await dispatch(getArticleList({ channel_id, pre_timestamp: Date.now() + '', isPullDown: true }))
    }
    return (
        <div className={styles.root}>
            {/* 文章列表中的每一项 */}

            <PullToRefresh onRefresh={onRefresh}>
                {renderArticleList()}
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </PullToRefresh>
        </div>

    )
}

export default ArticleList
