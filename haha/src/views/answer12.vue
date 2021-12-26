<template>
    <template v-for="(item, index) in props.data" :key="index">
        <div class="w-full h-auto bg-red-400 border-4">
            <div>{{ item.title }}</div>
            <div>城市: {{ item.city }}</div>
            <div>地區: {{ item.town }}</div>
            <div>測站: {{ item.name }}</div>
            <div>溫度: {{ item.temp }}</div>
            <div>座標: {{ item.location }}</div>
        </div>
    </template>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    data: Object,
})
</script>
