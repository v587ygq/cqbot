/**
 * 构造自定义音乐分享 (CQ:music) 消息段
 * @see {@link https://cqbot.info/cqcode/music}
 * @param {string} url 点击后跳转目标 URL
 * @param {string} audio 音乐 URL
 * @param {string} title 标题
 * @param {string} [content=undefined] 内容描述（可选）
 * @param {string} [image=undefined] 图片 URL（可选）
 */
module.exports = (url, audio, title, content, image) => ({
  type: 'music',
  data: {
    type: 'custom',
    url,
    audio,
    title,
    content,
    image
  }
})
