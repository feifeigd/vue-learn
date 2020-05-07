import Vue from 'vue';
import Router, { RouteConfig } from 'vue-router';
import constantRoutes  from './constantRoutes';

export {constantRoutes, }

// Layout
import Layout from '@/layout/index.vue';

// Router modules
// TODO

Vue.use(Router);  // 加载Router插件

/*
    Note: sub-menu only appear when children.length >= 1
    Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
*/

/*
    name: 'route-name'              the name field is required when using <keep-alive>, it should also match its component's name property
                                    detail see: https://vuejs.org/v2/guide/components-dynamic-async.html#keep-alive-with-Dynamic-Components
    redirect:                       if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
    meta: {
        roles: ['admin', 'editor',] will control the page roles (allow setting multiple roles)
        title: 'title'              the name showed in subMenu and breadcrumb (recommend set)
        icon: 'svg-name'            the icon showed in the sidebar
        hidden: true                if true, this route will not show in the sidebar (default is false)
        alwaysShow: true            if true, will always show the root menu (default is false)
                                    if false, hide the root menu when has less or equal than one children route
        breadcrumb: false           if false, the item will be hidden in breadcrumb (default is true)
        noCache: true               if true, the page will not be cached (default is false)
        affix: true                 if true, the tag will affix in the tags-view
        activeMenu: '/example/list' if set path, the sidebar will highlight the path you set
    }
*/



// asyncRoutes
// the routes that need to be dynamically loaded based on user roles
export const asyncRoutes: RouteConfig[] = [
    // TODO
];

const createRouter = () => new Router({
    mode: 'history',  // 使用H5的History路由模式
    base: process.env.BASE_URL,
    /// 每一个路由映射一个组件
    routes: constantRoutes,
    scrollBehavior: (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        }
        return { x: 0, y: 0, };
    }
});

/// 导出路由实例
const router = createRouter();

// Detail: see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter();
    (router as any).matcher = (newRouter as any).matcher; // reset router
}

export default router;
