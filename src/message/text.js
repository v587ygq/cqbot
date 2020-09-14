/**
 * 构造纯文本 (CQ:text) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E7%BA%AF%E6%96%87%E6%9C%AC}
 * @param {string} text 纯文本内容
 */
module.exports = text => ({
  type: 'text',
  data: { text }
})
