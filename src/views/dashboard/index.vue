<template>
    <div class="dashboard-container">
        <component :is="currentRole"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { UserModule } from '../../store/modules/user';
import AdminDashboard from './admin/index.vue';
import EditorDashboard from './editor/index.vue';

@Component({
    components: {
        AdminDashboard,
        EditorDashboard,
    }
})
export default class Dashboard extends Vue {
    private currentRole = 'admin-dashboard';

    get roles(){
        return UserModule.roles;
    }

    created(){
        if (!this.roles.includes('admin')) {
            this.currentRole = 'editor-dashboard';
        }
    }
}
</script>
