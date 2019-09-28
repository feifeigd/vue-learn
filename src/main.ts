import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';
import ElementUI from 'element-ui';
import VueSvgIcon from 'vue-svgicon';
import '@/styles/index.scss';

import App from './App.vue';
import { AppModule } from '@/store/modules/app';
import i18n from './lang';
import router from './router';  // router 实例
import store from './store/store';  // store 实例

// import '@/icons/comments';
// import '@/permission';
// import '@/utils/error-log';
// import '@/pwa/register-service-worker';
import * as directives from '@/directives';
import * as filters from '@/filters';

import './registerServiceWorker';

Vue.use(ElementUI, {
  size: AppModule.size, // Set element-ui default size
  i18n: (key: string, value: string) => i18n.t(key, value),
});

Vue.use(VueSvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

// Register global directives
Object.keys(directives).forEach((key) => Vue.directive(key, (directives as { [key: string]: DirectiveOptions })[key]));
// Register global filter functions
Object.keys(filters).forEach((key) => Vue.filter(key, (filters as { [key: string]: (value: any) => string})[key]));

Vue.config.productionTip = false;

/// 统一切换标题
router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title || '标题未配置';
  next();
});

/// 切换到新页面之后，滚到顶端
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');  // 手动挂载实例
