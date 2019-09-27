import Vue, { DirectiveOptions } from 'vue';

import 'normalize.css';
import App from './App.vue';
import router from './router';  // router 实例
import store from './store/store';  // store 实例
import './registerServiceWorker';

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
  render: (h) => h(App),
}).$mount('#app');  // 手动挂载实例
