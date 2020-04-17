import Vue from 'vue'
import Router from 'vue-router'
// import layout from '../layout/layout'
import Cookies from "js-cookie";
import HomeTemplate from '../components/HomeTemplate'
Vue.use(Router)

const vueRouter = new Router({
 // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: {
        name: 'index'
      },
      meta: { title: '首页', show: false }
    },
    {
      path: '',
      name: '/home',
      component: HomeTemplate,
      children:[{
        name: 'index',
        path: '/index',
        //component: r => require.ensure([], () => r(require('@/page/Index')), 'index'),
        component: () => import('@/page/Index'),
        meta: { title: '首页', show: true, icon: 'el-icon-wallet' }
      },
        {
          path: '/course',
          name: 'Course',
          component: () => import('@/components/CourseList'),
          meta: { title: '技术实验室', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/order',
          name: 'Order',
          component: () => import('@/components/OrderList'),
          meta: { title: '订单', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/course/:courseNo',
          name: 'CourseNo',
          component: () => import('@/components/Course'),
          meta: { title: '技术实验室详情', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/label',
          name: 'Label',
          component: () => import('@/page/LabelList'),
          meta: { title: '标签', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/pigeonhole',
          name: 'Pigeonhole',
          component: () => import('@/page/PigeonholeList'),
          meta: { title: '博客归档', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/leaveWord',
          name: 'LeaveWord',
          component: () => import('@/page/LeaveWordList'),
          meta: { title: '留言板', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/classify',
          name: 'Classify',
          component: () => import('@/page/Classify'),
          meta: { title: '博客分类', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/register',
          name: 'Register',
          component: () => import('@/components/Register'),
          meta: { title: '注册', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/write/:id?',
          name: 'BlogWrite',
          component: () => import('@/page/blog/BlogWrite'),
          meta: { title: '写文章', show: true, icon: 'el-icon-s-home' }
        },
        {
          path: '/view/:id',
          name: 'blogView',
          component: () => import('@/page/blog/BlogView'),
          meta: { title: '博客详情', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/:type/:id',
          name: 'tagById',
          component: () => import('@/page/blog/BlogCategoryTag'),
          meta: { title: '标签详情', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/pigeonhole/:year?/:month?',
          name: 'pigeonhole',
          component: () => import('@/page/blog/BlogArchive'),
          meta: { title: '文章归档详情', show: true, icon: 'el-icon-wallet' }
        },
        {
          path: '/box',
          name: 'Box',
          component: () => import('@/page/test/box'),
          meta: { title: '测试', show: true, icon: 'el-icon-s-home' }
        },
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: () => import('@/components/Login'),
      meta: { title: '登录', show: true, icon: 'el-icon-s-home' }
    },
  ]
});
export default vueRouter
