import io from 'socket.io-client'
import {randomColor, genUid} from './util'
const CHAT = {
  username: null,
  userid: null,
  color: null,
  socket: null,
  onlineCount: 0,
  onlineUsers: null,
  msgArr: [],
  // 信息格式为{user:{username,userid,color},msg,onlineCount,onlineUsers,login,logout}
  // 退出，本例只是一个简单的刷新
  logout: function () {
    this.socket.disconnect()
  },
  // 提交聊天消息内容
  submit: function (msg) {
    if (msg !== '') {
      let obj = {
        userid: this.userid,
        username: this.username,
        msg: msg,
        color: this.color
      }
      this.socket.emit('message', obj)
    } else {
      console.log('msg is null')
    }
    return false
  },
  init: function (name, weichat) {
    /*
     客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
     实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
     */

    this.username = name
    this.color = randomColor()
    this.weichat = weichat
    this.userid = genUid()
      // 设置缓存！当路由跳转到主界面前，需要验证缓存信息中有没有userid
    sessionStorage.setItem('userid', this.userid)

    // 连接websocket后端服务器
    this.socket = io.connect('http://www.zyy1217.com:3000')

    // 告诉服务器端有用户登录
    this.socket.emit('login', {userid: this.userid, username: this.username, color: this.color, weichat: this.weichat})
    // 心跳包，30s左右无数据浏览器会断开连接Heartbeat

    setInterval(() => {
      this.socket.emit('heartbeat', 1)
    }, 10000)
    // 监听新用户登录
    this.socket.on('login', function (o) {
      CHAT.onlineCount = o.onlineCount
      CHAT.onlineUsers = o.onlineUsers
      CHAT.msgArr.push(o)
    })

    this.socket.on('changeInfo', function (o) {
      CHAT.onlineUsers[o.userid] = o
      console.log(o)
    })
    // 监听用户退出
    this.socket.on('logout', function (o) {
      CHAT.msgArr.push(o)
      CHAT.onlineCount = o.onlineCount
      CHAT.onlineUsers = o.onlineUsers
    })

    // 监听消息发送
    this.socket.on('message', function (obj) {
      CHAT.msgArr.push(obj)
      // console.log(CHAT.msgArr)
    })
  }
}
export default CHAT
