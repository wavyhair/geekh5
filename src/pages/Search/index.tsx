/*
 * @Author: chenjie
 * @Date: 2022-08-08 21:45:02
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-10 17:12:09
 * @FilePath: \react-geekh5-ts\src\pages\Search\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import classnames from 'classnames'
import {NavBar, SearchBar} from 'antd-mobile'
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import {getSuggestion, selectSuggestion, clearSuggestion} from "@/store/festures/search-slice";
import {useDebounceFn} from "ahooks";
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'


const SearchPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [searchText, setSearchText] = useState('')
    const [searchHistory, setSearchHistory] = useState<string[]>([])
    const GEEK_SEARCH_KEY = 'GEEK_SEARCH_KEY'
    const suggestion = useAppSelector(selectSuggestion)

    useEffect(() => {
        const history = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]') as string[]
        if (history.length > 0) {
            setSearchHistory(history)
        }
    }, [])
    // 处理高亮词
    const highLightSuggest = suggestion.map((item) => {
        if (item) {
            const lowerCaseItem = item.toLowerCase()
            const lowerCaseSearchText = searchText.toLowerCase()
            const index = lowerCaseItem.indexOf(lowerCaseSearchText)
            const searchTextLength = searchText.length
            const left = item.slice(0, index)
            const right = item.slice(index + searchTextLength)
            const search = item.slice(index, index + searchTextLength)
            return {
                left, right, search
            }
        }
    })

    // 防抖方法
    const {run: debounGetSuggest} = useDebounceFn((value: string) => {
        dispatch(getSuggestion(value))
    }, {wait: 500})

    // 搜索框发生变化
    const onSearchChange = (value: string) => {
        setSearchText(value)
        if (value.trim() === '') return dispatch(clearSuggestion())
        debounGetSuggest(value)
    }

    // 搜索
    const onSearch = (value: string) => {
        dispatch(clearSuggestion())
        navigate(`/search/result?q=${value}`)
        saveHistories(value)
    }

    // 历史记录
    const saveHistories = (value: string) => {
        const locationHistories = JSON.parse(localStorage.getItem(GEEK_SEARCH_KEY) ?? '[]') as string[]
        let histories = []
        if (locationHistories.length === 0) {
            // 本地存储没有
            histories = [value]
        } else {
            // 本地存储有
            const exist = locationHistories.indexOf(value)
            if (exist) {
                // 存在
                locationHistories.filter((item) => item !== value)
                histories = [value, ...locationHistories]
            } else {
                // 不存在
                histories = [value, ...locationHistories]
            }
        }
        localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(histories))

    }

    // 清除所有历史记录
    const clearAllHistorys = () => {
        localStorage.removeItem(GEEK_SEARCH_KEY)
        setSearchHistory([])
    }
    // 删除历史记录
    const deleteHistory = (history: string) => {
        const newHistorys = searchHistory.filter((item)=>item !== history)
        localStorage.setItem(GEEK_SEARCH_KEY, JSON.stringify(newHistorys))
        setSearchHistory(newHistorys)
    }
    return (
        <div className={styles.root}>
            <NavBar
                className="navbar"
                onBack={() => navigate(-1)}
                right={<span className="search-text" onClick={() => onSearch(searchText)}>搜索</span>}
            >
                <SearchBar value={searchText} onChange={onSearchChange} placeholder="请输入关键字搜索"/>
            </NavBar>
            {
                searchHistory.length > 0 && <div
                    className="history"

                >
                    <div className="history-header">
                        <span>搜索历史</span>
                        <span>
              <Icon type="iconbtn_del" onClick={clearAllHistorys}/>
              清除全部
            </span>
                    </div>
                    {searchHistory.map((item, index) =>
                        <div key={index} className="history-list">
                                  <span className="history-item">
                                    <span className="text-overflow">{item}</span>
                                    <Icon type="iconbtn_essay_close" onClick={()=>deleteHistory(item)}/>
                                  </span>
                        </div>
                    )}
                </div>
            }


            <div
                className={classnames('search-result', (highLightSuggest.length > 0 && highLightSuggest[0]) ? 'show' : '')}>
                {
                    highLightSuggest.map((item, index) =>
                            item && <div key={index} className="result-item"
                                         onClick={() => onSearch(item.left + item.search + item.right)}>
                                <Icon className="icon-search" type="iconbtn_search"/>
                                <div className="result-value text-overflow">
                                    {item.left}
                                    <span>{item.search}</span>
                                    {item.right}
                                </div>
                            </div>
                    )
                }

            </div>
        </div>
    )
}

export default SearchPage
