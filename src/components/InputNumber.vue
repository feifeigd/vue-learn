<template>
    <div class="input-number">
        <input type="text" :value="currentValue" @change="handleChange"/>
        <button @click="handleDown" :disabled="currentValue <= min">-</button>
        <button @click="handleUp" :disabled="currentValue >= max">+</button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
    components: {}
})
export default class InputNumber extends Vue {
    @Prop({ type: Number, default: -Infinity })
    private min!: number;
    @Prop({ type: Number, default: Infinity })
    private max!: number;
    @Prop({ type: Number, default: 0 })
    private value!: number;
    @Prop({ type: Number, default: 1 })
    private step!: number;  // 步长

    private currentValue: number = this.value;

    // https://www.npmjs.com/package/vue-property-decorator#Watch
    @Watch('currentValue')
    private onCurrentValueChanged(val: number){
        console.log('onCurrentValueChanged:val=' + val);
        this.$emit('input', val);
        this.$emit('on-change', val);
    }

    /// 父组件传来的val
    @Watch('value')
    private onValueChanged(val: number){
        console.log('onValueChanged:val=' + val);
        this.updateValue(val);
    }

    private updateValue(val: number){
        if (val < this.min){
            val = this.min;
        }
        if (val > this.max){
            val = this.max;
        }
        this.currentValue = val;
    }

    private mounted(){
        this.updateValue(this.value);
    }

    private handleChange(event: any){
        let val = event.target.value.trim();
        if (this.isValueNumber(val)){
            val = Number(val);
            this.updateValue(val);
        } else {
            event.target.value = this.currentValue;
        }
    }
    private isValueNumber(value: string){
        return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '');
    }
    private handleDown(){
        console.log('handleDown');
        if (this.currentValue <= this.min){
            return;
        }
        this.currentValue -= this.step;
    }
    private handleUp(){
        console.log('handleUp');
        if (this.currentValue >= this.max){
            return;
        }
        this.currentValue += this.step;
    }
}
</script>
