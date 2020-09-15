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

具体请参考[文档](https://cqbot.info)

## 参考

* [onebot](https://github.com/howmanybots/onebot)
* [go-cqhttp](https://github.com/Mrs4s/go-cqhttp)
* [node-cq-websocket](https://github.com/momocow/node-cq-websocket)
