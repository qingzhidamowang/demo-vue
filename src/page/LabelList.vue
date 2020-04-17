<template>
  <div id="labelList">
    <el-container>
      <el-main style="padding: 20px  0;">
        <div>
          <el-row>
            <el-col :span="6" v-for="(items,index) in label" :key="index">
              <el-card shadow="hover" class="items-row">
                <div>
                  <el-image class="category-image" :src="items.avatar">
                    <div slot="placeholder" class="image-slot">
                      加载中<span class="dot">...</span>
                    </div>
                  </el-image>
                  <!--                    <a @click="view(id)">{{items.categoryname}}</a>-->
                </div>
                <div>
                  <el-link :underline="false" target="_blank" class="category-link" @click="labelDeil(items.id)">{{items.tagname}}</el-link>
                </div>
                <div>{{items.blogger}}&nbsp;篇文章</div>
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
        name: "LabelList",
        data(){
            return{
                msg:"正在建设中···········",
                label:[]
            }
        },
        created(){
            this.getLebelList()
        },
        methods: {
            labelDeil(id){
                this.$router.push({path: `/tag/${id}`})
            },
            getLebelList() {
                let that = this
                that.$api.api.getLabelList().then(res => {
                    console.log(res.data)
                    that.label = res.data
                }).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '标签加载失败！', showClose: true})
                    }
                })
            },

        }
    }
</script>

<style scoped>
  .page-class{
    /*margin-top: 10px;*/
  }
  .items-row{
    width: 290px;
    height: 135px;
    color: #8F8F8F;
    font-size: 15px;
    text-align: center;
    margin-top: 10px;
  }
  .category-image{
    width: 60px;
    height: 60px;
  }
  .category-link{
  }
</style>
