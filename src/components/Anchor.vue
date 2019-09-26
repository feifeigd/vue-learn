
<script lang="ts">
import { CreateElement, VNode } from 'vue';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
})
export default class Anchor extends Vue {
    @Prop()
    private title!: string;
    @Prop()
    private level!: string;

    private render(createElement: CreateElement): VNode{
        return createElement('h' + this.level, [
            createElement('a', {
                // DOM 属性
                domProps: {
                    href: '#' + this.title
                }
            },
            this.$slots.default),
        ]);
    }
}
</script>
