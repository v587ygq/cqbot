/**
 * 构造 JSON (CQ:json) 消息段
 * @see {@link https://github.com/Mrs4s/go-cqhttp/blob/master/docs/cqhttp.md#json%E6%B6%88%E6%81%AF%E6%94%AF%E6%8C%81}
 * @param {string} data JSON 内容
 * @param {number} [resid=0] 默认不填为0，走小程序通道，填了走富文本通道发送
 */
module.exports = (data, resid) => {
  // 进行转义
  // const map = {
  //   ',': '&#44;',
  //   '&': '&amp;',
  //   '[': '&#91;',
  //   ']': '&#93;'
  // }
  return {
    type: 'json',
    data: {
      // data: data.replace(/[,&[\]]/g, (match) => { return map[match] }),
      data,
      resid
    }
  }
}
