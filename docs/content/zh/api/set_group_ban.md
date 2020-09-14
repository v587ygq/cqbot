---
title: '群组单人禁言'
description: ''
position: 301
category: 'API'
menuTitle: 'set_group_ban'
---

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 要踢的 QQ 号 |
| `duration` | number | `30 * 60` | 禁言时长，单位秒，0 表示取消禁言 |

## 响应数据

无
