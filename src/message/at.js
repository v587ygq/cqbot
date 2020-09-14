/**
 * 构造 @某人 (CQ:at) 消息段
 * @see {@link https://cqbot.info/cqcode/at}
 * @param {string} qq @的 QQ 号，all 表示全体成员
 */
module.exports = qq => ({
  type: 'at',
  data: { qq }
})
