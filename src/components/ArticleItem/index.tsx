/*
 * @Author: chenjie
 * @Date: 2022-08-02 19:56:03
 * @LastEditors: chenjie
 * @LastEditTime: 2022-08-13 12:59:54
 * @FilePath: \react-geekh5-ts\src\components\ArticleItem\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import classnames from 'classnames'

import { Image } from 'antd-mobile';
import styles from './index.module.scss'
import dayjs from 'dayjs'
// 相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime';
// 国际化 - 中文
import 'dayjs/locale/zh-cn';
// 启用相对时间
dayjs.extend(relativeTime);
// 启用中文
dayjs.locale('zh-cn');
type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  title: string;
  pubdate: string;
  aut_name: string;
  type: number;
  images: string[];
  comm_count: number;
}

const ArticleItem = ({ title, pubdate, aut_name, type, images, comm_count }: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>{title}</h3>
        {type !== 0 && (
          <div className="article-imgs">
            {
              images.map((item, index) =>
                <div key={index} className="article-img-wrapper">
                  <Image
                    lazy
                    src={item}
                    alt=""
                  />
                </div>
              )
            }
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>{aut_name}</span>
        <span>{comm_count}</span>
        <span>{dayjs().from(dayjs(pubdate))}</span>
        {/* <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span> */}
      </div>
    </div>
  )
}

export default ArticleItem
