---
title: '获取群消息'
description: ''
position: 21
category: 'API'
menuTitle: 'get_group_msg'
---

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `message_id` | number (int32) | | 消息 ID |

## 响应数据

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `message_id` | int32 | 消息 ID |
| `real_id` | int32 | 消息真实 ID |
| `sender` | object | 发送者 |
| `time` | number (int32) | 发送时间 |
| `content` | message | 消息内容 |
