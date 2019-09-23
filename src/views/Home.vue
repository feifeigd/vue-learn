<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" @click="onClick">{{message}} {{computedMsg}}
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
  // data
  // 初始数据可以直接声明为实例的属性
  private message = 'Hello!';

  // methods
  // 组件方法也可以直接声明为实例的方法
  private onClick () {
    window.alert(this.message);
  }

  // computed
  get computedMsg () {
    return 'computed ' + this.message;
  }
  // 生命周期
  private mounted () {
    //
  }
}
</script>
