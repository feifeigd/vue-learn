<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里，根据当前路由动态渲染不同的页面组件 -->
    <router-view/>
    <service-worker-update-popup/>
  </div>
</template>

<script lang="ts">
import ServiceWorkerUpdatePopup from '@/pwa/components/ServiceWorkerUpdatePopup.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  name: 'App',
  components: { ServiceWorkerUpdatePopup, },
})
export default class App extends Vue {
}
</script>
<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
