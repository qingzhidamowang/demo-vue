<template xmlns="http://www.w3.org/1999/html">
  <div id="classify">
    <el-container class="page-class">
       <el-header>
         <span>文章分类</span>
       </el-header>
      <el-main style="padding: 20px  0;margin-top: -10px">
          <div>
            <el-row>
              <el-col :span="8" v-for="(items,index) in category" :key="index">
                <el-card shadow="hover" class="items-row">
                  <div>
                    <el-image class="category-image" :src="items.avatar">
                      <div slot="placeholder" class="image-slot">
                         加载中<span class="dot">...</span>
                      </div>
                    </el-image>
<!--                    <a @click="view(id)">{{items.categoryname}}</a>-->
                    <el-link :underline="false" target="_blank" class="category-link" @click="categoryDetail(items.id)">{{items.categoryname}}</el-link>
                  </div>
                  <div style="text-align: center">概述：&ensp;{{items.description}}</div>
                  <div style="margin-top: 10px">{{items.blogger}}&nbsp;篇文章</div>
                </el-card>
              </el-col>
            </el-row>

          </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
    export default {
        name: "Classify",
        data(){
            return{
                msg:"正在建设中···········",
                category:[]
            }
        },
        created(){
            this.getCategoryList()
        },
        methods:{
            categoryDetail(id){
                this.$router.push({path:`/classify/${id}`})
            },
            getCategoryList() {
                let that = this
                that.$api.api.getCategoryAlls().then(res => {
                    console.log(res.data)
                    that.category = res.data
                }).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '分类加载失败！', showClose: true})
                    }
                })
            },
        }
    }
</script>

<style scoped>
.page-class{
  margin-top: 10px;
}
.items-row{
   width: 390px;
   height: 150px;
   color: #8F8F8F;
   font-size: 15px;
}
.category-image{
  width: 100px;
  height: 60px;
}
.category-link{
    margin-left: 12px;
    margin-top: -90px;
}
</style>
