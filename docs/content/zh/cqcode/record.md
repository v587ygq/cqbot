---
title: '语音'
description: ''
position: 201
category: 'CQ 码'
menuTitle: 'record'
---

## 辅助函数

```js
const { record } = require('cqbot')
record(/*参数*/)
```

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `file` | string | | 语音文件路径 |

## 示例

```js
record('https://baidu.com/1.mp3')
```
