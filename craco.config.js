/*
 * @Author: chenjie
 * @Date: 2022-07-10 08:54:47
 * @LastEditors: chenjie
 * @LastEditTime: 2022-07-10 10:04:04
 * @FilePath: \react-geekh5-ts\craco.config.js
 * @Description: 配置文件中配置路径别名
 * Copyright (c) 2022 by chenjie, All Rights Reserved.
 */
const path = require('path')
const pxToViewport = require('postcss-px-to-viewport');
const vw = pxToViewport({
    // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
    viewportWidth: 375,
  });
module.exports = {
    webpack:{
        alias:{
            // 使用 @ 表示 src 文件所在路径
            '@':path.resolve(__dirname,'src'),
            // 使用 @scss 表示全局 SASS 样式所在路径
            '@scss':path.resolve(__dirname,'src/assets/styles')
        }
    },
    style:{
        postcss:{
            plugins:[vw]
        }
    }
}