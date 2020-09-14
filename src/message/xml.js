/**
 * 构造 XML (CQ:xml) 消息段
 * @see {@link https://cqbot.info/cqcode/xml}
 * @param {string} data XML 内容
 */
module.exports = data => ({
  type: 'xml',
  data: { data }
})
