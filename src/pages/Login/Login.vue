<template>
  <div>
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">硅谷外卖</h2>
          <div class="login_header_title">
            <a href="javascript:;" :class="{on:showPhoneLogin}" @click="showPhoneLogin=true">短信登录</a>
            <a href="javascript:;" :class="{on:!showPhoneLogin}" @click="showPhoneLogin=false">密码登录</a>
          </div>
        </div>
        <div class="login_content">
          <form>
            <div :class='{on:showPhoneLogin}'>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                <button :disabled="(!rightPhone)||timeCount>0" class="get_verification" :class="{right_phone_number:rightPhone&&timeCount===0}" @click.prevent="sendMsg">
                    {{timeCount>0?`已发送(${timeCount})s`:'获取验证码'}}
                </button>
              </section>
              <section class="login_verification">
                <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
              </section>
              <section class="login_hint">
                温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                <a href="javascript:;">《用户服务协议》</a>
              </section>
            </div>
            <div :class="{on:!showPhoneLogin}">
              <section>
                <section class="login_message">
                  <input type="tel" maxlength="11" placeholder="用户名" v-model="name">
                </section>
                <section class="login_verification">
                  <input :type="showPwd?'text':'password'" maxlength="8" placeholder="密码" v-model="pwd">
                  <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                    <div class="switch_circle" :class="{right:showPwd}"></div>
                    <span class="switch_text">{{showPwd?'abc':''}}</span>
                  </div>
                </section>
                <section class="login_message">
                  <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                  <img  ref="showCaptcha" class="get_verification" @click="changeCaptcha" src="http://localhost:5000/captcha" alt="captcha">
                </section>
              </section>
            </div>
            <button class="login_submit" @click.prevent="goLogin">登录</button>
          </form>
          <a href="javascript:;" class="about_us">关于我们</a>
        </div>
        <a href="javascript:" class="go_back" @click="$router.back()">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </div>
    </section>
  </div>
</template>

<script>
  import {reqCode,reqSms,reqPwd} from '../../api'
  import {Toast,MessageBox} from 'mint-ui'
  export default {
    data(){
      return{
        showPhoneLogin:true,
        phone:'',
        timeCount:0,
        showPwd:false,
        code:'', //短信验证码
        name:'',
        pwd:'',
        captcha:'' //短信验证码
      }
    },
    methods:{
    changeCaptcha(){
      this.$refs.showCaptcha.src = `http://localhost:5000/captcha?time=${Date.now()}`
    },
    async sendMsg(){
        this.timeCount = 30
        const intervalId = setInterval(()=>{
           this.timeCount--
           if(this.timeCount<=0){
             this.timeCount = 0
             clearInterval(intervalId)
           }
        },1000)
        /*此时发送请求 让后台发送验证码给手机*/
        const result = await reqCode(this.phone)
        if(result.code===0){ // 发送验证码成功
          Toast('短信发送成功')
        }else {
          MessageBox('提示',result.msg)
          // 此时让倒计时置为0  自动清除定时器
          this.timeCount = 0
        }
      },
    async goLogin(){
      const {phone,code,name,pwd,captcha,showPhoneLogin} = this
      let result
      if(showPhoneLogin){ // 手机号登录
        // 进行前台表单验证 如果通过了再发送请求
        if(!/^\d{11}$/.test(phone)){
          return MessageBox('提示','请输入正确的手机号')
        }else if(code.length!==6){
          return MessageBox('提示','请输入六位数字')
        }
        // 表单验证通过后 发送手机号登录
        result = await reqSms({phone,code})

      }else{  // 用户名密码登录
        // 进行前台表单验证 如果通过了再发送请求
        if(!name.trim()){
          return MessageBox('提示','必须输入用户名')
        }else if(!pwd.trim()){
          return MessageBox('提示','必须输入密码')
        }else if (captcha.length!==4){
          return MessageBox('提示','请输入四位数字')
        }
        // 表单验证通过后 发送用户名密码登录请求
        result = await reqPwd({name,pwd,captcha})
      }
      if(result.code===0){ // 将返回的信息保存到state状态里
          this.$store.dispatch('saveUser',result.data)
          this.$router.replace('/profile')
      }else{ // 登录失败 提示错误
        MessageBox('提示',result.msg)
      }
    }

    },
    computed:{
      rightPhone(){
        const phone = this.phone
        return  /^1\d{10}$/.test(phone)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone_number
                   color #000
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(27px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
