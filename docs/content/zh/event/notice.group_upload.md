---
title: '群文件上传'
description: ''
position: 42
category: '事件'
menuTitle: 'notice.group_upload'
---

## 事件数据

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `time` | number (int64) | | 时间戳 |
| `self_id` | number (int64) | | 收到事件的机器人 QQ 号 |
| `post_type` | string | `notice` | 上报类型 |
| `notice_type` | string | `group_upload` | 通知类型 |
| `group_id` | number (int64) | | 群号 |
| `user_id` | number (int64) | | 发送者 QQ 号 |
| `file` | object | | 文件信息 |

<alert>

`file` 字段的内容如下：

</alert>

| 字段名 | 数据类型 | 可能的值 | 说明 |
| :---: | :---: | :---: | :---: |
| `id` | string | | 文件 ID |
| `name` | string | | 文件名 |
| `size` | number (int64) | | 文件大小（字节数） |
| `busid` | number (int64)	 | | |
| `url` | string | | 文件网络地址 |
