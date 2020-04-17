<template>
  <scroll-page :loading="loading" :offset="offset" :no-data="noData" v-on:load="load">
    <article-item v-for="a in articles" :key="a.id" v-bind="a"></article-item>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage3"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="10">
    </el-pagination>
  </scroll-page>
</template>

<script>
  import ArticleItem from '@/components/article/ArticleItem'
  import ScrollPage from '@/components/scrollpage'

  export default {
    name: "ArticleScrollPage",
    props: {
      offset: {
        type: Number,
        default: 100
      },
      blog:{
          type: Array,
          default() {//当blog没有值时默认空数组[]，要是object对象则{}
              return []
          }
      },
      page: {
        type: Object,
        default() {
          return {}
        }
      },
      query: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      // 'query': {
      //   handler() {
      //     this.noData = false
      //     this.articles = []
      //     this.innerPages = this.query
      //       console.log(0)
      //     this.getArticles()
      //   },
      //   deep: true,
      //
      // },
      'page': {
        handler() {
          this.noData = false
          this.articles = []
          this.innerPages = this.page
          this.getArticles()
        },
        deep: true,
      },
      'blog':{
          handler() {
              this.articles=this.blog
          },
          deep: true,
        }
    },
    created() {
      if (Object.keys(this.query).length!==0){
          this.innerPages = this.query
          this.getArticles()
          console.log(1)
      }else {
          this.getArticles()
          console.log(2)
      }
    },
    data() {
        return {
            currentPage3:1,
            loading: false,
            noData: false,//加载转圈圈事件。默认false不转，true  转圈圈····
            innerPages: {
                pageNumber: 1,
                pageSize: 5,
                name: 'a.createDate',
                sort: 'desc',
            },
            articles: []
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
      load() {
        this.getArticles()
        console.log(3)
      },
      view(id) {
        this.$router.push({path: `/view/${id}`})
      },
      getArticles() {
          let that = this
          that.loading = true
          that.$api.api.blogList(that.innerPages).then(res => {
              let newArticles = res.data
              console.log(newArticles)
              if (newArticles && newArticles.length > 0) {
                  that.innerPages.pageNumber += 1
                  that.articles = that.articles.concat(newArticles)
              } else {
                  that.noData = true
              }
          }).catch(error => {
              if (error !== 'error') {
                  that.$message({type: 'error', message: '文章加载失败!', showClose: true})
              }
          }).finally(() => {
              that.loading = false
          })

      }
    },
    components: {
      'article-item': ArticleItem,
      'scroll-page': ScrollPage
    }

  }
</script>

<style scoped>
  .el-card {
    border-radius: 0;
  }

  .el-card:not(:first-child) {
    margin-top: 6px;
  }
</style>
