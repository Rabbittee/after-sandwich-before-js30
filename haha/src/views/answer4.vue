<template>
    <div class="flex mx-5 my-2" v-if="props.data.H_temp">
        <span class="mr-2">最高溫 {{ props.data.H_temp[0].temp }}</span>
        <span
            >發生時間:
            <span
                v-for="item in props.data.H_temp"
                :key="item.time"
                class="mx-1"
                >{{ item.time }}</span
            >
        </span>
    </div>
    <div class="flex mx-5 my-2" v-if="props.data.L_temp">
        <span class="mr-2">最低溫 {{ props.data.L_temp[0].temp }}</span>
        <span
            >發生時間:
            <span
                v-for="item in props.data.L_temp"
                :key="item.time"
                class="mx-1"
                >{{ item.time }}</span
            >
        </span>
    </div>
    <div class="flex mx-5 my-2">
        <span>最大單日溫差: {{ props.data.today_temp }}</span>
    </div>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    data: Object,
})
</script>
