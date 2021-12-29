<template>
    <template v-for="(cityGroup, city) in state.data" :key="city">
        <div class="text-2xl">{{ city }}</div>
        <div v-for="(townGroup, town) in cityGroup" :key="town" class="ml-24">
            <div class="text-xl">{{ town }}:</div>
            <div
                v-for="location in townGroup"
                :key="location.name"
                class="flex space-x-10 ml-20"
            >
                <div>{{ location.name }}</div>
                <div>{{ location.rain }}</div>
            </div>
        </div></template
    >
</template>
<script setup>
import { reactive } from 'vue'
import { findArrIdx } from '../utils/methods.js'
import fetchData from '../utils/fetchApi.js'

const state = reactive({
    data: {},
})

fetchData('O-A0002-001').then((res) => {
    const rainMap = new Map()
    const rainIdx = findArrIdx(
        res.records.location[0].weatherElement,
        'HOUR_24',
        'weather'
    )
    const data = res.records.location
        .sort(
            (a, b) =>
                b.weatherElement[rainIdx].elementValue -
                a.weatherElement[rainIdx].elementValue
        )
        .slice(0, 20)
    data.forEach((el) => {
        const { city, town, rain, name } = returnData(
            el,
            findArrIdx(data[0].parameter, 'CITY'),
            findArrIdx(data[0].parameter, 'TOWN'),
            rainIdx
        )
        if (!rainMap.get(city)) {
            rainMap.set(city, new Map())
            rainMap.get(city).set(town, [])
            rainMap.get(city).get(town).push({ name, rain })
        } else {
            if (!rainMap.get(city).get(town)) {
                rainMap.get(city).set(town, [])
                rainMap.get(city).get(town).push({ name, rain })
            } else rainMap.get(city).get(town).push({ name, rain })
        }
    })
    for (const group of rainMap.keys()) {
        state.data[group] = {}
        for (const townGroup of rainMap.get(group)) {
            state.data[group][townGroup[0]] = townGroup[1]
        }
    }
})

function returnData(obj, cityIdx, townIdx, rainIdx) {
    const city = obj.parameter[cityIdx].parameterValue
    const town = obj.parameter[townIdx].parameterValue
    const rain = obj.weatherElement[rainIdx].elementValue
    const name = obj.locationName
    return { city, town, rain, name }
}
</script>
