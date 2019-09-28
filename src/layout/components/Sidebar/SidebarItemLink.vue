<template>
    <!-- 外部链接 -->
    <a v-if="isExternam(to)" :href="to" target="_blank" rel="noopener">
        <slot/>
    </a>
    <router-link v-else :to="to">
        <slot/>
    </router-link>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import { isExternal } from '@/utils/validate';

@Component({
    name: 'SidebarItemLink',
})
export default class SidebarItemLink extends Vue {
    @Prop({ required: true })
    private to!: string;

    private isExternal = isExternal;
}
</script>
