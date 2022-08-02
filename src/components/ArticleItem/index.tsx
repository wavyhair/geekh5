import classnames from 'classnames'

import Icon from '@/components/Icon'

import styles from './index.module.scss'

type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  type: 0 | 1 | 3
}

const ArticleItem = ({ type }: Props) => {
  return (
    <div className={styles.root}>
      <div
        className={classnames(
          'article-content',
          type === 3 && 't3',
          type === 0 && 'none-mt'
        )}
      >
        <h3>Vue响应式----数据响应式原理</h3>
        {type !== 0 && (
          <div className="article-imgs">
            <div className="article-img-wrapper">
              <img
                src="http://geek.itheima.net/resources/images/63.jpg"
                alt=""
              />
            </div>
          </div>
        )}
      </div>
      <div className={classnames('article-info', type === 0 && 'none-mt')}>
        <span>黑马先锋</span>
        <span>99 评论</span>
        <span>2 天前</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
