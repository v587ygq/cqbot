---
title: '邀请机器人进群'
description: ''
position: 401
category: '事件'
menuTitle: 'request.group.invite'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `request` | 上报类型 |
| `request_type` | string | `group` | 请求类型 |
| `sub_type` | string | `invite` | 请求子类型 |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 发送请求的 QQ 号 |
| `comment` | string | | 验证信息 |
| `flag` | string | | 请求 flag，在调用处理请求的 API 时需要传入 |

## 快速操作

| 字段名 | 数据类型 | 默认 | 说明 |
| :---: | :---: | :---: | :---: |
| `approve` | boolean | | 是否同意邀请 |
| `reason` | string | | 拒绝理由（仅在拒绝时有效） |
