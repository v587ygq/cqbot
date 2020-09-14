---
title: '群内匿名聊天'
description: ''
position: 40
category: '事件'
menuTitle: 'message.group.anonymous'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `message` | 上报类型 |
| `message_type` | string | `group` | 消息类型 |
| `sub_type` | string | `anonymous` | 消息子类型 |
| `message_id` | string | | 消息 ID |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 发送者 QQ 号 |
| `anonymous` | object | | 匿名信息 |
| `message` | string | | 消息内容 |
| `raw_message` | string | | 原始消息内容 |
| `font` | number (int32) | | 字体 |
| `sender` | object | | 发送人信息 |

<alert>

`anonymous` 字段的内容如下：

</alert>

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `id` | number (int64) | | 匿名用户 ID |
| `name` | string | | 匿名用户名称 |
| `flag` | string | | 匿名用户 flag，在调用禁言 API 时需要传入 |

<alert>

`sender` 字段的内容如下：

</alert>

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `user_id` | number (int64) | | 发送者 QQ 号 |
| `nickname` | string | | 昵称 |
| `card` | string | | 群名片／备注 |
| `sex` | string | `male` `female` `unknown` | 性别 |
| `age` | number (int32) | | 年龄 |
| `area` | string | | 地区 |
| `level` | string | | 成员等级 |
| `role` | string | `owner` `admin` `member` | 角色 |
| `title` | string | | 专属头衔 |
