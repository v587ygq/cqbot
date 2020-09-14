/**
 * 构造 JSON (CQ:json) 消息段
 * @see {@link https://cqbot.info/cqcode/json}
 * @param {string} data JSON 内容
 * @param {number} [resid=0] 默认不填为0，走小程序通道，填了走富文本通道发送
 */
module.exports = (data, resid) => {
  return {
    type: 'json',
    data: { data, resid }
  }
}
