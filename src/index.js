const { nanoid } = require('nanoid')
const ws = require('ws')

const $eventbus = require('./eventbus')

module.exports = class CQWebSocket {
  constructor () {
    this._api_sock = new ws.Server({ path: '/api', noServer: true }) // 创建 api socket 实例
    this._event_sock = new ws.Server({ path: '/event', noServer: true }) // 创建 event socket 实例

    this._event_bus = new $eventbus(this)
    this._responseHandlers = new Map()

    this._api_sock.on('connection', (ws, req) => {
      if (req.headers['x-client-role'] === 'API') { this._api_client = ws }
      ws.on('message', (msg) => {
        const context = JSON.parse(msg)
        const onSuccess = this._responseHandlers.get(context.echo.id)
        if (typeof onSuccess === 'function') {
          onSuccess(context)
        }
      })
    })

    this._event_sock.on('connection', (ws) => {
      ws.on('message', (msg) => { this._eventEmit(JSON.parse(msg)) })
    })
  }

  /**
   * 启动 api socket、event socket 服务器
   * @param {Server} server
   */
  start (server) {
    server.on('upgrade', (req, socket, head) => {
      if (this._api_sock.shouldHandle(req)) {
        this._api_sock.handleUpgrade(req, socket, head, (ws) => {
          this._api_sock.emit('connection', ws, req) // 需要传递 req 参数来识别出 cqhttp 客户端
        })
      } else if (this._event_sock.shouldHandle(req)) {
        this._event_sock.handleUpgrade(req, socket, head, (ws) => {
          this._event_sock.emit('connection', ws)
        })
      }
    })
  }

  /**
   * 调用 CQ API
   * @see {@link https://github.com/howmanybots/onebot/tree/master/v11/specs/api}
   * @param {string} action
   * @param {Object|null} params
   * @returns {Promise}
   */
  call (action, params) {
    if (!this._api_client) { return Promise.reject(new Error('未连接 CQ 客户端')) }

    const id = nanoid(7) // 新建请求 ID
    this._api_client.send(JSON.stringify({ action, params, echo: { id } })) // 发送 API 指令
    const success = new Promise((resolve) => {
      const onSuccess = (ctx) => {
        this._responseHandlers.delete(id)
        delete ctx.echo
        resolve(ctx)
      }
      this._responseHandlers.set(id, onSuccess)
    })
    const failure = new Promise((resolve, reject) => {
      setTimeout(() => {
        this._responseHandlers.delete(id)
        reject(new Error('time out!'))
      }, 3000)
    })
    return Promise.race([success, failure])
  }

  /**
   * 监听 CQ 事件
   * @param {string} eventType 事件类型
   * @param {function} cb 回调函数
   */
  on (eventType, cb) { this._event_bus.on(eventType, cb) }

  /**
   * CQ 事件上报
   * @param {Object} msg
   */
  _eventEmit (msg) {
    switch (msg.post_type) {
      case 'message':
        switch (msg.message_type) {
          case 'private':
            this._event_bus.emit('message.private', msg)
            break
          case 'group':
            this._event_bus.emit('message.group', msg)
            break
          default:
            break
        }
        break
      case 'notice':
        switch (msg.notice_type) {
          case 'group_upload':
            this._event_bus.emit('notice.group_upload', msg)
            break
          case 'group_admin':
            switch (msg.sub_type) {
              case 'set':
                this._event_bus.emit('notice.group_admin.set', msg)
                break
              case 'unset':
                this._event_bus.emit('notice.group_admin.unset', msg)
                break
              default:
                break
            }
            break
          case 'group_decrease':
            switch (msg.sub_type) {
              case 'leave':
                this._event_bus.emit('notice.group_decrease.leave', msg)
                break
              case 'kick':
                this._event_bus.emit('notice.group_decrease.kick', msg)
                break
              case 'kick_me':
                this._event_bus.emit('notice.group_decrease.kick_me', msg)
                break
              default:
                break
            }
            break
          case 'group_increase':
            switch (msg.sub_type) {
              case 'approve':
                this._event_bus.emit('notice.group_increase.approve', msg)
                break
              case 'invite':
                this._event_bus.emit('notice.group_increase.invite', msg)
                break
              default:
                break
            }
            break
          case 'group_ban':
            switch (msg.sub_type) {
              case 'ban':
                this._event_bus.emit('notice.group_ban.ban', msg)
                break
              case 'lift_ban':
                this._event_bus.emit('notice.group_ban.lift_ban', msg)
                break
              default:
                break
            }
            break
          case 'group_recall':
            this._event_bus.emit('notice.group_recall', msg)
            break
          case 'friend_recall':
            this._event_bus.emit('notice.friend_recall', msg)
            break
          default:
            break
        }
        break
      case 'request':
        switch (msg.request_type) {
          case 'friend':
            this._event_bus.emit('request.friend', msg)
            break
          case 'group':
            switch (msg.sub_type) {
              case 'add':
                this._event_bus.emit('request.group.add', msg)
                break
              case 'invite':
                this._event_bus.emit('request.group.invite', msg)
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
            this._event_bus.emit('meta_event.lifecycle', msg)
            break
          case 'heartbeat':
            this._event_bus.emit('meta_event.heartbeat', msg)
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
