/**
 * 构造回复 (CQ:reply) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E5%9B%9E%E5%A4%8D}
 * @param {string} id 回复时引用的消息 ID
 */
module.exports = id => ({
  type: 'reply',
  data: { id }
})
