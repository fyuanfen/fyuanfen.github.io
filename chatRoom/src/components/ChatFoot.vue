<template>
  <div class="foot-wrapper">
    <input class="chat-input" type="text" name="" @keyup.enter="send(msg)" v-model="msg">
    <span class="btn" :class="{'primary':!!msg}"  @click="send(msg)">发送</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    send (msg) {
      this.$emit('sendmsg', msg)
      this.msg = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

  /* button div */
  .foot-wrapper {
    background-color: #f1f1f1;
    height: 40px;
    padding: 5px 10px;
    border-top: solid 1px rgba(0, 0, 0, 0.1);
    text-align: center;

  .chat-input {
    height: 100%;
    width: ~ 'calc(100% - 80px)';
    border-radius: 10px;
    outline: none;
    border: none;
    box-sizing: border-box;
    padding: 5px;
    float: left;
  }

  .btn {
    border-radius: 5px;
    font-size: 16px;
    cursor:pointer;
    text-align: center;
    line-height: 30px;
    text-decoration: none;
    width: 60px;
    padding: 5px;
    height: 35px;
    box-sizing: border-box;
    margin-left:10px;
    color: #fff;
    position: relative;
    display: inline-block;
    /*默认禁用样式*/
    background-color: darkgrey;
    box-shadow: 0px 5px 0px 0px grey;

  }
  .primary{
    background-color: #2ecc71;
    box-shadow: 0px 5px 0px 0px #15B358;

  &:active {
     transform: translate(0px, 5px);
     -webkit-transform: translate(0px, 5px);
     box-shadow: 0px 1px 0px 0px;
   }
  &:hover {
     background-color: #48E68B;
   }
  }
}

</style>
