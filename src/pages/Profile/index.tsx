/*
 * @Author: chenjie
 * @Date: 2022-07-19 18:55:40
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-20 19:26:33
 * @FilePath: \react-geekh5-ts\src\pages\Profile\index.tsx
 * @Description: Profile
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import Icon from '@/components/Icon'
import { useEffect } from 'react'
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser, selectUser } from '@/store/festures/profile-slice';
import {Link, useNavigate} from "react-router-dom";
export default function Profile ()  {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { photo, name, like_count, follow_count, fans_count, art_count } = useAppSelector(selectUser)
    // 页面一进入，就需要发送请求，获取用户信息
    useEffect(() => {
        dispatch(getUser())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <div className="profile">
                {/* 顶部个人信息区域 */}
                <div className="user-info">
                    <div className="avatar">
                        <img src={photo} alt="" />
                    </div>
                    <div className="user-name">{name}</div>
                    <Link to="/profile/edit">
                        个人信息 <Icon type="iconbtn_right" />
                    </Link>
                </div>

                {/* 今日阅读区域 */}
                <div className="read-info">
                    <Icon type="iconbtn_readingtime" />
                    今日阅读 <span>10</span> 分钟
                </div>

                {/* 统计信息区域 */}
                <div className="count-list">
                    <div className="count-item">
                        <p>{art_count}</p>
                        <p>动态</p>
                    </div>
                    <div className="count-item">
                        <p>{follow_count}</p>
                        <p>关注</p>
                    </div>
                    <div className="count-item">
                        <p>{fans_count}</p>
                        <p>粉丝</p>
                    </div>
                    <div className="count-item">
                        <p>{like_count}</p>
                        <p>被赞</p>
                    </div>
                </div>

                {/* 主功能菜单区域 */}
                <div className="user-links">
                    <div className="link-item">
                        <Icon type="iconbtn_mymessages" />
                        <div>消息通知</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_mycollect" />
                        <div>收藏</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_history1" />
                        <div>浏览历史</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_myworks" />
                        <div>我的作品</div>
                    </div>
                </div>
            </div>

            {/* 更多服务菜单区域 */}
            <div className="more-service">
                <h3>更多服务</h3>
                <div className="service-list">
                    <div
                        className="service-item"
                        onClick={() =>navigate('/profile/feedback')}
                    >
                        <Icon type="iconbtn_feedback" />
                        <div>用户反馈</div>
                    </div>
                    <div
                        className="service-item"
                        onClick={() => navigate('/profile/chat')}
                    >
                        <Icon type="iconbtn_xiaozhitongxue" />
                        <div>小智同学</div>
                    </div>
                </div>
            </div>
        </div>
    )
}


