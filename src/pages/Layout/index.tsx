/*
 * @Author: chenjie
 * @Date: 2022-07-05 21:00:44
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-19 20:38:46
 * @FilePath: \react-geekh5-ts\src\pages\Layout\index.tsx
 * @Description: Layout
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import styles from './index.module.scss'
import { TabBar } from 'antd-mobile'
import Icon from '@/components/Icon';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import classNames from 'classnames';

export default function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const tabs = [
    { path: '/home/index', icon: 'iconbtn_home', text: '首页' },
    { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
    { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
    { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
  ];
  const handleChange = (path: string) => {
    navigate(path)
  }
  return (
    <div className={styles.root}>
      <Outlet />
      <TabBar className="tabbar" activeKey={location.pathname} onChange={(path) => handleChange(path)}>
        {tabs.map(item => (
          <TabBar.Item
            className={classNames('tabbar-item', location.pathname === item.path ? 'tabbar-item-active' : '')}
            key={item.path}
            // 注意：该形式只能使用一个图标，在是否高亮时，具有不同的颜色
            // icon={<UserOutline />}
            // icon 的值可以是一个函数，通过这种方式，就可以觉得渲染不同的图标
            icon={(active: boolean) => {
              // 此处的参数 active 表示：当前项是否高亮
              return <Icon className="tabbar-item-icon" type={active ? `${item.icon}_sel` : item.icon} />
            }}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}
