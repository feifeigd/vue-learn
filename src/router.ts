import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import User from './views/User.vue';

Vue.use(Router);  // 加载Router插件

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: '首页'
    },
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
  },
  {
    path: '/chapter7',
    name: '第七章',
    component: () => import(/* webpackChunkName: "chapter7" */ './views/Chapter7.vue'),
  },
  {
    path: '/chapter8',
    name: '第八章',
    component: () => import(/* webpackChunkName: "chapter8" */ './views/Chapter8.vue'),
  },
  {
    path: '/user',
    component: User,
  },
  // 当访问的路径不存在时，重定向到首页
  {
    path: '*',
    redirect: '/'
  }
];

/// 导出路由实例
export default new Router({
  mode: 'history',  // 使用H5的History路由模式
  base: process.env.BASE_URL,
  /// 每一个路由映射一个组件
  routes,
});
