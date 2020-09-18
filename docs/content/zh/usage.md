---
title: '用法'
description: ''
position: 3
category: '基本'
menuTitle: '用法'
---

## 运行

```js
const server = require('http').createServer()

const { CQBot } = require('cqbot')
const cqbot = new CQBot()
cqbot.start(server)

server.listen(3000)
```

<alert>

修改 CQ 客户端部分配置：

</alert>

```json
"ws_reverse_servers": [
	{
		"enabled": true,
		"reverse_url": "",
		"reverse_api_url": "ws://localhost:3000/api",
		"reverse_event_url": "ws://localhost:3000/event",
		"reverse_reconnect_interval": 3000
	}
]
```

## 调用 API

```js
cqbot.call(action, params)
  .then((msg) => {})
  .catch((e) => {})
```

需要传入的参数：

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `action` | string | API 操作，请参考[API 总览](/api) |
| `params` | object | API 操作需要传入的参数 |

## 监听事件

```js
cqbot.on(type, cb)
```

需要传入的参数：

| 字段名 | 数据类型 | 说明 |
| :---: | :---: | :---: |
| `type` | string | 需要监听的事件类型，请参考[事件总览](/event) |
| `cb` | function | 回调函数 |

## 快速操作

```js
cqbot.on('type', msg => msg.$send(data))
```

<alert>

`data` 你想要快速返回的数据对象

</alert>
