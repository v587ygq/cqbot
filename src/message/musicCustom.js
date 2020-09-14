/**
 * 构造自定义音乐分享 (CQ:music) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E9%9F%B3%E4%B9%90%E8%87%AA%E5%AE%9A%E4%B9%89%E5%88%86%E4%BA%AB-}
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
