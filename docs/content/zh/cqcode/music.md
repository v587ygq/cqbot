---
title: '音乐分享/自定义分享'
description: ''
position: 9
category: 'CQ 码'
menuTitle: 'music'
---

## 辅助函数

```js
const { music, musicCustom } = require('cqbot')
music(/*参数*/)
musicCustom(/*参数*/)
```

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `type` | string | | 可选值 `qq` `163` `xm` |
| `id` | string | | 歌曲 ID |

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `url` | string | | 点击后跳转目标 URL |
| `audio` | string | | 音乐 URL |
| `title` | string | | 标题 |
| `content` | string | | 内容描述（可选） |
| `image` | string | | 图片 URL（可选） |

## 示例

```js
music('163', '28949129')
musicCustom('https://baidu.com', 'https://baidu.com/1.mp3', '标题')
```
