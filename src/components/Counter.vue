<template>
    <div>
        <h1>计数器</h1>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleIncrementMore">+5</button>
        <button @click="handleIncrementAsync">+8</button>
        <button @click="handleDecrease">-1</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Counter extends Vue {
    /// 加上get才会变成 computed
    private get count() {
        return this.$store.state.count;
    }
    private handleIncrement() {
        // this.$store.commit('increment');    // 同步修改用 commit， 异步用 dispatch
        this.$store.dispatch('increment');   // 异步
    }
    private handleIncrementAsync() {
        // this.$store.commit('increment');    // 同步修改用 commit， 异步用 dispatch
        console.log('asyncIncrement');
        this.$store.dispatch('asyncIncrement', 8).then(() => console.log('异步结果=' + this.$store.state.count));   // 异步
    }
    private handleIncrementMore() {
        // 第一个参数是mutation的名字，第二个参数是mutation的第二个参数，可以带无限个参数，mutation的第一个参数固定为state
        this.$store.commit('increment', 5);
    }
    private handleDecrease() {
        this.$store.commit('decrease');
    }
}
</script>
