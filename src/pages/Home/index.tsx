/*
 * @Author: chenjie
 * @Date: 2022-07-19 18:55:06
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-02 16:29:51
 * @FilePath: /src/pages/Home/index.tsx
 * @Description: Home
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */


import Icon from "@/components/Icon";
import {changeTab, getUserChannel, selectChannelActiveKey} from "@/store/festures/home-slice";
import {Popup, Tabs} from "antd-mobile";
import {selectChannels} from "@/store/festures/home-slice";
import {Channel} from "@/types/data";
import {useInitialState} from "@/utils/use-initial-state";
import styles from './index.module.scss'
import {useState} from "react";
import Channels from "./components/Channels";
import {useAppDispatch, useAppSelector} from "@/store/hooks";
import ArticleList from "./components/ArticleList";

export default function Home() {
    const dispatch = useAppDispatch()
    const [visible, setVisible] = useState(false)
    const channels: Channel[] = useInitialState(getUserChannel, selectChannels)
    const channelActiveKeu = useAppSelector(selectChannelActiveKey)
    return (
        <div className={styles.root}>
            {/* 延迟渲染 Tabs，解决 tab 高亮位置错误 */}
            {channels.length > 0 && (
                <Tabs className="tabs" activeLineMode="fixed" activeKey={channelActiveKeu} onChange={(id)=>dispatch(changeTab(id+''))}>
                    {channels.map((item) => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            <ArticleList channel_id={item.id}/>
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
            <div className="tabs-opration">
                <Icon type="iconbtn_search"/>
                <Icon type="iconbtn_channel" onClick={() => setVisible(true)}/>
            </div>
            <Popup visible={visible} onMaskClick={() => setVisible(false)} position="left" className="channel-popup">
                <Channels onClose={() => setVisible(false)}/>
            </Popup>
        </div>

    )
}
