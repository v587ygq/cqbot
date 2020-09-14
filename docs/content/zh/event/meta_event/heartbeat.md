---
title: '心跳'
description: ''
position: 58
category: '事件'
menuTitle: 'meta_event.heartbeat'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `meta_event` | 上报类型 |
| `meta_event_type` | string | `heartbeat` | 元事件类型 |
| `status` | object | | 状态信息 |
| `interval` | number (int64) | | 到下次心跳的间隔，单位毫秒 |
