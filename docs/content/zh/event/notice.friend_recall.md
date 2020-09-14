---
title: '好友消息撤回'
description: ''
position: 53
category: '事件'
menuTitle: 'notice.friend_recall'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `friend_recall` | 通知类型 |
| `user_id` | number (int64) | | 好友 QQ 号 |
| `message_id` | number (int64) | | 被撤回的消息 ID |
