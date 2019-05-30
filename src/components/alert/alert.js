// 入口文件
import Notification from './notification.js'

let messageInstance

function getMessageInstance () {
  messageInstance = messageInstance || Notification.newInstance()
  return messageInstance
}

function notice ({ duration = 1.5, content = '', ...otherProps }) {
  let instance = getMessageInstance()

  instance.add({
    content,
    duration,
    ...otherProps
  })
}

export default {
  info (options) {
    return notice(options)
  }
}
