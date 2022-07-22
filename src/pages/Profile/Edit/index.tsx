import { Button, List, DatePicker, NavBar } from 'antd-mobile'
import classNames from 'classnames'

import styles from './index.module.scss'

const Item = List.Item

const ProfileEdit = () => {
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
                    src={'http://toutiao.itheima.net/images/user_head.jpg'}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item arrow extra={'黑马先锋'}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {'未填写'}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={'男'}>
              性别
            </Item>
            <Item arrow extra={'1999-9-9'}>
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
