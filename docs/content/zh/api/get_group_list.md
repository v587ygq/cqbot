---
title: '获取群列表'
description: ''
position: 301
category: 'API'
menuTitle: 'get_group_list'
---

## 参数
无

## 响应数据

<alert>
响应内容为数组，每个元素属性如下：
</alert>

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `group_id` | number (int64) | 群号 |
| `group_name` | string | 群名称 |
| `member_count` | number (int32) | 成员数 |
| `max_member_count` | number (int32) | 最大成员数 |
