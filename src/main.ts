import Vue from 'vue';
import App from './App.vue';
import router from './router';  // router 实例
import store from './store';  // store 实例
import './registerServiceWorker';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
