<template>
    <div class="pane" v-show="show">
        <slot/>
    </div>
</template>

<script lang="ts">
import Tabs from './Tabs.vue';
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
    components: {},
    name: 'pane',
})
export default class Pane extends Vue {
    public show: boolean = true;

    @Prop()
    public name!: string | number;

    @Prop({ default: '' })
    public readonly label!: string;

    private updateNav(){
        const tab = this.$parent as Tabs;
        tab.updateNav();
    }

    @Watch('label')
    private onLabelChanged(){
        this.updateNav();
    }
    private mounted(){
        this.updateNav();
    }
}
</script>
