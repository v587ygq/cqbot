const { nanoid } = require('nanoid')
const ws = require('ws')

const CQEvent = require('./CQEvent')

class CQBot {
  constructor ({
    token = null, // 用于 CQ 客户端验证
    timeout = 5000 // API 超时时间，单位毫秒
  } = {}) {
    this._token = token
    this._timeout = timeout

    this._apiServer = new ws.Server({ path: '/api', noServer: true }) // 创建 api socket 实例
    this._eventServer = new ws.Server({ path: '/event', noServer: true }) // 创建 event socket 实例

    this._emitter = new CQEvent(this)
    this._callbackMap = new Map() // 存储回调函数

    this._apiServer.on('connection', (ws) => {
      this._apiClient = ws
      ws.on('message', (msg) => {
        const context = JSON.parse(msg)
        this._callbackMap.get(context.echo.id)(context)
      })
    })

    this._eventServer.on('connection', (ws) => {
      ws.on('message', (msg) => { this._eventEmit(JSON.parse(msg)) })
    })
  }

  /**
   * 启动 api socket、event socket 服务器
   * @param {Server} server
   */
  start (server) {
    server.on('upgrade', (req, socket, head) => {
      if (!this._token || req.headers.authorization === `Token ${this._token}`) { // 鉴权
        if (this._apiServer.shouldHandle(req) && req.headers['x-client-role'] === 'API') {
          this._apiServer.handleUpgrade(req, socket, head, (ws) => {
            this._apiServer.emit('connection', ws)
          })
        } else if (this._eventServer.shouldHandle(req) && req.headers['x-client-role'] === 'Event') {
          this._eventServer.handleUpgrade(req, socket, head, (ws) => {
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

    const success = new Promise((resolve) => {
      this._callbackMap.set(id, (ctx) => {
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
   */
  on (type, cb) { this._emitter.on(type, cb) }

  /**
   * 监听 CQ 事件（一次性）
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   */
  once (type, cb) { this._emitter.once(type, cb) }

  /**
   * 取消监听 CQ 事件
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   */
  off (type, cb) { this._emitter.off(type, cb) }

  /**
   * CQ 事件上报
   * @param {Object} msg
   */
  _eventEmit (msg) {
    switch (msg.post_type) {
      case 'message':
        switch (msg.message_type) {
          case 'private':
            switch (msg.sub_type) {
              case 'friend':
                this._emitter.emit('message.private.friend', msg, { quick: true })
                break
              case 'group':
                this._emitter.emit('message.private.group', msg, { quick: true })
                break
              case 'other':
                this._emitter.emit('message.private.other', msg, { quick: true })
                break
              default:
                break
            }
            break
          case 'group':
            switch (msg.sub_type) {
              case 'normal':
                this._emitter.emit('message.group.normal', msg, { quick: true })
                break
              case 'anonymous':
                this._emitter.emit('message.group.anonymous', msg, { quick: true })
                break
              case 'notice':
                this._emitter.emit('message.group.notice', msg, { quick: true })
                break
              default:
                break
            }
            break
          default:
            break
        }
        break
      case 'notice':
        switch (msg.notice_type) {
          case 'group_upload':
            this._emitter.emit('notice.group_upload', msg)
            break
          case 'group_admin':
            switch (msg.sub_type) {
              case 'set':
                this._emitter.emit('notice.group_admin.set', msg)
                break
              case 'unset':
                this._emitter.emit('notice.group_admin.unset', msg)
                break
              default:
                break
            }
            break
          case 'group_decrease':
            switch (msg.sub_type) {
              case 'leave':
                this._emitter.emit('notice.group_decrease.leave', msg)
                break
              case 'kick':
                this._emitter.emit('notice.group_decrease.kick', msg)
                break
              case 'kick_me':
                this._emitter.emit('notice.group_decrease.kick_me', msg)
                break
              default:
                break
            }
            break
          case 'group_increase':
            switch (msg.sub_type) {
              case 'approve':
                this._emitter.emit('notice.group_increase.approve', msg)
                break
              case 'invite':
                this._emitter.emit('notice.group_increase.invite', msg)
                break
              default:
                break
            }
            break
          case 'group_ban':
            switch (msg.sub_type) {
              case 'ban':
                this._emitter.emit('notice.group_ban.ban', msg)
                break
              case 'lift_ban':
                this._emitter.emit('notice.group_ban.lift_ban', msg)
                break
              default:
                break
            }
            break
          case 'group_recall':
            this._emitter.emit('notice.group_recall', msg)
            break
          case 'friend_recall':
            this._emitter.emit('notice.friend_recall', msg)
            break
          default:
            break
        }
        break
      case 'request':
        switch (msg.request_type) {
          case 'friend':
            this._emitter.emit('request.friend', msg, { quick: true })
            break
          case 'group':
            switch (msg.sub_type) {
              case 'add':
                this._emitter.emit('request.group.add', msg, { quick: true })
                break
              case 'invite':
                this._emitter.emit('request.group.invite', msg, { quick: true })
                break
              default:
                break
            }
            break
          default:
            break
        }
        break
      case 'meta_event':
        switch (msg.meta_event_type) {
          case 'lifecycle':
            this._emitter.emit('meta_event.lifecycle', msg)
            break
          case 'heartbeat':
            this._emitter.emit('meta_event.heartbeat', msg)
            break
          default:
            break
        }
        break
      default:
        break
    }
  }
}

module.exports = {
  CQBot,
  ...require('./message')
}
