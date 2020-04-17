import { request,getUrl,addComment,upload,publishShowshttp} from './http'

const api = {
    deleteOrder(data) {
        return request({
            methods: "POST",
            url: '/api/deleteOrder',
            params: data
        })
    },
    selectOrderList(data){
      return request({
        methods:"POST",
        url:'/api/orderList',
        params:data
      })
    },
   blogList(data){
     return request({
       methods: "POST",
       url: '/blog',
       params: data
       })
   },
  getHotblog(data){
    return request({
      methods: "GET",
      url: '/blog/hot',
      params: data
    })
  },
  getNewblog(data){
    return request({
      methods: "GET",
      url: '/blog/new',
      params: data
    })
  },
  getHotLabel(data){
    return request({
      methods: "GET",
      url: '/label',
      params: data
    })
  },
  getblogLists(data){
    return request({
      methods: "GET",
      url: '/blog/listArchives',
      params: data
    })
  },
  publishComment(data) {
    return addComment({
      url: '/comments/create/change',
      params: data
    })
  },
  viewArticle(url){
      return getUrl(url)
  },
  getCommentsByArticle(url){
      return getUrl(url)
  },
  searchLikeBlog(data) {
    return request({
      methods: "POST",
      url: '/blog/search',
      params: data
    })
  },
  getCategoryDetails(url) {
    return getUrl(url)
  },
  getTagDetails(url) {
    return getUrl(url)
  },
  getBlogCategoryById(url) {
    return getUrl(url)
  },
  getBlogLabelDetails(url) {
    return getUrl(url)
  },
  getCategoryAlls(data){
    return request({
      methods: "GET",
      url: '/categorys/detail',
      params: data
    })
  },
  getLabelList(data){
    return request({
      methods: "GET",
      url: '/label/detail',
      params: data
    })
  },
  getBlogPigeonhole(data){
    return request({
      methods: "GET",
      url: '/blog/listArchives',
      params: data
    })
  },
  // getArticleByIds(data){
  //   return request({
  //     methods: "GET",
  //     url: '/blog/${id}',
  //     params: data
  //   })
  // },
  getArticleByIds(url){
    return getUrl(url)
  },
  publishShows(data){
    return publishShowshttp({
      methods: "POST",
      url: '/blog/publish',
      params: data
    })
  },
  getAllCategorys(data){
    return request({
      methods: "GET",
      url: '/categorys',
      params: data
    })
  },
  getAllTags(data){
    return request({
      methods: "GET",
      url: '/label',
      params: data
    })
  },
  getCommentsByUserId(data){
      return request({
        methods:"GET",
        url:'/comments/userByid',
        params:data
      })
  },
  addComments(data){
    return publishShowshttp({
      methods:"POST",
      url:'/comments/create',
      params:data
    })
  },
  upload(data){
    return upload({
      url: '/upload',
      params: data
    })
  }
}

export default {
    api
}
