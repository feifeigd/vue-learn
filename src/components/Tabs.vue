<template>
    <div class="tabs">
        <div class="tabs-bar">
            <!-- 标签页标题，这里要用v-for -->
            <div :class="tabCls(item)" v-for="(item, index) in navList" @click="handleChange(index)" :key="index">{{item.label}}</div>
        </div>
        <div class="tabs-content">
            <!-- 这里的slot就是嵌套的pane -->
            <slot/>
        </div>
    </div>
</template>

<script lang="ts">
import NavData from '../ts/NavData';
import Pane from './Pane.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
    components: {}
})
export default class Tabs extends Vue{
    private navList: NavData[] = [];
    private currentValue: string | number = '';
    private value!: string;
    public updateNav(){
        this.navList = [];
        this.getTabs().forEach((pane, index) => {
            if (!pane.name){
                pane.name = index;
            }
            this.navList.push({ label: pane.label, name: pane.name });
            if (index === 0 && !this.currentValue){
                this.currentValue = pane.name;
            }
        });
        this.updateStatus();
    }
    private getTabs(): Pane[]{
        return this.$children.filter((item) => item.$options.name === 'pane') as Pane[];
    }

    private updateStatus(){
        const tabs = this.getTabs();
        tabs.forEach((tab) => {
            return tab.show = tab.name === this.currentValue;
        });
    }
    private tabCls(item: NavData){
        return ['tabs-tab', { 'tabs-tab-active': item.name === this.currentValue }];
    }
    private handleChange(index: number){
        const nav = this.navList[index];
        const name = nav.name;
        this.currentValue = name;
        this.$emit('input', name);
        this.$emit('on-click', name);   // 触发一个自定义事件，供父级使用
    }

    @Watch('value')
    private onValueChanged(val: string){
        this.currentValue = val;
    }
    @Watch('currentValue')
    private onCurrentValueChanged(){
        this.updateStatus();
    }
}
</script>

<style>
.tabs{
    font-size: 24px;
    color: #657180;
}
.tabs-bar:after{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background-color: #d7dde4;
    margin-top: -1px;
}
.tabs-tab{
    display: inline-block;
    padding: 4px 16px;
    margin-right: 6px;
    background-color: #fff;
    border: 1px solid #d7dde4;
    cursor: pointer;
    position: relative;
}
.tabs-tab-active{
    color: #3399ff;
    border-top: 1px solid #3399ff;
    border-bottom: 1px solid #fff;
}
.tabs-tab-active:before{
    content: '';
    display: block;
    height: 1px;
    background-color: #3399ff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
.tab-content{
    padding: 8px 0;
}
</style>
