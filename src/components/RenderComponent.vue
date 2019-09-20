
<script lang="tsx">
import { Vue, Component } from 'vue-property-decorator';

@Component
export default class FilterItem extends Vue {
    private render (h: any, context: any) {
        return (<div>这条是jsx</div>);
    }
}
</script>
