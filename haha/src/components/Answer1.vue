<template>{{ state.data }}</template>
<script setup>
import { reactive } from 'vue'
import fetchData from '../utils/fetchApi.js'
import { validWeather, min, formatData } from '../utils/methods.js'

const state = reactive({
    data: {},
})

fetchData('O-A0001-001').then((res) => {
    const data = min(validWeather(res.records.location), 'TEMP')
    const { city, town, temp } = formatData(data)
    const { locationName, lat, lon } = min(
        validWeather(res.records.location),
        'TEMP'
    )
    state.data = { city, locationName, town, lat, lon, temp }
})
</script>
