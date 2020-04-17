<template>
  <div id="index">
    <div class="demo-image__placeholder" style="position: relative">
      <div class="block">
        <el-image class="image-size" :src="src">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
      </div>
      <span class="outer-layer" style="width: 400px;">
       <el-input
         v-model="input"
         placeholder="搜索文章  -- Enter 确定"
         suffix-icon="el-icon-search"
         class="sou-input"
         v-on:keyup.13.native="search(input)"
         >
       </el-input>
      </span>
    </div>

    <el-container class="central">

      <el-main class="me-articles">
        <article-scroll-page :blog="blog"></article-scroll-page>
      </el-main>

      <el-aside>
        <card-me class="me-area"></card-me>
        <card-tag :tags="hotTags"></card-tag>
        <card-article cardHeader="最热文章" :articles="hotArticles"></card-article>
        <card-archive cardHeader="文章归档" :archives="archives"></card-archive>
        <card-article cardHeader="最新文章" :articles="newArticles"></card-article>
      </el-aside>

    </el-container>
  </div>
</template>

<script>
    import ArticleScrollPage from '@/page/common/ArticleScrollPage'
    import CardMe from '@/page/card/CardMe'
    import CardArticle from '@/page/card/CardArticle'
    import CardArchive from '@/page/card/CardArchive'
    import CardTag from '@/page/card/CardTag'
    export default {
        name: "Index",
        data(){
            return{
                msg:"正在建设中···········",
                src:"https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
                hotTags: [],
                hotArticles: [],
                newArticles: [],
                archives: [],
                input: '',
                blog:[]
            }
        },
        created() {
            this.getHotblog()
            this.getNewblog()
            this.getHotLabel()
            this.getblogLists()
        },
        methods:{
            search(title){
                let self=this;
                console.log(title)
                self.$api.api.searchLikeBlog({title:title}).then(res=>{
                   console.log(res.data)
                   self.blog=res.data
                })
            },
            getHotblog() {
                let that = this
                that.$api.api.getHotblog().then(data => {
                    that.hotArticles = data.data
                }).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '最热文章加载失败!', showClose: true})
                    }

                })

            },
            getNewblog() {
                let that = this
                that.$api.api.getNewblog().then(data => {
                    that.newArticles = data.data
                }).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '最新文章加载失败!', showClose: true})
                    }

                })

            },
            getHotLabel() {
                let that = this
                that.$api.api.getHotLabel().then(data => {
                    that.hotTags = data.data
                }).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '最热标签加载失败!', showClose: true})
                    }

                })
            },
            getblogLists() {
                let that = this
                that.$api.api.getblogLists().then((data => {
                    this.archives = data.data
                })).catch(error => {
                    if (error !== 'error') {
                        that.$message({type: 'error', message: '文章归档加载失败!', showClose: true})
                    }
                })
            }
        },
        components: {
            CardArchive,
            ArticleScrollPage,
            'card-me': CardMe,
            'card-article': CardArticle,
            'card-tag': CardTag,
        }
    }
</script>

<style scoped>
  .image-size{
    width: 100%;
    height: 300px;
  }
  .outer-layer{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
  }
  .sou-input{
    border-radius: 20px;
    overflow: hidden;
    /*z-index: 1;*/
    opacity:0.9;
  }
  .central{

  }
</style>
