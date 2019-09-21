import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);  // 加载Vuex插件

/// 导出store实例
export default new Vuex.Store({
  state: {
    info: {
      data: 'store data from store.ts'
    },
    auth: {},
    count: 0 // 计数器
  },
  /// 修改内部数据，mutation不要异步操作数据
  mutations: {
    /// 第一个参数state必选，第二个参数可选，可以是数字/字符串/对象等类型，可以带无限个参数
    increment(state, n = 1){
      state.count += n;
    },
    decrease(state){
      --state.count;
    }
  },
  /// 处理异步操作
  actions: {

  },
  getters: {
    info: (state) => state.info
  }
});
