# CQBot

![GitHub All Releases](https://cqbot.info/logo.png)

## 介绍

基于 cqhttp 客户端的 nodejs 开发框架。

## 安装

```
npm install cqbot
```

## 使用

```js
const server = require('http').createServer()

const { CQBot } = require('cqbot')
const cqbot = new CQBot()
cqbot.start(server)

server.listen(3000)
```

修改 CQ 客户端部分配置：

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

具体请阅读[文档](https://cqbot.info)

## 参考

* [onebot](https://github.com/howmanybots/onebot)
* [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
* [node-cq-websocket](https://github.com/momocow/node-cq-websocket)
