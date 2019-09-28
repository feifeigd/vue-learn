<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ServiceWorkerUpdatePopup extends Vue {
    private refreshing = false;

    private render(){
        // Avoid warning for missing template
    }
}
</script>
