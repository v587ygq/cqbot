---
title: '群消息撤回'
description: ''
position: 401
category: '事件'
menuTitle: 'notice.group_recall'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_recall` | 通知类型 |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 消息发送者 QQ 号 |
| `operator_id` | number (int64) | | 操作者 QQ 号 |
| `message_id` | number (int64) | | 被撤回的消息 ID |
