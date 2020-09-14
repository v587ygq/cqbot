/**
 * 构造纯文本 (CQ:text) 消息段
 * @see {@link https://cqbot.info/cqcode/text}
 * @param {string} text 纯文本内容
 */
module.exports = text => ({
  type: 'text',
  data: { text }
})
