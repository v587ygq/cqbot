---
title: '群内匿名聊天'
description: ''
position: 401
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

## 快速操作

| 字段名 | 数据类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---: |
| `reply` | message | | 要回复的内容 |
| `auto_escape` | boolean | `false` | 消息内容是否作为纯文本发送 |
| `at_sender` | boolean | `true` | 是否要在回复开头 at 发送者 |
| `delete` | boolean | `false` | 撤回该条消息 |
| `kick` | boolean | `false` | 把发送者踢出群组（需要登录号权限足够），**不拒绝**此人后续加群请求，发送者是匿名用户时无效 |
| `ban` | boolean | `false` | 把发送者禁言，对匿名用户也有效 |
| `ban_duration` | number | `30` | 禁言时长 |
