import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);  // 加载Vuex插件

/// 导出store实例
export default new Vuex.Store({
  state: {
    auth: {},
    count: 0, // 计数器
    info: {
      data: 'store data from store.ts'
    },
    list: [ 1, 5, 8, 10, 30, 50, ],
  },
  /// 同步修改内部数据，mutation不要异步操作数据
  mutations: {
    /// 第一个参数state必选，第二个参数可选，可以是数字/字符串/对象等类型，可以带无限个参数
    increment(state, n = 1) {
      state.count += n;
    },
    decrease(state) {
      --state.count;
    }
  },
  /// 处理异步操作
  actions: {
    increment(context, n = 1) {
      context.commit('increment', n);  // 间接调用 mutation来实现
    },
    // 异步，context就是Vuex.Store实例
    asyncIncrement(context, n = 1) {
      return new Promise((resolve) => setTimeout(() => {
        // context.commit('increment', n); // 间接修改，结果存储起来
        context.state.count = n;  // 直接修改
        resolve();
      }, 3000));  // 模拟网络耗时3秒
    }
  },
  /// getter直接引用名字，即可取得返回值，不需要调用函数
  /// 例如组件使用 this.$state.getters.filteredList即可得到一个<10的数组
  getters: {
    filteredList: (state) => state.list.filter((item) => item < 10),
    info: (state) => state.info,
    // 依赖其他的getter则需要两个参数
    listCount: (state, getters) => getters.filteredList.length
  }
});
