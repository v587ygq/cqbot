---
title: '链接分享'
description: ''
position: 201
category: 'CQ 码'
menuTitle: 'share'
---

## 辅助函数

```js
const { share } = require('cqbot')
share(/*参数*/)
```

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `url` | string | | URL |
| `title` | string | | 标题 |
| `content` | string | | 内容描述（可选） |
| `image` | string | | 图片 URL（可选） |

## 示例

```js
share('https://baidu.com', '百度')
```
