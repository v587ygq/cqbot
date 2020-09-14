---
title: '群成员退出群组'
description: ''
position: 401
category: '事件'
menuTitle: 'notice.group_decrease.leave'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_decrease` | 通知类型 |
| `sub_type` | string | `leave` | 通知子类型 |
| `group_id` | number (int64) | | 群号 |
| `operator_id` | number (int64) | | 操作者 QQ 号 |
| `user_id` | number (int64) | | 离开者 QQ 号 |
