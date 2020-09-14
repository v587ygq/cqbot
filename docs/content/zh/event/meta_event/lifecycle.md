---
title: '生命周期'
description: ''
position: 401
category: '事件'
menuTitle: 'meta_event.lifecycle'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `lifecycle` | 元事件类型 |
| `sub_type` | string | `connect` | 元事件子类型 |
