<template>
  <el-card>

    <div class="me-author-name">
      <el-image class="image-size" :src="src">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      <div>青汁</div>
    </div>
    <div class="me-author-description">
      <span><i class="el-icon-location-outline"></i> &nbsp;安徽&亳州</span>
      <span><i class="me-icon-job"></i> &nbsp;java开发工程师</span>
    </div>
    <div class="me-author-tool">
      <i @click="showTool(qq)" :title="qq.title" class="me-icon-QQ"></i>
      <i @click="showTool(github)" :title="github.title" class="me-icon-github"></i>
    </div>
  </el-card>

</template>

<script>
  export default {
    name: 'CardMe',
    data() {
      return {
        qq: {title: 'QQ', message: '1250471243'},
        github: {
          title: 'github',
          message: '<a target="_blank" href="https://github.com/qingzhidamowang">https://github.com/qingzhidamowang</a>'
        },
        src:"https://mjmall.oss-cn-shanghai.aliyuncs.com/2020/01/03/1578043809616904.png",
      }
    },
    methods: {
      showTool(tool) {
        this.$message({
          duration: 0,
          showClose: true,
          dangerouslyUseHTMLString: true,
          message: '<strong>' + tool.message + '</strong>'
        });
      }
    }
  }
</script>

<style scoped>
  .me-author-name {
    text-align: center;
    font-size: 30px;
    border-bottom: 1px solid #5FB878;
  }

  .me-author-description {
    padding: 8px 0;
  }

  .me-icon-job {
    padding-left: 16px;
  }

  .me-author-tool {
    text-align: center;
    padding-top: 10px;
  }

  .me-author-tool i {
    cursor: pointer;
    padding: 4px 10px;
    font-size: 30px;
  }
  .image-size{
    width: 104px;
    height: 104px;
  }
</style>
