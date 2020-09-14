/**
 * 构造图片 (CQ:image) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E5%9B%BE%E7%89%87}
 * @param {string} file 图片文件名
 */
module.exports = file => ({
  type: 'image',
  data: { file }
})
