<template>
    <div>
        <h1>计数器</h1>
        {{count}}
        <button @click="handleIncrement">+1</button>
        <button @click="handleIncrementMore">+5</button>
        <button @click="handleDecrease">-1</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class Counter extends Vue {
    /// 加上get才会变成 computed
    private get count(){
        return this.$store.state.count;
    }
    private handleIncrement(){
        this.$store.commit('increment');
    }
    private handleIncrementMore(){
        // 第一个参数是mutation的名字，第二个参数是mutation的第二个参数，可以带无限个参数，mutation的第一个参数固定为state
        this.$store.commit('increment', 5);
    }
    private handleDecrease(){
        this.$store.commit('decrease');
    }
}
</script>
