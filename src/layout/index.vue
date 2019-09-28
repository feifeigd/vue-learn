<template>
    <div :class="classObj" class="app-wrapper">
        <div v-if="classObj.mobile && sidebar.opened" class="drawer-bg"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator';
import ResizeMixin from './mixin/resize';
import { DeviceType } from '../store/modules/app';

@Component({
    name: 'Layout',
})
export default class extends Mixins(ResizeMixin) {
    get classObj(){
        return {
            hideSidebar: !this.sidebar.opened,  // ResizeMixin 里定义
            openSidebar: this.sidebar.opened,
            widthoutAnimation: this.sidebar.withoutAnimation,
            mobile: this.device === DeviceType.Mobile,
        }
    }
}
</script>
<style lang="scss" scoped>
.app-wrapper{
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
}
.drawer-bg{
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
}
</style>
