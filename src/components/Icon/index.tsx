/*
 * @Author: chenjie
 * @Date: 2022-07-10 13:41:25
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 14:16:59
 * @FilePath: \react-geekh5-ts\src\components\Icon\index.tsx
 * @Description: 
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
import classname from 'classnames'
type Props = {
    type: string;
    className?: string;
    onClick?: () => void
}
export default function Icon({type,className,onClick}:Props) {
    return (
        <svg className={classname('icon', className)} aria-hidden="true">
        {/* 使用时，只需要将此处的 iconbtn_like_sel 替换为 icon 的名称即可*/}
        <use xlinkHref={`#${type}`} onClick={onClick}></use>
      </svg>
    )
}
