---
title: '发送群消息'
description: ''
position: 24
category: 'API'
menuTitle: 'send_group_msg'
---

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `group_id` | number (int64) | | 群号 |
| `message` | message | | 要发送的内容 |
| `auto_escape` | boolean | `false` | 消息内容是否作为纯文本发送（即不解析 CQ 码），只在 `message` 字段是字符串时有效 |

## 响应数据

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `message_id` | number (int32) | 消息 ID |
