/**
 * 构造链接分享 (CQ:share) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E9%93%BE%E6%8E%A5%E5%88%86%E4%BA%AB}
 * @param {string} url URL
 * @param {string} title 标题
 * @param {string} [content=undefined] 内容描述（可选）
 * @param {string} [image=undefined] 图片 URL（可选）
 */
module.exports = (url, title, content, image) => ({
  type: 'share',
  data: {
    url,
    title,
    content,
    image
  }
})
