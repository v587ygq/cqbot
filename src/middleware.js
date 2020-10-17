module.exports = {
  owner: (msg, next) => {
    if (msg.sender.role === 'owner') { next() }
  },

  admin: (msg, next) => {
    if (msg.sender.role === 'owner' || msg.sender.role === 'admin') { next() }
  },

  startsWith: str => (msg, next) => {
    if (msg.raw_message.startsWith(str)) { next() }
  },

  endsWith: str => (msg, next) => {
    if (msg.raw_message.endsWith(str)) { next() }
  },

  includes: str => (msg, next) => {
    if (msg.raw_message.includes(str)) { next() }
  },

  equal: str => (msg, next) => {
    if (msg.raw_message === str) { next() }
  }
}
