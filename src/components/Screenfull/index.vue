<template>
    <div id="screenfull">
        <svg-icon :name="isFullscreen? 'exit-fullscreen' : 'fullscreen'" @click="click"/>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import screenfull from 'screenfull';

const sf = screenfull;

@Component
export default class Screenfull extends Vue {
    private isFullscreen = false;

    mounted(){
        if (sf && sf.isEnabled){
            sf.on('change', this.change);
        }
    }

    beforeDestory(){
        if (sf && sf.isEnabled){
            sf.off('change', this.change);
        }
    }

    private change(){
        if (sf && sf.isEnabled){
            this.isFullscreen = sf.isFullscreen;
        }
    }

    private click(){
        if (sf){
            if(!sf.isEnabled){
                this.$message({
                    message: 'you browser cannot work',
                    type: 'warning',
                });
                return false;
            }
            sf.toggle();
        }
    }
}
</script>
