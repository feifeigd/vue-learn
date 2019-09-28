<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
    name: 'Redirect',
})
export default class Redirect extends Vue {
    private created(){
        const { params, query } = this.$route;
        const { path } = params;
        this.$router.replace({ path: '/' + path, query });
    }

    private render(){
        // Avoid
    }
}
</script>
