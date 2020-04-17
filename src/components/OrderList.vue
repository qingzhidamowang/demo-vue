<template>
  <div id="order-list">
    <!-- 上面的筛选 -->
    <div class="order-list-title">
      <h1 class="order-list-title-name">我的订单</h1>
      <div class="order-list-title-filter">
        <!--    -1:已失效, 0:未支付, 1: 已完成, 2:全部 -->
        <el-button :class="orderStatus == 2 ? 'el-button--primary' : 'el-button--text'"
                   size="mini" round @click="changeOrderStatus(2)">全部
        </el-button>
        <el-button :class="orderStatus == 0 ? 'el-button--primary' : 'el-button--text'"
                   size="mini" round @click="changeOrderStatus(0)">未支付
        </el-button>
        <el-button :class="orderStatus == 1 ? 'el-button--primary' : 'el-button--text'"
                   size="mini" round @click="changeOrderStatus(1)">已完成
        </el-button>
        <el-button :class="orderStatus == -1 ? 'el-button--primary' : 'el-button--text'"
                   size="mini" round @click="changeOrderStatus(-1)">已失效
        </el-button>
      </div>
      <div class="order-list-search">
        <el-input placeholder="搜索关键字" prefix-icon="el-icon-search"></el-input>
      </div>
    </div>

    <!-- 筛选结果 -->
    <div class="order-list-body">
      <div v-for="(item, index) in orderList" :key='index' class="order-info-container"
           :class="orderStatus == 2 || orderStatus == item.payStatus ? '' : 'hide'">
        <!-- 2 == orderStatus || item.payStatus == orderStatus ? '' : 'hide' -->
        <div class="order-nubmer">
          <span>订单编号:&nbsp;&nbsp; {{item.orderId}}</span>
          <span class="order-datetime"><time>{{item.createDate | date-format}}</time></span>
        </div>

        <div class="order-info">
          <img :src="'/src/assets/images/course/' + item.coursePic" class="order-image">
          <!-- <img v-else src="/src/assets/images/course/c1.jpg" class="image order-image"> -->

          <div class="course-info">
            <span class="course-info-name">{{item.courseName}}</span>
            <span class="course-info-price"> ￥{{item.payPrice == null ? 0 : item.payPrice}} </span>
          </div>
          <div class="order-pay-info">
            <div v-if="item.payStatus == 1">
              <span>已完成</span><br/>
              <!-- <span>支付方式</span> -->
              <span v-if="item.payment == 0 ">支付宝支付</span>
              <span v-else-if="item.payment == 1">微信支付</span>
              <span v-else>其他支付</span>
            </div>
            <div v-else-if="item.payStatus == 0"><span>· 未支付</span></div>
            <div v-else><span>已失效</span></div>
            <!-- <div v-else> -->
            <!-- <span v-if="item.payStatus == -1 ">已失效</span> -->
            <!-- <span v-else>未支付</span> <br/> -->
            <!-- <span >未支付</span> -->
            <!-- </div> -->
          </div>
          <div>---
            <el-button type="danger" icon="el-icon-delete" circle @click="deleteOrder(item.orderId)">
            </el-button>
          </div>
        </div>
      </div>
      <!-- <div v-if="itemsSize == 0" >
        <div class="no-data">暂无数据</div>
      </div> -->
    </div>
  </div>
</template>

<script>
    export default {
        name: 'order-list',
        data() {
            return {
                orderList: [],
                orderStatus: 2,
                account:""
            }
        },
        computed: {
            // getUsername: function() {
            //     return this.$store.getters.getUser
            // }
        },
        // created() {
        // },
        mounted() {
            this.initOrder();
        },
        methods: {
            changeOrderStatus: function (orderStatus) {
                this.orderStatus = orderStatus
            },
            initOrder(){
                let that=this
                let toUser=that.$store.getters.getUser
                if (!Object.keys(toUser).length==0){//刚载入页面，判断是否登录，已登录直接显示，没有登录跳转登录页面
                    that.account=toUser.account
                    that.orderLists();
                }else {
                    that.$message({type: 'error', message: '请先登陆！', showClose: true})
                    that.$router.push("/Login")
                }
            },
            deleteOrder(orderId) {
                var self = this;
                this.$confirm('此操作将永久删除该订单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                    self.$api.api
                        .deleteOrder({id:orderId}).then(res =>{
                        console.log(res);
                        self.orderLists();
                    })
                        .catch(err => {
                            console.log(err);
                        });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            orderLists(){
                var self = this;
                console.log(33333)
                self.$api.api.selectOrderList({account:this.account})
                    .then(function (response) {
                        console.log(response)
                        if (response.code == 200) {
                            self.orderList = response.data;
                        } else {
                            self.$message.error(response.message)
                        }
                    })
                    .catch(function (error) {
                        // alert(response)
                        self.$message.error(error)
                    });
            }
        }
    }
</script>

<style>
  @import '../assets/css/order-list.css';
</style>
