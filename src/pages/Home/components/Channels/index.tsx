/*
 * @Author: chenjie
 * @Date: 2022-08-01 14:51:11
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-01 20:13:44
 * @Description: Channels
 */
import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
    getAllChannel,
    selectChannelActiveKey,
    selectChannels,
    selectRestChannels,
    changeTab,
    delChannel
} from "@/store/festures/home-slice";
import { useInitialState } from "@/utils/use-initial-state";
import { Channel } from "@/types/data";
import { useState } from "react";


type Props = {
    onClose: () => void
}
const Channels = ({ onClose }: Props) => {
    const dispatch = useAppDispatch()
    const channels = useAppSelector(selectChannels)
    const [isEdit, setIsEdit] = useState(false)
    const restChannels = useInitialState(getAllChannel, selectRestChannels) as Channel[]
    const channelActiveKey = useAppSelector(selectChannelActiveKey)
    const handleChangeTab = (channel: Channel) => {
        // 非编辑
        if (!isEdit) {
            onClose()
            dispatch(changeTab(channel.id + ''))
        } else {
            dispatch(delChannel(channel))
        }

    }
    return (
        <div className={styles.root}>
            <div className="channel-header">
                <Icon type="iconbtn_channel_close" onClick={onClose} />
            </div>
            <div className="channel-content">
                {/* 编辑时，添加类名 edit */}
                <div className={classnames('channel-item', isEdit && 'edit')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">点击进入频道</span>
                        <span className="channel-item-edit"
                            onClick={() => setIsEdit(!isEdit)}>{isEdit ? '保存' : '编辑'}</span>
                    </div>
                    <div className="channel-list">
                        {/* 选中时，添加类名 selected */}
                        {channels.map(channle =>
                            <span
                                className={classnames('channel-list-item', (channelActiveKey === channle.id + '') && 'selected')}
                                onClick={() => handleChangeTab(channle)} key={channle.id}>
                                {channle.name}
                                {channle.id !== 0 && channels.length > 4 && <Icon type="iconbtn_tag_close" />}

                            </span>
                        )}

                    </div>
                </div>

                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">频道推荐</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    <div className="channel-list">
                        {restChannels.map((item) => <span className="channel-list-item"
                            key={item.id}>+ {item.name}</span>)
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Channels
