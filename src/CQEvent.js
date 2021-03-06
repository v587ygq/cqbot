const $get = require('lodash.get')

module.exports = class Eventbus {
  constructor (cqbot) {
    this._cqbot = cqbot
    this._middleware = new Map() // 存储注册的中间件
    this._cbMiddleware = new WeakMap() // 存储回调函数的中间件
    this._eventType = {
      message: {
        '': [],
        private: {
          '': [],
          friend: [], // 好友
          group: [], // 群临时会话
          other: [] // 其他
        }, // 私聊消息
        group: {
          '': [],
          normal: [], // 正常消息
          anonymous: [], // 匿名消息
          notice: [] // 通知消息
        } // 群消息
      }, // 消息事件
      notice: {
        '': [],
        group_upload: [], // 群文件上传
        group_admin: {
          '': [],
          set: [], // 设置管理员
          unset: [] // 取消管理员
        }, // 群管理员变动
        group_decrease: {
          '': [],
          leave: [], // 主动退群
          kick: [], // 成员被踢
          kick_me: [] // 登录号被踢
        }, // 群成员减少
        group_increase: {
          '': [],
          approve: [], // 管理员已同意入群
          invite: [] // 管理员邀请入群
        }, // 群成员增加
        group_ban: {
          '': [],
          ban: [], // 禁言
          lift_ban: [] // 解除禁言
        }, // 群禁言
        group_recall: [], // 群消息撤回
        friend_recall: [] // 好友消息撤回
      }, // 通知事件
      request: {
        '': [],
        friend: [], // 加好友请求
        group: {
          '': [],
          add: [], // 加群请求
          invite: [] // 邀请登录号入群
        } // 加群请求／邀请
      }, // 请求事件
      meta_event: {
        '': [],
        lifecycle: [], // 生命周期
        heartbeat: [] // 心跳
      } // 元事件
    }
  }

  /**
   * 获取某个事件监听列表
   * @param {string} type 事件类型
   * @returns {Array}
   */
  _getlisteners (type) {
    return $get(this._eventType, `${type}.`) || $get(this._eventType, type)
  }

  /**
   * 监听事件
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   * @param {string|Array|null} middleware 中间件
   */
  on (type, cb, middleware = null) {
    const queue = this._getlisteners(type)
    if (queue) {
      queue.push(cb)
      this._cbMiddleware.set(cb, middleware)
    }
  }

  /**
   * 监听事件（一次性）
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   * @param {string|Array|null} middleware 中间件
   */
  once (type, cb, middleware = null) {
    const func = msg => {
      cb(msg)
      this.off(type, func)
    }
    this.on(type, func, middleware)
  }

  /**
   * 取消监听事件
   * @param {string} type 事件类型
   * @param {function} cb 回调函数
   */
  off (type, cb) {
    const queue = this._getlisteners(type)
    if (queue) {
      const index = queue.indexOf(cb)
      if (index > -1) {
        queue.splice(index, 1)
        this._cbMiddleware.delete(cb)
      }
    }
  }

  /**
   * 注册中间件
   * @param {string} name 中间件名称
   * @param {function} func 中间件函数
   */
  middleware (name, func) { this._middleware.set(name, func) }

  /**
   * 上报 CQ 事件
   * @param {Object} msg
   */
  emit (msg) {
    switch (msg.post_type) {
      case 'message':
        switch (msg.message_type) {
          case 'private':
            switch (msg.sub_type) {
              case 'friend':
                this._handleEmit('message.private.friend', msg, { quick: true })
                break
              case 'group':
                this._handleEmit('message.private.group', msg, { quick: true })
                break
              case 'other':
                this._handleEmit('message.private.other', msg, { quick: true })
                break
              default:
                break
            }
            break
          case 'group':
            switch (msg.sub_type) {
              case 'normal':
                this._handleEmit('message.group.normal', msg, { quick: true })
                break
              case 'anonymous':
                this._handleEmit('message.group.anonymous', msg, { quick: true })
                break
              case 'notice':
                this._handleEmit('message.group.notice', msg, { quick: true })
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
            this._handleEmit('notice.group_upload', msg)
            break
          case 'group_admin':
            switch (msg.sub_type) {
              case 'set':
                this._handleEmit('notice.group_admin.set', msg)
                break
              case 'unset':
                this._handleEmit('notice.group_admin.unset', msg)
                break
              default:
                break
            }
            break
          case 'group_decrease':
            switch (msg.sub_type) {
              case 'leave':
                this._handleEmit('notice.group_decrease.leave', msg)
                break
              case 'kick':
                this._handleEmit('notice.group_decrease.kick', msg)
                break
              case 'kick_me':
                this._handleEmit('notice.group_decrease.kick_me', msg)
                break
              default:
                break
            }
            break
          case 'group_increase':
            switch (msg.sub_type) {
              case 'approve':
                this._handleEmit('notice.group_increase.approve', msg)
                break
              case 'invite':
                this._handleEmit('notice.group_increase.invite', msg)
                break
              default:
                break
            }
            break
          case 'group_ban':
            switch (msg.sub_type) {
              case 'ban':
                this._handleEmit('notice.group_ban.ban', msg)
                break
              case 'lift_ban':
                this._handleEmit('notice.group_ban.lift_ban', msg)
                break
              default:
                break
            }
            break
          case 'group_recall':
            this._handleEmit('notice.group_recall', msg)
            break
          case 'friend_recall':
            this._handleEmit('notice.friend_recall', msg)
            break
          default:
            break
        }
        break
      case 'request':
        switch (msg.request_type) {
          case 'friend':
            this._handleEmit('request.friend', msg, { quick: true })
            break
          case 'group':
            switch (msg.sub_type) {
              case 'add':
                this._handleEmit('request.group.add', msg, { quick: true })
                break
              case 'invite':
                this._handleEmit('request.group.invite', msg, { quick: true })
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
            this._handleEmit('meta_event.lifecycle', msg)
            break
          case 'heartbeat':
            this._handleEmit('meta_event.heartbeat', msg)
            break
          default:
            break
        }
        break
      default:
        break
    }
  }

  /**
   * 处理中间件
   * @param {string|string[]} middleware 中间件
   * @param {function} cb 回调函数
   */
  _handleMiddleware (middleware, cb) {
    const func = []
    if (typeof middleware === 'string') { middleware = [middleware] }
    for (const mw of middleware) {
      const index = mw.indexOf(':')
      if (index === -1) {
        func.push(this._middleware.get(mw))
      } else {
        func.push(this._middleware.get(mw.slice(0, index))(...mw.slice(index + 1).split(',')))
      }
    }
    func.push(cb)

    return msg => {
      const length = func.length
      const next = i => i !== length && func[i](msg, next.bind(null, i + 1))

      return next(0)
    }
  }

  /**
   * 处理上报事件
   * @param {string} type 事件类型
   * @param {object} msg 事件数据对象
   * @param {object|undefined} [extra=undefined] 额外参数
   */
  async _handleEmit (type, msg, extra) {
    const queue = []
    for (let hierarchy = type.split('.'); hierarchy.length > 0; hierarchy.pop()) {
      const currentQueue = this._getlisteners(hierarchy.join('.'))
      if (currentQueue && currentQueue.length > 0) { queue.push(...currentQueue) }
    }

    // 判断事件是否可以快速操作
    if (extra && extra.quick) {
      msg.$send = data => this._cqbot.call('.handle_quick_operation', { context: msg, operation: data })
    }

    for (const cb of queue) {
      const middleware = this._cbMiddleware.get(cb)
      if (!middleware) {
        await cb(msg)
      } else {
        await this._handleMiddleware(middleware, cb)(msg)
      }
    }
  }
}
