/**
 * 构造链接分享 (CQ:share) 消息段
 * @see {@link https://cqbot.info/cqcode/share}
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
