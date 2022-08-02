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
import {InfiniteScroll, List} from 'antd-mobile'
import {useState} from 'react'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getArticleList, selectArticleList} from "@/store/festures/home-slice";

type Props = {
    channel_id: number
}
const ArticleList = ({channel_id}: Props) => {
    const dispatch = useAppDispatch()
    const [hasMore, setHasMore] = useState(true)
    const channelArticles = useAppSelector(selectArticleList)
    // 此处 频道对应的 文章列表数据 可能是不存在的 所以此处设置默认值
    const currentChannelArticle = channelArticles[channel_id] ?? {pre_timestamp: Date.now()+'', results: []}
    const {pre_timestamp, results} = currentChannelArticle

    async function loadMore() {
        await dispatch(getArticleList({channel_id, pre_timestamp}))
    }

    return (
        <div className={styles.root}>
            {/* 文章列表中的每一项 */}
            {results.map((item) =>
                <div  className="article-item" key={item.art_id}>
                <ArticleItem type={1}/>
            </div>)}

            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}/>

        </div>

    )
}

export default ArticleList
