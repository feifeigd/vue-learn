<template>
    <div>
        9.2 什么是Render函数
        <Anchor :level="2" title="特性">特性</Anchor>
        9.6 可排序的表格组件
        <v-table :columns="columns" :data="data"></v-table>
        <button @click="handleAddData">添加数据</button>
    </div>
</template>

<script lang="ts">
import Anchor from '../components/Anchor.vue';
import vTable from '../components/vTable.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: { Anchor, vTable }
})
export default class Chapter9 extends Vue{
    private columns = [
        { title: '姓名', key: 'name' },
        { title: '年龄', key: 'age', sortable: true },
        { title: '出生日期', key: 'birthday', sortable: true },
        { title: '地址', key: 'address' },
    ];
    private data = [
        { name: '王小明', age: 18, birthday: '1999-02-21', address: '北京市朝阳区芍药房', },
        { name: '张小钢', age: 25, birthday: '1992-01-23', address: '北京市海定区西二旗', },
        { name: '李小红', age: 30, birthday: '1987-11-10', address: '上海市浦东新区世纪大道', },
        { name: '周小伟', age: 26, birthday: '1991-10-10', address: '深圳市南山区深南大道', },
    ];

    private handleAddData(){
        this.data.push({ name: '刘孝天', age: 19, birthday: '1998-05-30', address: '北京市东城区东直门' });
    }
}
</script>
