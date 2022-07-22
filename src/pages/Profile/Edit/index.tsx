/*
 * @Author: chenjie
 * @Date: 2022-07-22 14:05:14
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-22 17:05:24
 * @FilePath: /src/pages/Profile/Edit/index.tsx
 * @Description: Edit
 */
import styles from './index.module.scss'
import {useInitialState} from '@/utils/use-initial-state';
import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'
import { selectUserProfile, getuserProfile } from '@/store/festures/profile-slice';
const Item = List.Item

const ProfileEdit = () => {
    const state = useInitialState(getuserProfile,selectUserProfile)
    console.log('state',state)
  // const dispatch = useAppDispatch()
  // const { photo, name, gender, intro, birthday } = useAppSelector(selectUserProfile)
  // useEffect(() => {
  //   dispatch(getuserProfile())
  // }, [dispatch])
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
                    src={ 'https://pic3.zhimg.com/v2-86e7af1f4d8fe235ea886394838b59e3_is.jpg?source=32738c0c'}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={ '怎么吃不饱'}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  { '未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={'女'}>
              性别
            </Item>
            <Item arrow extra={1998}>
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
    </div>
  )
}

export default ProfileEdit
