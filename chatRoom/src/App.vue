<template>
  <div class="chat">
    <chat-head :num="CHAT.onlineCount"></chat-head>
    <chat-body :chat="CHAT"></chat-body>
    <chat-foot @sendmsg="sendMsg"></chat-foot>
  </div>
</template>

<script>
  import ChatHead from './components/ChatHead'
  import ChatBody from './components/ChatBody'
  import ChatFoot from './components/ChatFoot'
  import CHAT from '../src/api/client'
  export default {
    data () {
      return {
        CHAT
      }
    },
    components: {
      ChatHead,
      ChatBody,
      ChatFoot
    },
    computed: {
      getNum: function () {
        return CHAT.onlineCount
      }

    },
    methods: {
      sendMsg (msg) {
        CHAT.submit(msg)
        console.log(CHAT.onlineCount)
      }
    }

  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  html {
    height: 100%;
  }

  body {
    width: 100%;
    height: 100%;
  }
  .chat{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }

</style>
