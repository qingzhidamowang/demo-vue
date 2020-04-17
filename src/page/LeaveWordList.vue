<template>
  <div id="leaveWordList">
    <!--    <p>{{msg}}</p>-->
    <!--    <vue-particles-->
    <!--      color="#A2B2C3" :particleOpacity="0.7"-->
    <!--      :particlesNumber="120" shapeType="circle" :particleSize="4"-->
    <!--      linesColor="#A2B2C3" :linesWidth="1"-->
    <!--      :lineLinked="true" :lineOpacity="0.5" :linesDistance="150"-->
    <!--      :moveSpeed="3" :hoverEffect="true"-->
    <!--      hoverMode="grab" :clickEffect="true"-->
    <!--      clickMode="repulse">-->
    <!--    </vue-particles>-->
    <el-card class="box-card" shadow="hover">
      <div>
        <h3>{{gettime+' '+nowWeek}}</h3>
        <div>
          <el-image src="https://mjmall.oss-cn-shanghai.aliyuncs.com/2020/03/18/1584510556170625.jpg"></el-image>
        </div>
      </div>
    </el-card>
    <el-card class="box-cardTwo" shadow="hover">
      <div>
        <h3 style="font-weight: bold">留言板</h3>
        <hr>
        <!--            <div class="box-cardTwo-body" style="overflow:auto">-->
        <!--                <div v-for="item in comment" class="infinite-list-item">-->
        <!--                  <span>{{ item.author.nickname }}</span> :-->
        <!--                  <span>{{item.content}}</span>&nbsp;&nbsp;&nbsp;&nbsp;-->
        <!--                  <span style="color: #8F8F8F;">{{item.createDate}}</span>-->
        <!--                </div>-->
        <!--            </div>-->
        <div id="box">
          <div id="con1" :class="{anim:animate==true}" @mouseenter="mEnter" @mouseleave="mLeave">
            <div v-for='item in comment' class="infinite-list-item">
              <span>{{ item.author.nickname}}</span>：
              <span>{{item.content}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span style="color: #8F8F8F;">{{item.createDate}}</span>
            </div>
            已加载到底部啦······
          </div>
        </div>
        <el-input class="box-cardTwo-input"  type="textarea" placeholder="发表言论~" v-model="inputs" maxlength="200"  show-word-limit clearable autosize></el-input>
        <el-button class="box-cardTwo-button" size="small" @click="addComment()">发送</el-button>
      </div>
    </el-card>
    <el-card class="box-cardthwee" shadow="hover">
      <div>
        <h3 style="font-weight: bold;text-align: center">· 美图茶馆 ·</h3>
        <hr>
      </div>
    </el-card>
    <el-col :span="25" v-for="(url,index) in urls" :key="index">
      <el-image class="demo-image__lazy" :src="url" lazy></el-image>
      <hr>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "LeaveWordList",
        data(){
            return{
                animate: false,
                msg:"留言板正在建设中···········",
                /*以后后端存储数据库，现展示，先不做*/
                urls: [
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/45eae6d0a6baec862a45e3697d13fd22.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/45eae6d0a6baec862a45e3697d13fd22_0.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/45eae6d0a6baec862a45e3697d13fd22_1.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/d33476255907d6f39a6613d6d0544a36_18.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/d33476255907d6f39a6613d6d0544a36_19.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/d33476255907d6f39a6613d6d0544a36_4.png',
                    // 'https://hzmuji.oss-cn-shanghai.aliyuncs.com/01/BlogImage/d33476255907d6f39a6613d6d0544a36_7.png',

                ],
                gettime:"",//当前时间
                inputs:"",
                comment:[],
                comments:{
                    content:"",
                    author:{
                        id:2
                    },
                    parent:0,
                    level:0
                },
                nowWeek:"",
                toUsers:{},
            }
        },
        methods: {
            /*获取游客评论*/
            getCommentsByUserIds(){
                let _this=this
                _this.$api.api.getCommentsByUserId().then(res => {
                    console.log(res.data)
                    _this.comment=res.data
                }).catch(error => {
                    if (error !== 'error') {
                        _this.$message({type: 'error', message: '标签加载失败！', showClose: true})
                    }
                })
            },
            /*评论*/
            addComment(){
                let _this=this
                if(_this.inputs!=""){
                    _this.comments.content =_this.inputs
                   // _this.toUsers=_this.$store.getters.getUser
                   //  if (!Object.keys(_this.toUsers).length==0){
                   //      _this.comments.author.id=_this.toUsers.id
                   //  }
                    _this.$api.api.addComments(_this.comments).then(res =>{
                        if (res.data.commentId>0){
                            _this.$message({type: 'success', message: '留言已发送！', showClose: true})
                            _this.inputs=""
                            _this.getCommentsByUserIds()
                        }
                    }).catch(error => {
                        if (error !== 'error') {
                            _this.$message({type: 'error', message: '留言发送失败！', showClose: true})
                        }
                    })
                }else {
                    _this.$message({type: 'warning', message: '你还没输入留言·', showClose: true})
                }
            },
            /*时间日期*/
            getTime:function(){
                let _this = this;
                let yy = new Date().getFullYear();
                let mm = new Date().getMonth()+1;
                let dd = new Date().getDate();
                let week = new Date().getDay();
                let hh = new Date().getHours();
                let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
                let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
                if (week == 1) {
                    this.nowWeek = "星期一";
                } else if (week == 2) {
                    this.nowWeek = "星期二";
                } else if (week == 3) {
                    this.nowWeek = "星期三";
                } else if (week == 4) {
                    this.nowWeek = "星期四";
                } else if (week == 5) {
                    this.nowWeek = "星期五";
                } else if (week == 6) {
                    this.nowWeek = "星期六";
                } else {
                    this.nowWeek = "星期日";
                }
                _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
            },
            currentTime(){
                setInterval(this.getTime,500)
            },
            /*滚动*/
            scroll() {
                if (this.comment.length>15) {
                    this.animate = true;    // 因为在消息向上滚动的时候需要添加css3过渡动画，所以这里需要设置true
                    setTimeout(() => {      //  这里直接使用了es6的箭头函数，省去了处理this指向偏移问题，代码也比之前简化了很多
                        this.comment.push(this.comment[0]);  // 将数组的第一个元素添加到数组的
                        this.comment.shift();               //删除数组的第一个元素
                        this.animate = false;  // margin-top 为0 的时候取消过渡动画，实现无缝滚动
                    }, 500)
                }
            },
            mEnter () {
                clearInterval(this.timer1)
            },
            mLeave () {
                this.timer1= setInterval(this.scroll,1000)
            },
        },
        created() {
            this.currentTime();
            this.getCommentsByUserIds();
            this.timer1= setInterval(this.scroll,1000)
        },
    }
</script>

<style scoped>
  #leaveWordList{
    width: 100%;
  }
  .box-card{
    float: left;
    width: 580px;
    height: 520px;
    margin-bottom: 5px;
  }
  .box-cardTwo{
    float: right;
    width: 580px;
    height: 520px;
    margin-bottom: 5px;
  }
  .demo-image__lazy{
    width: 100%;
  }
  .box-cardTwo-body{
    width: 520px;
    height: 400px;
    line-height: 25px;
  }
  .box-cardthwee{
    width: 100%;
    margin-bottom: 10px;
  }
  .box-cardTwo-input{
    width: 420px;
  }
  .box-cardTwo-button{
    display: inline;
  }
  .infinite-list-item{
    border-bottom: #EBEBEB 1px dotted;
    /*line-height: 40px;*/
  }
  #box{
    width: 520px;
    height: 400px;
    overflow: hidden;
    line-height: 25px;
  }
  .anim{
    transition: all 0.5s;
    margin-top: -25px;
  }
</style>
