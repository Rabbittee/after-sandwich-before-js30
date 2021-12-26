<template>
    <template v-for="city in props.data" :key="city.city">
        <template v-for="town in city.town" :key="town.town">
            <template v-for="location in town.location" :key="location.elName">
                <div class="w-full h-auto bg-red-400 border-4">
                    <div>城市: {{ city.city }}</div>
                    <div>鄉鎮: {{ town.town }}</div>
                    <div>測站: {{ location.elName }}</div>
                    <div>溫度: {{ location.elVal }}</div>
                </div>
            </template>
        </template>
    </template>
</template>
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    data: Object,
})
</script>
