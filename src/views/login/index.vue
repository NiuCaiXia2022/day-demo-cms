<template>
  <div class="content">
    <!-- 登录 -->
    <div class="div">
    <div class="const-header">智慧服务平台</div>
    <div class="header">欢迎登录</div>
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="ruleLoginForm"
    >
      <el-form-item  prop="username">
        <el-input v-model.trim="loginForm.username" placeholder="请输入账号" clearable></el-input>
      </el-form-item>
      <el-form-item  prop="password">
        <el-input v-model.trim="loginForm.password" placeholder="请输入密码" show-password clearable type="password"></el-input>
      </el-form-item>
      <el-form-item  prop="code" >
       <div class="loginImg">
        <el-input v-model.trim="loginForm.code" placeholder="请输入验证码" clearable class="loginCode" ></el-input>
        <img :src="loginImg" class="img" @click.stop="handleLoginToken">
       </div>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" :loading="loadingStatus" class="login-button"  @click="handleVerification">{{loadingStatus?'登陆中···':'登录'}}</el-button>
      </el-form-item>
    </el-form>
    </div>

  </div>
</template>
<script>
import Login from '../../api/user'
export default {
  props: {},
  components: {},
  data () {
    return {
      // 表单
      loginForm: {
        username: 'duck',
        password: 'admin888',
        code: ''
      },
      // 验证
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      // 按钮 loading
      loadingStatus: false,
      // ref 表单验证
      ruleLoginForm: '',
      // 图片
      loginImg: ''
    }
  },
  created () {
    this.handleLoginToken()
  },
  computed: {},
  methods: {
    // 默认请求 token
    async handleLoginToken () {
      const res = await Login.getCaptcha()
      // console.log('默认请求',res)
      this.loginImg = res.captchaImg
      this.loginForm.token = res.token
    },
    // 点击登录
    handleVerification () {
      this.$refs.ruleLoginForm.validate((valid) => {
        if (!valid) return
        if (valid) {
          // console.log('点击登录', this.loginForm)
          this.handleGetLogin(this.loginForm)
        }
      })
      this.loadingStatus = true
    },
    // 登录请求
    async handleGetLogin (from) {
      try {
        // console.log('登录请求', from)
        await this.$store.dispatch('user/getLogin', from)
        this.$router.push('/home')
        this.loadingStatus = false
        // 登录成功 提示
        this.$notify({
          title: '提示',
          message: '登录成功',
          type: 'success'
        })
      } catch (error) {
        // 登录失拜
        this.$message.error('登录失败')
        console.log(error)
      }
    }
  },
  mounted () {}
}
</script>

<style lang="scss" scoped>
.content {
  background: url(../../assets/bg.jpg) no-repeat 0 0;
  width: 100vw;
  height: 100vh;
  color: #fff;
  overflow: hidden;
  .el-form-item__content{
    vertical-align: middle;
  }
  .el-input{
    height: 45px;
    line-height: 45px;
  }
  .loginCode{
    width: 160px;
  }
.loginImg{
  display: flex;
  height: 45px;
  .el-input{
    width: 200px;
    margin-right: 5px;
  }
  .img{
    width: 120px;
    background-color: red;
    border-radius: 5px;
  }
}
.header{
  margin: 20px 0;
  font-size: 30px;
}
  .div{
    width: 300px;
    margin: 0 auto;
    .const-header{
      font-size: 42px;
      margin: 50px 0 130px 0;
    }
    .login-button{
      width: 100%;
    }

  }
}
</style>
