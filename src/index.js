const { nanoid } = require('nanoid')
const ws = require('ws')

const CQEvent = require('./CQEvent')
const builtInMiddleware = require('./middleware')

module.exports = class CQBot {
  constructor ({
    token = null, // 用于 CQ 客户端验证
    timeout = 5000 // API 超时时间，单位毫秒
  } = {}) {
    this._token = token
    this._timeout = timeout

    this._apiServer = new ws.Server({ path: '/api', noServer: true }) // 创建 api socket 实例
    this._eventServer = new ws.Server({ path: '/event', noServer: true }) // 创建 event socket 实例

    this._emitter = new CQEvent(this) // CQ 事件类
    this._callbackMap = new Map() // 存储回调函数

    this._apiServer.on('connection', ws => {
      this._apiClient = ws
      ws.on('message', msg => {
        const context = JSON.parse(msg)
        const onSuccess = this._callbackMap.get(context.echo.id)
        if (typeof onSuccess === 'function') { onSuccess(context) }
      })
    })

    this._eventServer.on('connection', ws => {
      ws.on('message', msg => { this._emitter.emit(JSON.parse(msg)) })
    })
  }

  /**
   * 启动 api socket、event socket 服务器
   * @param {Server} server
   */
  start (server) {
    Object.keys(builtInMiddleware).forEach(key => this.middleware(key, builtInMiddleware[key])) // 注册内置中间件

    server.on('upgrade', (req, socket, head) => {
      if (!this._token || req.headers.authorization === `Token ${this._token}`) { // 鉴权
        if (this._apiServer.shouldHandle(req) && req.headers['x-client-role'] === 'API') {
          this._apiServer.handleUpgrade(req, socket, head, ws => {
            this._apiServer.emit('connection', ws)
          })
        } else if (this._eventServer.shouldHandle(req) && req.headers['x-client-role'] === 'Event') {
          this._eventServer.handleUpgrade(req, socket, head, ws => {
            this._eventServer.emit('connection', ws)
          })
        }
      }
    })
  }

  /**
   * 调用 CQ API
   * @see {@link https://cqbot.info/api/}
   * @param {string} action 动作
   * @param {Object|undefined} [params=undefined] 动作所需的参数
   * @returns {Promise}
   */
  call (action, params) {
    if (!this._apiClient) { return Promise.reject(new Error('未连接 CQ 客户端')) }

    const id = nanoid(7) // 新建请求 ID
    this._apiClient.send(JSON.stringify({ action, params, echo: { id } })) // 发送 API 指令

    const success = new Promise(resolve => {
      this._callbackMap.set(id, ctx => {
        this._callbackMap.delete(id)
        delete ctx.echo
        resolve(ctx)
      })
    })

    const failure = new Promise((resolve, reject) => {
      setTimeout(() => {
        this._callbackMap.delete(id)
        reject(new Error('time out!'))
      }, this._timeout)
    })

    return Promise.race([success, failure])
  }

  /**
   * 监听 CQ 事件
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   * @param {string|Array|null} middleware 中间件
   */
  on (type, cb, middleware) { this._emitter.on(type, cb, middleware) }

  /**
   * 监听 CQ 事件（一次性）
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   * @param {string|Array|null} middleware 中间件
   */
  once (type, cb, middleware) { this._emitter.once(type, cb, middleware) }

  /**
   * 取消监听 CQ 事件
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   */
  off (type, cb) { this._emitter.off(type, cb) }

  /**
   * 注册中间件
   * @param {string} name 中间件名称
   * @param {function} func 中间件函数
   */
  middleware (name, func) { this._emitter.middleware(name, func) }
}
