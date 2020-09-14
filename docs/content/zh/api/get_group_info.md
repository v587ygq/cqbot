---
title: '获取群信息'
description: ''
position: 301
category: 'API'
menuTitle: 'get_group_info'
---

## 参数

| 字段名 | 数据类型 | 默认值 | 说明 |
| :---: | :---: | :---: | :---: |
| `group_id` | number (int64) | | 群号 |
| `no_cache` | boolean | `false` | 是否不使用缓存 |

## 响应数据

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `group_id` | number (int64) | 群号 |
| `group_name` | string | 群名称 |
| `member_count` | number (int32) | 成员数 |
| `max_member_count` | number (int32) | 最大成员数 |
