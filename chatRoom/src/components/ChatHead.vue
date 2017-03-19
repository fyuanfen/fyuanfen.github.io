<template>
  <div class="head-wrapper">
    <div class="-left">
      <a href="http://www.zyy1217.com">
        <i class="iconfont icon-keaide"></i>
      </a>

    </div>
    <div class="-mid">
      <p class="group-name">胡吹乱侃({{onlineCount}})</p>
    </div>
    <div class="-right">
      <a href="https://github.com/fyuanfen/fyuanfen.github.io/tree/master/chatRoom" class="iconfont icon-group"></a>
      <!--<i class="iconfont icon-group">-->
      <!--</i>-->
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: ''

      }
    },
    props: ['num'],

    computed: {
      onlineCount: function () {
        return this.num
      }

    }
//    computed: {
//      onlineCount: CHAT.onlineCount
//    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
  .head-wrapper {
    background-color: #34352c;
    height: 50px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;

  .-left {
    display: flex;
    flex-shrink: 0;
    height: 100%;
    width: 70px;
    min-width: 70px;
    align-items: center;
    justify-content: space-around;

  .icon-keaide, .icon-tree {
    font-size: 28px !important;
    color: #fff;
  }

  a {
    text-decoration: none;
  }

  }
  .-mid {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
  }

  .-right {
    display: flex;
    align-items: center;
    height: 100%;
    width: 50px;
    justify-content: center;

  .icon-group {
    font-size: 30px !important;
    color: #fff;
    text-decoration: none;
  }

  }
  }
</style>
