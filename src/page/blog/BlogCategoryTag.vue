<template>
  <div class="me-ct-body" v-title :data-title="title">
    <el-container class="me-ct-container">
      <el-main>
        <div class="me-ct-title me-area">
          <template v-if="this.$route.params.type === 'tag'">
            <img class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar"/>
            <h3 class="me-ct-name">{{ct.tagname}}</h3>
          </template>

          <template v-else>
            <div>
              <el-image class="me-ct-picture" :src="ct.avatar?ct.avatar:defaultAvatar">
                <div slot="placeholder" class="image-slot">
                  加载中<span class="dot">...</span>
                </div>
              </el-image>
              <span class="me-ct-name">{{ct.categoryname}}</span>
            </div>
            <p>{{ct.description}}</p>
          </template>

          <span class="me-ct-meta">{{ct.blogger}}篇 文章</span>
        </div>

        <div class="me-ct-articles">
          <article-scroll-page :query="query"></article-scroll-page>
        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import ArticleScrollPage from '@/page/common/ArticleScrollPage'
  // import {getArticlesByCategory, getArticlesByTag} from '@/api/article'
  // import {getTagDetail} from '@/api/tag'
  // import {getCategoryDetail} from '@/api/category'
  import defaultAvatar from '@/assets/images/blog/logo.png'


  export default {
    name: 'BlogCategoryTag',
    created() {
      this.getCategoryOrTagAndArticles()
    },
    watch: {
      '$route': 'getCategoryOrTagAndArticles'
    },
    data() {
      return {
        defaultAvatar: defaultAvatar,
        ct: {},
        // blogClass: [{
        //     query: {
        //         tagId: '',
        //         categoryId: ''
        //     }
        // }],
         query: {
             pageNumber: 1,
             pageSize: 5,
             name: 'a.createDate',
             sort: 'desc',
             tagId: 0,
             categoryId: 0
          }
      }
    },
    computed: {
      title() {
        if(this.$route.params.type === 'tag'){
          return `${this.ct.tagname} - 标签 - 码世界`
        }
        return `${this.ct.categoryname} - 文章分类 - 码世界`
      }
    },
    methods: {
      getCategoryOrTagAndArticles() {
          let that=this
        let id = that.$route.params.id
        let type = that.$route.params.type
        if ('tag' === type) {
            that.getTagDetail(id)
            that.query.tagId=id
            console.log(type)
            console.log(id)
          // this.getBlogByLabel(id)
        } else {
            that.getCategoryDetail(id)
            that.query.categoryId = id
            console.log(type)
            console.log(id)
          // this.getBlogByCategory(id)
        }

      },
      getCategoryDetail(id) {
        let that = this
        that.$api.api.getCategoryDetails("/categorys/detail/"+id).then(data => {
          that.ct = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '文章分类加载失败', showClose: true})
          }
        })
      },
      getTagDetail(id) {
        let that = this
          that.$api.api.getTagDetails("/label/detail/"+id).then(data => {
          that.ct = data.data
        }).catch(error => {
          if (error !== 'error') {
            that.$message({type: 'error', message: '标签加载失败', showClose: true})
          }
        })
      },

      // getBlogByCategory(id) {
      //   let that = this
      //   that.$api.api.getBlogCategoryById("/blog/category/"+id).then(data => {
      //     that.blog = data.data
      //   }).catch(error => {
      //     if (error !== 'error') {
      //       that.$message({type: 'error', message: '文章加载失败', showClose: true})
      //     }
      //   })
      // },
      // getBlogByLabel(id) {
      //   let that = this
      //   that.$api.api.getBlogLabelDetails("blog/tag/"+id).then(data => {
      //     that.blog = data.data
      //   }).catch(error => {
      //     if (error !== 'error') {
      //       that.$message({type: 'error', message: '文章加载失败', showClose: true})
      //     }
      //   })
      // }
    },
    components: {
      ArticleScrollPage
    }
  }
</script>

<style>
  .me-ct-body {
    margin: 10px auto 140px;
    min-width: 100%;
  }

  .el-main {
    padding: 0;
  }

  .me-ct-title {
    text-align: center;
    height: 150px;
    padding: 20px;
  }

  .me-ct-picture {
    width: 40px;
    height: 40px;
  }

  .me-ct-name {
    font-size: 28px;
    text-align: center;
  }

  .me-ct-meta {
    font-size: 12px;
    color: #969696;
  }

  .me-ct-articles {
    width: 640px;
    margin: 30px auto;
  }

</style>
