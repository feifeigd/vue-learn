<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="onClick">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Component 修饰符注明了此类为一个 Vue 组件
@Component({
  components: {
    HelloWorld, // 引用到的组件
  },
})
export default class Home extends Vue {
  // 初始数据可以直接声明为实例的属性
  private message = 'Hello!';
  // 组件方法也可以直接声明为实例的方法
  private onClick() {
    window.alert(this.message);
  }
}
</script>
