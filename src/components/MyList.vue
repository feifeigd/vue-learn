<template>
    <ul>
        <!-- 暴露props.bookName给父组件 -->
        <slot name="book" v-for="book in books" :book-name="book.name">暂无数据！</slot>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
    components: {}
})
export default class MyList extends Vue{
    @Prop({ type: Array, default: () => [] })
    public readonly books!: [];
}
</script>
