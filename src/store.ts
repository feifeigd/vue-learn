import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info: {
      data: 'store data from store.ts'
    },
    auth: {}
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    info: (state) => state.info
  }
});
