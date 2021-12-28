<template>{{ state.data }}</template>
<script setup>
import { reactive } from 'vue'
import fetchData from '../utils/fetchApi.js'
import { validWeather, min, findArrIdx, formatData } from '../utils/methods.js'

const state = reactive({
    data: {},
})

fetchData('O-A0001-001').then((res) => {
    const elevIdx = findArrIdx(
        res.records.location[0].weatherElement,
        'ELEV',
        'weather'
    )
    const elevMap = new Map()
    validWeather(res.records.location).forEach((el) => {
        const index = parseInt(el.weatherElement[elevIdx].elementValue / 500)
        if (!elevMap.get(index)) elevMap.set(index, [])
        elevMap.get(index).push(el)
    })
    for (const group of elevMap.keys()) {
        formatFunc(min(elevMap.get(group), 'TEMP'), group)
    }
})

function formatFunc(obj, index) {
    const { city, town, temp } = formatData(obj)
    const { locationName, lat, lon } = obj
    state.data[(index + 1) * 500] = { city, town, temp, locationName, lat, lon }
}
</script>
