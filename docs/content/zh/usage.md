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

## 调用 API

```js
cqbot.call()
  .then(() => {})
  .catch(() => {})
```

## 监听事件

```js
cqbot.on()
```
