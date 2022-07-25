/*
 * @Author: chenjie
 * @Date: 2022-07-22 14:05:14
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-25 11:51:22
 * @FilePath: /src/pages/Profile/Edit/index.tsx
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
type inputPopup = {
  type: 'name' | 'intro'
  visible: boolean
  value: string
}
const ProfileEdit = () => {
  const dispatch = useAppDispatch()
  const [inputPopup, setinputPopup] = useState<inputPopup>({ type: 'name', visible: false, value: '' })
  // 展示
  // inputPopup['type'] ts 中的索引查询类型
  const showInput = (type: inputPopup['type'], value: inputPopup['value']) => {
    setinputPopup({ type: type, visible: true, value: value ?? '' })
  }

  // 隐藏
  const hideInput = () => {
    setinputPopup({ type: 'name', visible: false, value: '' })
  }

  // 修改
  const updateProfile = async (key: inputPopup['type'],value : string) => {
    // { [type]:name } 属性名表达式
    // 表示：可以通过一个 js 表达式 来作为对象的键
    // 如果 type 为 name 那么值为：{name: ''}
    // 如果 type 为 intro 那么值为：{intro: ''}
    await dispatch(updateUserProfile({ [key]:value }))
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
            <Item arrow extra={state.name || '怎么吃不饱'} onClick={() => showInput('name', state.name)}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {state.intro || '未填写'}
                </span>
              }
              onClick={() => showInput('intro', state.intro)}
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
      <Popup destroyOnClose visible={inputPopup.visible} >
        <EditInput type={inputPopup.type} value={inputPopup.value} onClose={hideInput} updateProfile={updateProfile} />
      </Popup>

    </div>
  )
}

export default ProfileEdit
