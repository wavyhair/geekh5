/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:45:02
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-13 18:01:15
 * @FilePath: \react-geekh5-ts\src\pages\Search\Result\index.tsx
 * @Description:
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import { useLocation, useNavigate } from 'react-router-dom'
import { InfiniteScroll, NavBar } from 'antd-mobile'

import ArticleItem from '@/components/ArticleItem'

import styles from './index.module.scss'
import { useInitialState } from "@/utils/use-initial-state";
import { getSearchResult, selectSearchResult } from "@/store/festures/search-slice";
import { SearchResult } from "@/types/data";
import { useRef } from "react";
import { useAppDispatch } from "@/store/hooks";

const Result = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useAppDispatch()
    const params = new URLSearchParams(location.search)
    const q = params.get('q') ?? ''
    const pageRef = useRef<number>(1)
    const searchResult: SearchResult = useInitialState(() => getSearchResult({
        q,
        page: pageRef.current
    }), selectSearchResult)
    const hasMore = (searchResult.page * searchResult.per_page) < searchResult.total_count
    const loadMore = async () => {
        pageRef.current++
        await dispatch(getSearchResult({ q, page: pageRef.current }))
    }
    const renderArticleList = () => {
        return searchResult.results.map((item, index) => {
            const {
                title,
                pubdate,
                comm_count,
                aut_name,
                cover: { type, images }
            } = item

            const articleData = {
                title,
                pubdate,
                comm_count,
                aut_name,
                type,
                images
            }

            return (
                <div
                    key={index}
                    className="article-item"
                    onClick={() => navigate(`/article/${item.art_id}`)}
                >
                    <ArticleItem {...articleData} />
                </div>

            )
        })
    }

    return (
        <div className={styles.root}>
            <NavBar onBack={() => navigate(-1)}>搜索结果</NavBar>
            <div className="article">
                <div className="article-list">{renderArticleList()}</div>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
            </div>

        </div>
    )
}

export default Result
