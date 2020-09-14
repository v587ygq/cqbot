---
title: 'JSON'
description: ''
position: 8
category: 'CQ 码'
menuTitle: 'json'
---

## 辅助函数

```js
const { json } = require('cqbot')
json(/*参数*/)
```

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `data` | string | | JSON 序列化后的字符串 |

## 示例

```js
json(JSON.stringify({a:1}))
```
