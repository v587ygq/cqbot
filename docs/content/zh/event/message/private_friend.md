---
title: '好友私聊'
description: ''
position: 401
category: '事件'
menuTitle: 'message.private.friend'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `private` | 消息类型 |
| `sub_type` | string | `friend` | 消息子类型 |
| `message_id` | string | | 消息 ID |
| `user_id` | number (int64) | | 发送者 QQ 号 |
| `message` | string | | 消息内容 |
| `raw_message` | string | | 原始消息内容 |
| `font` | number (int32) | | 字体 |
| `sender` | object | | 发送人信息 |

<alert>

`sender` 字段的内容如下：

</alert>

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `user_id` | number (int64) | | 发送者 QQ 号 |
| `nickname` | string | | 昵称 |
| `sex` | string | `male` `female` `unknown` | 性别 |
| `age` | number (int32) | | 年龄 |

## 快速操作

| 字段名 | 数据类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---: |
| `reply` | message | | 要回复的内容 |
| `auto_escape` | boolean | `false` | 消息内容是否作为纯文本发送 |
