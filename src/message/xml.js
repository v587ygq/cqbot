/**
 * 构造 XML (CQ:xml) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#xml-%E6%B6%88%E6%81%AF}
 * @param {string} data XML 内容
 */
module.exports = data => ({
  type: 'xml',
  data: { data }
})
