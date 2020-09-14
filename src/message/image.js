/**
 * 构造图片 (CQ:image) 消息段
 * @see {@link https://cqbot.info/cqcode/image}
 * @param {string} file 图片文件名
 */
module.exports = file => ({
  type: 'image',
  data: { file }
})
