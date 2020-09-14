---
title: '取消管理员'
description: ''
position: 44
category: '事件'
menuTitle: 'notice.group_admin.unset'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_admin` | 通知类型 |
| `sub_type` | string | `unset` | 通知子类型 |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 管理员 QQ 号 |
