<template>
    <div id="app">
        7.4.4 作用域插槽
        <my-list :books="books"> <!-- 传给子组件props -->
            <template slot="book" slot-scope="props">
                {{props.bookName}}
            </template>
        </my-list>
        7.5.1 递归组件
        <RecursiveCount :count="1">顶级</RecursiveCount>
        7.5.4 异步组件
        <AsynchronousCom/>
        7.7.1 数字输入框组件{{value}}
        <InputNumber v-model="value" :min="0" :max="10" :step="2"/>
    </div>
</template>

<script lang="ts">
import AsynchronousCom from '../components/AsynchronousCom.vue';
import InputNumber from '../components/InputNumber.vue';
import MyList from '../components/MyList.vue';
import RecursiveCount from '../components/RecursiveCount.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: { AsynchronousCom, InputNumber, MyList, RecursiveCount }  // 子组件
})
export default class Chapter7 extends Vue{
    private value = 5;
    private readonly books: object[] = [
        { name: '《Vue.js实战》' },
        { name: '《JavaScript语言精粹》' },
        { name: '《JavaScript高级程序设计》' },
    ];
}
</script>
