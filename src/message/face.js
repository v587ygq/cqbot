/**
 * 构造 QQ 表情 (CQ:face) 消息段
 * @see {@link https://cqbot.info/cqcode/face}
 * @param {string} id 表情 ID
 */
module.exports = id => ({
  type: 'face',
  data: { id }
})
