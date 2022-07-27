/*
 * @Author: chenjie
 * @Date: 2022-07-22 14:05:14
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-27 23:19:08
 * @FilePath: \react-geekh5-ts\src\pages\Profile\Edit\index.tsx
 * @Description: Edit
 */
import styles from './index.module.scss'
import type { UserProfile } from '@/types/data';
import EditInput from './components/EditInput';
import { useInitialState } from '@/utils/use-initial-state';
import { Button, List, DatePicker, NavBar, Popup, Toast, Dialog } from 'antd-mobile'
import classNames from 'classnames'
import { selectUserProfile, getuserProfile, updateUserProfile, updateUserPhoto } from '@/store/festures/profile-slice';
import { useRef, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import EditList from './components/EditList';
import dayjs from 'dayjs';
import { logout } from '@/store/festures/login-slice';
import { useNavigate } from 'react-router-dom';
const Item = List.Item
type InputPopup = {
  type: 'birthday' | 'name' | 'intro' | 'gender' | 'photo' | ""
  visible: boolean
  value: string
}
type ListPopup = {
  type: 'gender' | 'photo' | '',
  visible: boolean
}
export default function ProfileEdit() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [inputPopup, setinputPopup] = useState<InputPopup>({ type: 'name', visible: false, value: '' })
  const [listPopup, setListPopup] = useState<ListPopup>({ type: '', visible: false })
  const [birthdayPopup, setBirthdayPopup] = useState(false)
  // 展示昵称和简介 popup
  // inputPopup['type'] ts 中的索引查询类型
  const showInput = (type: InputPopup['type'], value: InputPopup['value']) => {
    setinputPopup({ type: type, visible: true, value: value ?? '' })
  }

  // 展示头像和性别 popup
  const handleShow = (type: ListPopup['type']) => {
    setListPopup({ type: type, visible: true })
  }

  // 切换生日 popup
  const toggleBirthdayPopup = (flag: boolean) => {
    setBirthdayPopup(flag)
  }

  // 隐藏昵称和简介 popup
  const hideInput = () => {
    setinputPopup({ type: '', visible: false, value: '' })
  }

  // 隐藏头像和性别 popup
  const handleClose = () => {
    setListPopup({ type: '', visible: false })
  }

  const fileRef = useRef<HTMLInputElement>(null)

  // 头像上传
  const fileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('photo', file)
    await dispatch(updateUserPhoto(formData))
    Toast.show({ content: '更新成功', duration: 1000 })
    handleClose()
  }

  // 修改时间
  const updateBirthday = (value: Date) => {
    const birthday = dayjs(value).format('YYYY-MM-DD')
    updateProfile('birthday', birthday)
  }

  // 修改
  const updateProfile = async (key: InputPopup['type'], value: string) => {
    // { [type]:name } 属性名表达式
    // 表示：可以通过一个 js 表达式 来作为对象的键
    // 如果 type 为 name 那么值为：{name: ''}
    // 如果 type 为 intro 那么值为：{intro: ''}
    if (key === 'photo') {
      fileRef.current?.click()
    } else {
      await dispatch(updateUserProfile({ [key]: value }))
      await dispatch(getuserProfile())
      Toast.show({ content: '更新成功', duration: 1000 })
    }

    hideInput()
    handleClose()
    toggleBirthdayPopup(false)
  }

  // 退出
  /**
   *  不需要自定义样式的情况下，使用 Dialog.confirm 来弹窗确认即可
   *  如果需要自定义弹窗按钮的样式，需要使用 Dialog.show 基础方法来实现
   */
  const onLogout = () => {
    const handler = Dialog.show({
      title: '温馨提示',
      content: '亲，你确定退出吗？',
      actions: [
        [
          {
            key: 'cancel',
            text: '取消',
            onClick: () => {
              handler.close();
            },
          },
          {
            key: 'confirm',
            text: '退出',
            onClick: () => {
              dispatch(logout())
              handler.close();
              navigate('/login')
            },
            style: {
              color: 'var(--adm-color-weak)',
            },
          },
        ],
      ],
    });
  }

  const state: UserProfile = useInitialState(getuserProfile, selectUserProfile)
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={() => navigate('/home/profile')}
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
              onClick={() => handleShow('photo')}
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
            <Item arrow extra={state.gender === 0 ? '男' : '女'} onClick={() => handleShow('gender')}  >
              性别
            </Item>
            <Item arrow extra={state.birthday} onClick={() => toggleBirthdayPopup(true)}>
              生日
            </Item>
          </List>
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>退出登录</Button>
        </div>
      </div>
      {/* 修改昵称和简介 */}
      <Popup destroyOnClose onMaskClick={hideInput} visible={inputPopup.visible} >
        <EditInput type={inputPopup.type} value={inputPopup.value} onClose={hideInput} updateProfile={updateProfile} />
      </Popup>
      {/*  修改照片和性别 */}
      <Popup className='listPopup' onMaskClick={handleClose} destroyOnClose visible={listPopup.visible}>
        <EditList type={listPopup.type} onClose={handleClose} updateProfile={updateProfile} />
      </Popup>
      {/* 创建 input[type=file] 标签*/}
      <input type="file" ref={fileRef} hidden accept='image/*' onChange={fileChange} />
      <DatePicker
        visible={birthdayPopup}
        value={new Date(state.birthday)}
        title="选择年月日"
        onCancel={() => toggleBirthdayPopup(false)}
        onConfirm={updateBirthday}
        min={new Date(1900, 0, 1, 0, 0, 0)}
        max={new Date()}
      />

    </div>
  )
}


