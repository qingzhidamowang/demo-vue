<template>
  <div id="home-template">
      <el-container class="page-a">
        <el-header>
          <div class="main-menu">
            <a href="/"><img class="logo" src="../assets/images/blog/logo.png" alt="秒杀logo" /></a>
            <el-menu :default-active="$route.path" mode="horizontal" router>
              <el-menu-item class="blog-classify" index="/"><i class="el-icon-s-home"></i><span>首页</span></el-menu-item>
              <el-menu-item index="/classify"><i class="el-icon-discount"></i><span>博客分类</span></el-menu-item>
              <el-menu-item index="/label"><i class="el-icon-collection-tag"></i><span>标签</span></el-menu-item>
              <el-menu-item index="/pigeonhole"><i class="el-icon-mobile"></i><span>博客归档</span></el-menu-item>
              <el-menu-item index="/leaveWord"><i class="el-icon-document"></i><span>留言板</span></el-menu-item>
              <el-menu-item index="/course"><i class="el-icon-house"></i><span>技术实验室</span></el-menu-item>
              <el-menu-item index="/order"><i class="el-icon-box"></i><span>实验室相关</span></el-menu-item>
              <el-menu-item index="/box"><i class="el-icon-box"></i><span>测试</span></el-menu-item>
            </el-menu>
          </div>
          <div id="user-setting">
            <!--<i class="el-icon-setting" />-->
            <el-menu :default-active="$route.path" mode="horizontal" router>
              <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
              <el-button type="primary" v-if="getUsername.account == null||getUsername.account == ''" @click="login()" round>登录</el-button>
              <el-submenu index="1" v-else="getUsername != null||getUsername!='' ">
                <template slot="title">
                  <div class="block"><el-avatar :size="30" :src="getUsername.avatar"></el-avatar>&nbsp;&nbsp;&nbsp;{{getUsername.nickname}}</div>
                </template>
                <el-menu-item index="1-1">我的主页</el-menu-item>
                <el-menu-item index="1-2">编辑资料</el-menu-item>
                <el-menu-item index="1-3">后台管理</el-menu-item>
                <el-menu-item index="1-4" @click="outLogin">退出</el-menu-item>
              </el-submenu>
            </el-menu>
          </div>
        </el-header>
        <el-main style="background-color: #F0F2F5">
          <div class="my-container">
            <router-view></router-view>
          </div>
        </el-main>
        <el-footer>
          版权所有 &copy; 2019 码世界
        </el-footer>
      </el-container>

<!--    <el-drawer-->
<!--      title="我是标题"-->
<!--      :visible.sync="drawer"-->
<!--      direction="ltr"-->
<!--      :with-header="false">-->
<!--      <span>我来啦!</span>-->
<!--    </el-drawer>-->
  </div>
</template>

<script>
    export default {
        name: 'home-template',
        props:{
            simple: {
                type: Boolean,
                default: false
            }
        },
        data () {
            return {
                dialogVisible: false,
                user: {
                    account: '',
                    password: ''
                },
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
        computed: {
            getUsername: function() {
                return this.$store.getters.getUser
            }
        },
        created: function() {
            // this.getCategorylists();
        },
        methods:{
            // getCategorylists(){
            //     let self=this;
            //     self.$api.api.selectCategory().then(res=>{
            //         console.log(res);
            //         self.bloglist=res.data;
            //     })
            //         .catch(err => {
            //             console.log(err);
            //         });
            // },
            login(){
                let self=this;
                self.$router.push('/Login');
            },
            outLogin(){
                let self=this;
                self.$store.dispatch('outUser');
                self.$router.push('/');
            }

        }

    }
</script>

<style lang="scss">
  @import '../assets/css/replace-elementui.css';
  @import '../assets/css/home-template.css';

  .el-header,.el-menu-item{
    background-color: #FFFFFF;
    text-align: center;
    line-height: 60px;
  }
  .page-a{
    width: 100%;
  }
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  body {
    height: 100%;
    margin: 0;
    padding: 0;
    font-family :"PingFang SC","Helvetica Neue","Hiragino Sans GB","Segoe UI","Microsoft YaHei","微软雅黑",sans-serif;
  }
  #app {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
  }
  .el-menu-item{
    padding-left: 10px;
    padding-right: 10px;

  }
  .el-submenu__title{
    display: flex;
    align-items: center;
    width: 150px;
  }
.el-header,.el-menu-item{
  background-color: #FFFFFF;
  text-align: center;
  line-height: 60px;
}
</style>
