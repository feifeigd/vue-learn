<template>
    <div>
        9.2 什么是Render函数
        <Anchor :level="2" title="特性">特性</Anchor>
    </div>
</template>

<script lang="ts">
import Anchor from '../components/Anchor.vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    components: { Anchor }
})
export default class Chapter9 extends Vue{
}
</script>
