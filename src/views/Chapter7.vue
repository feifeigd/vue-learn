<template>
    <div id="app">
        7.4.4 作用域插槽
        <my-list :books="books"> <!-- 传给子组件props -->
            <template slot="book" slot-scope="props">
                {{props.bookName}}
            </template>
        </my-list>
    </div>
</template>

<script lang="ts">
import MyList from '../components/MyList.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: { MyList }  // 子组件
})
export default class Chapter7 extends Vue{
    public readonly books: object[] = [
        { name: '《Vue.js实战》' },
        { name: '《JavaScript语言精粹》' },
        { name: '《JavaScript高级程序设计》' },
    ];
}
</script>
