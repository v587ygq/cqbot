const $get = require('lodash.get')

module.exports = class Eventbus {
  constructor (cqbot) {
    this._eventMap = {
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

    this._cqbot = cqbot
  }

  _getHandlerQueue (eventType) {
    let queue = $get(this._eventMap, eventType)
    if (Array.isArray(queue)) {
      return queue
    }
    queue = $get(this._eventMap, `${eventType}.`)
    return Array.isArray(queue) ? queue : undefined
  }

  /**
   * @param {string} eventType 事件类型
   * @param {function} cb 回调函数
   */
  on (eventType, cb) {
    const queue = this._getHandlerQueue(eventType)
    if (queue) {
      queue.push(cb)
    }
  }

  /**
   * 上报事件并执行所有监听该事件的回调
   * @param {string} eventType 事件类型
   * @param {object} msg 事件数据对象
   * @param {object|undefined} [extra=undefined] 额外参数
   */
  async emit (eventType, msg, extra) {
    const queue = []
    for (let hierarchy = eventType.split('.'); hierarchy.length > 0; hierarchy.pop()) {
      const currentQueue = this._getHandlerQueue(hierarchy.join('.'))
      if (currentQueue && currentQueue.length > 0) {
        queue.push(...currentQueue)
      }
    }

    // 判断该事件是否可以快速操作
    if (extra && extra.quick_action) {
      for (const handler of queue) {
        const result = await handler(msg, extra)
        if (typeof result === 'object') {
          this._cqbot.call('.handle_quick_operation', { context: msg, operation: result })
        }
      }
    } else {
      for (const handler of queue) {
        await handler(msg, extra)
      }
    }
  }
}
