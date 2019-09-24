<template>
    <div class="child">
        <slot/>
        <child-component :count="count + 1" v-if="count < 3">上级{{count}}</child-component><!-- name 选项递归调用自身 -->
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

/// 组件的选项，写这里
@Component({
    name: 'child-component' // 要用name选项才能递归
})
export default class RecursiveCount extends Vue {
    @Prop({ default: 1 })
    private count!: number;
}
</script>
