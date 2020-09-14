---
title: '@某人'
description: ''
position: 5
category: 'CQ 码'
menuTitle: 'at'
---

## 辅助函数

```js
const { at } = require('cqbot')
at(/*参数*/)
```

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `qq` | string | | @的 QQ 号，all 表示全体成员 |

## 示例

```js
at('00000000')
at('all')
```
