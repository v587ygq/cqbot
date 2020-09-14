/**
 * 构造音乐分享 (CQ:music) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E9%9F%B3%E4%B9%90%E5%88%86%E4%BA%AB-}
 * @param {'qq'|'163'|'xm'} type 分别表示使用 QQ 音乐、网易云音乐、虾米音乐
 * @param {string} id 歌曲 ID
 */
module.exports = (type, id) => ({
  type: 'music',
  data: {
    type,
    id
  }
})
