/**
 * 构造回复 (CQ:reply) 消息段
 * @see {@link https://cqbot.info/cqcode/reply}
 * @param {string} id 回复时引用的消息 ID
 */
module.exports = id => ({
  type: 'reply',
  data: { id }
})
