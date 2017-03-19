


使用Express轻量级web开发框架搭建聊天室服务器端，Socket.io实现服务器端和客户端的Websocket实时双向通讯，同时兼容低版本AJAX连接方式。

采用Vue + Vue-router 视图层双向数据绑定框架，进行组件化开发。并使用ngix实现项目热部署，反向代理单个云主机IP上的多个Virtual Host，实现负载均衡。

### [项目演示地址](chat.zyy1217.com)
## 效果图：
![Untitled Image](https://github.com/fyuanfen/fyuanfen.github.io/tree/master/chatRoom/src/assets/chat.gif)


# 一、需求分析

1. 兼容不支持WebSocket的低版本浏览器。
2. 允许客户端有相同的用户名。
3. 进入聊天室后可以看到当前在线人数。
4. 用户上线或退出，所有在线的客户端应该实时更新。
5. 用户发送消息，所有客户端实时收取


#  二、使用的东西
1. nodejs node服务器运行环境
2. express  Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，使用它来搭建聊天室的服务器端
3. websocket 本例核心，推送服务器消息到所有人
4. socketio websocket第三方库
5. vue + router 视图层双向数据绑定框架，用来简化开发、组件化开发
6. es6语法 就是好用简洁哈哈
7. nginx 实现项目热部署，反向代理云主机ip上多个virtual Host。


Socket.IO是一个开源的WebSocket库，它通过Node.js实现WebSocket服务端，同时也提供客户端JS库。Socket.IO支持以事件为基础的实时双向通讯，它可以工作在任何平台、浏览器或移动设备。**socket.io封装了websocket，同时包含了其它的连接方式，比如Ajax。**

Socket.IO支持4种协议：WebSocket、htmlfile、xhr-polling、jsonp-polling，它会自动根据浏览器选择适合的通讯方式，从而让开发者可以聚焦到功能的实现而不是平台的兼容性，同时Socket.IO具有不错的稳定性和性能。

# 三、代码架构简介

1. server里是需要运行在node服务器上的js文件，监听websocket连接
2. src/api/client是客户端连接服务器的核心js
3. src/components下是页面的组件。我分成两大部分，login组件(登录页面)，chat组件（聊天页面），其实是单页应用，反应速度更快，接近原生app，只不过用router联系在了一起。像c聊天主页界面app组件，由head、body、foot组件组成，组件化是很好的习惯和架构方式，条理清晰，而且在大项目里很多可以复用。

# 四.运行代码

- install dependencies
```
npm install
```

- serve with hot reload at localhost:8080
```
npm run dev
```

- build for production with minification
```
npm run build
```

# 五、 细节

### 1. 文本输入的细节处理: xss的预防，以及组合键的识别

**支持enter和按钮发送信息**
```html
    <input class="chat-input" type="text" name="" @keyup.enter="send(msg)" v-model="msg">
    <span class="btn" :class="{'primary':!!msg}"  @click="send(msg)">发送</span>
```
  通过绑定vue的click和keyup.enter事件，发送信息
  
**根据聊天框有无信息，按钮样式动态改变**
```html
<span class="btn" :class="{'primary':!!msg}"  @click="send(msg)">
```
使用v-bind 设置btn的primary类，如果msg内容不为空，则primary设为true

### 2. 禁止未认证用户直接访问聊天主界面，需跳转到登录页面

通过vue的路由全局钩子，配合HTML5的sessionStroage进行登录验证

 ```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (sessionStorage.getItem('userid')) {  // 判断当前用户是否存在，实际应用中应该与后台数据进行验证，此例子只读取localstorge
      next()
    } else {
      // console.log()
      next({path: '/login'})
    }
  } else {
    next()
  }
})
```

### 3. 聊天视图滚动条自动到最底下
使用[Element.scrollIntoView()](https://developer.mozilla.org/zh-CN/docs/Web/API/Element/scrollIntoView) 方法，当聊天信息超过一屏时，聊天信息组件自动滚动到浏览器窗口的可视区域内。


在message组件挂载时：
 ```javascript
 mounted () {
    this.$el.scrollIntoView()
  },
  ```
  
  ### 4.用户断线后无提示
 
  为了解决这个问题，我不再让信息发出者直接在聊天记录中显示自己发出的信息。而是让他也从服务器端接收到自己刚刚发出的信息后，再显示到聊天记录中。这样如果用户断线了，他就无法看到自己发出的信息，便能够意识到自己刚刚发的信息没有成功送出，以此避免沟通上的误会。为此，上面提到的 socket.broadcast.emit() 需要改成 io.sockets.emit() 这样信息发出者也能收到自己发出的信息。显然这一改动对聊天室的性能影响微乎其微，却很好的解决了沟通发生误会的问题。

  
  




