/**
 * 构造语音 (CQ:record) 消息段
 * @see {@link https://cqbot.info/cqcode/record}
 * @param {string} file 语音文件名，仅支持 ARM 格式
 */
module.exports = file => ({
  type: 'record',
  data: { file }
})
