<template>
  <div id="pigeonholeList" v-title :data-title="title" style="margin-top: 30px;">
        <a-timeline mode="alternate" reverse="true"><!--reverse="true" 内排名表npm倒序-->
          <a-timeline-item color="green" v-for="(items,index) in archives" :key="index">
            <el-link :underline="false" target="_blank" class="category-link"
                     @click="changeArchive(items.year,items.month)">
              {{items.year}}年{{items.month}}月
            </el-link>
            <div>{{items.count}} 篇文章</div>
          </a-timeline-item>
        </a-timeline>
  </div>
</template>
<script>
    import ArticleScrollPage from '@/page/common/ArticleScrollPage'
    const theme = 'red';
    export default {
        name: "PigeonholeList",
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
                archives: [{
                    color: '#000000',
                    type: 'circle',
                }],
            }
        },
        computed: {
            title (){
                return this.currentArchive + ' - 文章归档 -'
            },
            currentArchive (){
                if(this.article.query.year && this.article.query.month){
                    return `${this.article.query.year}年${this.article.query.month}月`
                }
                return '全部'
            },
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

</style>

