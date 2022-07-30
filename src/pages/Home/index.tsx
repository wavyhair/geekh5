/*
 * @Author: chenjie
 * @Date: 2022-07-19 18:55:06
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-30 20:15:42
 * @FilePath: \react-geekh5-ts\src\pages\Home\index.tsx
 * @Description: Home
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */

import { getUserChannel } from "@/store/festures/home-slice";
import { Tabs } from "antd-mobile";
import { selectChannels } from "@/store/festures/home-slice";
import { Channel } from "@/types/data";
import { useInitialState } from "@/utils/use-initial-state";

export default function Home() {
    const channels: Channel[] = useInitialState(getUserChannel, selectChannels)
    return (
        <div >
            {/* 延迟渲染 Tabs，解决 tab 高亮位置错误 */}
            {channels.length > 0 && (
                <Tabs className="tabs" activeLineMode="fixed">
                    {channels.map((item) => (
                        <Tabs.Tab title={item.name} key={item.id}>
                            推荐频道的内容
                        </Tabs.Tab>
                    ))}
                </Tabs>
            )}
        </div>

    )
}
