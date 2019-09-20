<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="goHome">跳转到首页</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class About extends Vue {
  private goHome() {
    this.$router.push('/');
  }
}
</script>
