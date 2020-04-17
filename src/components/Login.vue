<template>
<!-- <portal-template>-->
    <div id="Login">
      <img class="portal-logo" src="../assets/images/blog/logo.png" />
      <el-form label-position="top" label-width="80px" :model="user"
       :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" prop="account">
          <el-input style="width: 300px" v-model="user.account" placeholder="请输入账号  "></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input style="width: 300px" type="password" v-model="user.password" placeholder="请输密码  "></el-input>
        </el-form-item>
        <el-button class="submit-btn" type="primary" @click="login('ruleForm')"  v-on:keyup.13="login('ruleForm')">登录</el-button>
      </el-form>
      <router-link to="/register"><el-button type="text" icon="el-icon-edit">去注册页</el-button></router-link>
    </div>
<!-- </portal-template>-->
</template>

<script>
import PortalTemplate from './PortalTemplate'
export default {
  name: 'Login',
  components: {
    PortalTemplate
  },
  data () {
    return {
      user: {
        account: '',
        password: ''
      },
      msg: 'Welcome to Your Vue.js App',
      rules: {
         account: [
           { required: true, message: '请输入账号', trigger: 'blur' }
         ],
         password: [
          { required: true, message: '请输入密码 ', trigger: 'blur' }
        ]
      }
    }
  },
    created(){
    let _this = this;
    document.onkeydown = function(e) {
        let key = window.event.keyCode;
        if (key == 13) {
            _this.login('ruleForm')
        }
    };

    },
/*    beforeDestroy(){
        let _this = this;
        document.onkeydown = function(e) {
            let key = window.event.keyCode;
            if (key == 13) {
                // _this.login('ruleForm')
            }
        };
    },*/
  methods: {
    login(formName) {
      var self = this;
      self.$refs[formName].validate((valid) => {
         if (valid) {
             self.$store.dispatch('login', {account: self.user.account, password: self.user.password})
           .then((response) => {
             self.$message.success(response.data.message)
             // self.$router.push('/');
             console.log(response.data)
             self.$router.go(-1)//返回上一页
           })
           .catch((response) => {
             self.$message.error(response.data.message)
           })
       }
       });
    }
  }
}
</script>

<style lang="scss">
  #Login{
    text-align: center;
  }
</style>
