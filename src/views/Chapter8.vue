<template>
    <div>
        8.2.2 实时时间转换指令 v-time
        <div v-time="timeNow()"></div>
        <div v-time="timeBefore"></div>
    </div>
</template>

<script lang="ts">
import time from '../directive/time-directive';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({ directives: { time } })
export default class Chapter8 extends Vue{
    private timeBefore = 1488930695721;
    private timeNow(){
        return new Date().getTime();
    }
}
</script>
