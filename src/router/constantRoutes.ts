import {RouteConfig} from 'vue-router';

// Layout
import Layout from '@/layout/index.vue';


// 无须验证权限的路由
// RouteConfig 是 vue-router里面的interface
const constantRoutes: RouteConfig[] = [
    {
        path: '/redirect',
        component: Layout,
        meta: { hidden: true, },
        children: [
            {
                path: '/redirect/:path*',
                component: () => import(/* webpackChunkName: "redirect" */ '@/views/redirect/index.vue'),
            }
        ]
    },
    {
        path: '/login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
        meta: { hidden: true }
    },
    {
        path: '/auth-redirect',
        component: () => import(/* webpackChunkName: "auth-redirect" */ '@/views/login/auth-redirect.vue'),
        meta: { hidden: true }
    },
    {
      path: '/404',
      component: () => import(/* webpackChunkName: "404" */ '@/views/error-page/404.vue'),
      meta: { hidden: true }
    },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import(/* webpackChunkName: "dashboard" */ '@/views/dashboard/index.vue'),
                meta: {
                    title: 'dashboard',
                    icon: 'dashboard',
                    affix: true,
                },
            }
        ],
    },
    // {
    //   path: '/documentation',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'index',
    //       component: () => import(/* webpackChunkName: "documentation" */ '@/views/documentation/index.vue'),
    //       name: 'Documentation',
    //       meta: { title: 'documentation', icon: 'documentation', affix: true }
    //     }
    //   ]
    // },
    {
        path: '/guide',
        component: Layout,
        redirect: '/guide/index',
        children: [
            {
                path: 'index',
                component: ()=> import(/* webpackChunkName: "guilde" */ '@/views/guide/index.vue'),
                name: 'Guide',
                meta: {
                    title: 'guide',
                    icon: 'guide',
                    noCache: true,
                }
            }
        ]
    },
    {
        path: 'profile',
        component: Layout,
        redirect: '/profile/index',
        meta: {
            hidden: true,
        },
        children: [
            {
                path: 'index',
                component: ()=> import(/* webpackChunkName: "profile" */ '@/views/profile/index.vue'),
                name: 'Profile',
                meta: {
                    title: 'profile',
                    icon: 'user',
                    noCache: true,
                }
            }
        ]
    }
];

export default constantRoutes;
