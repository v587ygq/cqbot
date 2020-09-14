/**
 * 构造戳一戳 (CQ:poke) 消息段
 * @see {@link https://cqbot.info/cqcode/poke}
 * @param {string} qq 需要戳的成员
 */
module.exports = qq => ({
  type: 'poke',
  data: { qq }
})
