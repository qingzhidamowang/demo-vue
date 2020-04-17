<template>
  <div v-title :data-title="title">
    <el-container>
      <el-main class="blog-container">
        <div class="blog-header">
          当前处于：<i class="el-icon-mobile"></i>
          <span>博客归档</span>/{{currentArchive}}
        </div>
        <div class="blog-main">
          <article-scroll-page v-bind="article"></article-scroll-page>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  import ArticleScrollPage from '@/page/common/ArticleScrollPage'
  export default {
    name: "BlogArchive",
    components: {
      ArticleScrollPage
    },
    created() {
      this.listArchives()
    },
    watch: {
      '$route'() {
        if (this.$route.params.year && this.$route.params.month) {
          this.article.query.year = this.$route.params.year
          this.article.query.month = this.$route.params.month
        }
      }
    },
    data() {
      return {
        article: {
          query: {
            month: this.$route.params.month,
            year: this.$route.params.year
          }
        },
        archives: []
      }
    },
    computed: {
      title (){
        return this.currentArchive + ' - 文章归档 --'
      },
      currentArchive (){
        if(this.article.query.year && this.article.query.month){
          return `${this.article.query.year}年${this.article.query.month}月`
        }
        return '全部'
      }
    },
    methods: {
      changeArchive(year, month) {
        // this.currentArchive = `${year}年${month}月`
        // this.article.query.year = year
        // this.article.query.month = month
        this.$router.push({path: `/pigeonhole/${year}/${month}`})
      },
      listArchives() {
            let that=this
            that.$api.api.getBlogPigeonhole().then((res => {
                this.archives = res.data
                console.log(this.archives)
            })).catch(error => {
                that.$message({type: 'error', message: '文章归档加载失败!', showClose: true})
            })
        }
    }
  }
</script>

<style scoped>
  .blog-container{
    background-color: #fff;
    width: 700px;
    margin: 20px auto;
    padding: 0 12px 12px;
  }
  .blog-header{
    text-align: center;
    margin: 10px 15px;
  }
  .blog-main{
    width: 640px;
    margin: 30px auto;
  }
</style>
