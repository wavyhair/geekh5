/*
 * @Author: chenjie
 * @Date: 2022-07-22 14:05:14
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-24 22:03:21
 * @FilePath: \react-geekh5-ts\src\pages\Profile\Edit\index.tsx
 * @Description: Edit
 */
import styles from './index.module.scss'
import type { UserProfile } from '@/types/data';
import EditInput from './components/EditInput';
import { useInitialState } from '@/utils/use-initial-state';
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { selectUserProfile, getuserProfile, updateUserProfile } from '@/store/festures/profile-slice';
import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
const Item = List.Item

const ProfileEdit = () => {
  const dispatch = useAppDispatch()
  const [inputVisible, setInputVisible] = useState(false)
  // 展示
  const showInput = () => {
    setInputVisible(true)
  }

  // 隐藏
  const hideInput = () => {
    setInputVisible(false)
  }

  // 修改
  const updateName = async (name: string) => {
    await dispatch(updateUserProfile({ name }))
    Toast.show({ content: '更新成功', duration: 100 })
    dispatch(getuserProfile())
    hideInput()
  }
  const state: UserProfile = useInitialState(getuserProfile, selectUserProfile)
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={state.photo || 'https://pic3.zhimg.com/v2-86e7af1f4d8fe235ea886394838b59e3_is.jpg?source=32738c0c'}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={state.name || '怎么吃不饱'} onClick={showInput}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {state.intro || '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={state.gender === 1 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={state.birthday}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup visible={inputVisible} >
        <EditInput value={state.name} onClose={hideInput} updateName={updateName} />
      </Popup>

    </div>
  )
}

export default ProfileEdit
