/**
 * 构造语音 (CQ:record) 消息段
 * @see {@link https://github.com/howmanybots/onebot/blob/master/v11/specs/message/segment.md#%E8%AF%AD%E9%9F%B3}
 * @param {string} file 语音文件名，仅支持 ARM 格式
 */
module.exports = file => ({
  type: 'record',
  data: { file }
})
