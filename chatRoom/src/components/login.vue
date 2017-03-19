<template>
  <transition name = "loginslide">
  <div class="login-wrapper" >
    <div class="header">

    </div>
    <div class="body">
      <div class="-title">
        胡吹乱侃
      </div>
      <div class="-name">
        <label>群昵称：</label>
        <input type="text" v-model="name" placeholder="10字以内">
      </div>
      <div class="-weichat">
        <label>微信号：</label>
        <input type="text"v-model="weichat" placeholder="方便私聊（选填）">
      </div>
      <div class="-login">
        <span class="-btn" @click="login()">登录</span>
      </div>
    </div>
    <div class="foot">
      <span>@<a href="http://www.zyy1217.com">yuriel</a></span>

    </div>
  </div>
  </transition>
</template>

<script>
    import CHAT from '../api/client'
    export default {
      data () {
        return {
          name: '',
          weichat: ''
        }
      },
      ready () {

      },
      methods: {
        login () {
          if (!this.name.trim()) {
            alert('昵称不能为空！')
            return
          }
          this.name = this.name.slice(0, 10)
          CHAT.init(this.name, this.weichat)
          this.$router.push('/')
        }
      }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>

  .login-wrapper{
    background-color: #fff;
    /*position: relative;*/
    /*top: 0;*/
    /*left: 0%;*/
    /*right: 100%;*/
    /*bottom: 0;*/
  .header{
    width: 100%;
    height: 30%;
    max-height: 300px;
    background: url(../assets/1.jpg);
    background-size: contain;
  }
  .body{
    display: flex;
    flex-direction: column;
    padding: 20px;
  .-title{
    height: 80px;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    color: #999;
  }
  .-name,.-weichat{
    /*background-color: #eee;*/
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    color: #999;
    border-top: solid 1px rgba(0,0,0,0.05);
  lable{
    color: #999;
  }
  input{
    box-sizing: border-box;
    height: 25px;
    border: none;
    outline: none;
    padding: 5px;
    color: #666;
    background-color: rgba(0,0,0,0.02);
  }


  }
  .-login{
    display: flex;
    height: 80px;
    align-items: center;
    font-size: 16px;
    color: #999;
  .-btn{
    background-color: #3CAF36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 40px;
    margin: 10px auto;
    color: #fff;
    font-weight: bolder;
  }
  }
  }
  .foot{
    /*position: absolute;
    bottom: 0;*/
    /*background-color: #098;*/
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
    color: #999;
  span{
    display: inline-block;
  }
  span:first-child{
    font-size: 15px;
  }
  }
  a{
    color: #999;
  }
  }
  /*!* 必需 *!*/
  /*.loginslide-transition {*/
    /*transition: all .3s ease;*/
    /*left:0%;*/
  /*}*/

  /*!* .loginslide-enter 定义进入的开始状态 *!*/
  /*!* .loginslide-leave 定义离开的结束状态 *!*/
  /*.loginslide-leave, .loginslide-enter {*/
    /*left:0%;*/

  /*}*/
</style>
