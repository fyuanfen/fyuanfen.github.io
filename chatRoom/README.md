

> 本项目是基于vue2的在线聊天室，使用Express轻量级web开发框架搭建聊天室服务器端，Socket.io实现服务器端和客户端的Websocket实时双向通讯，同时兼容低版本AJAX连接方式。
采用Vue + Vue-router 视图层双向数据绑定框架，进行组件化开发。并使用nginx实现项目热部署，反向代理单个云主机IP上的多个Virtual Host，实现负载均衡。

## 首先

***

>* 喜欢的请点心，关注，star ,fork,这些是我坚持下去的动力

>* demo地址 [demo](http://project.zyy1217.com/chat/) （请用chrome的手机模式预览）

>* 本项目地址[github地址](https://github.com/fyuanfen/fyuanfen.github.io/tree/master/chatRoom)

>* 手机扫一扫，直接预览

![](http://images.zyy1217.com/1491284118.png)


## 项目技术架构

***
1. nodejs : node服务器运行环境
2. express : Express 是一个基于 Node.js 平台的极简、灵活的 web 应用开发框架，使用它来搭建聊天室的服务器端
3. websocket: 本例核心，推送服务器消息到所有人
4. socketio: websocket第三方库
5. vue + router: 视图层双向数据绑定框架，用来简化开发、组件化开发
6. es6语法: 就是好用简洁哈哈
7. nginx: 实现项目热部署，反向代理云主机ip上多个virtual Host。

***

## 上图
***
### 登录页面

![](http://images.zyy1217.com/chat1.gif)



### 多人聊天，进入推出消息提示，按钮特效
![](http://images.zyy1217.com/chat2.gif)





## 安装
***
 
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务(http://localhost:8080)

```
npm run dev
```
发布代码

```
npm run build
```

## 目录结构
***
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── App.vue         // 主页面 
│   ├── vuex           // vuex状态管理器
│   ├── router.js     // 路由配置器
│   └── main.js        // Webpack 预编译入口
</pre>

## 实现的功能
***
1. 兼容不支持WebSocket的低版本浏览器。
2. 允许同名用户。
3. 在线人数实时更新。
4. 用户上线或退出，所有在线的客户端实时更新。
5. 用户发送消息，所有客户端实时收取
6. 左右滑动切换特效
* 等等


## 细节

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

 
## 最后
***
* 我的另一个vue实战项目[vue-gank](https://github.com/fyuanfen/vue-gank)已经上线，配有详细的教程解释
* 如果喜欢一定要 star哈!!!（谢谢!!）
* 如果有意见和问题 请在 lssues提出，我会在线解答。



