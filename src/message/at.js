/**
 * 构造 @某人 (CQ:at) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E6%9F%90%E4%BA%BA}
 * @param {string} qq @的 QQ 号，all 表示全体成员
 */
module.exports = qq => ({
  type: 'at',
  data: { qq }
})
