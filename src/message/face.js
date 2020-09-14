/**
 * 构造 QQ 表情 (CQ:face) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#qq-%E8%A1%A8%E6%83%85}
 * @param {string} id 表情 ID
 */
module.exports = id => ({
  type: 'face',
  data: { id }
})
