<template>
    <template
        v-if="props.id === 2 || props.id === 1"
        v-for="(item, index) in state.data.value"
        :key="index"
    >
        <div class="w-full h-auto bg-red-400 border-4">
            <div>{{ item.title }}</div>
            <div>城市: {{ item.city }}</div>
            <div>地區: {{ item.town }}</div>
            <div>測站: {{ item.name }}</div>
            <div>溫度: {{ item.temp }}</div>
            <div>座標: {{ item.location }}</div>
        </div></template
    >
    <template
        v-else-if="props.id === 3"
        v-for="(city, cityIdx) in state.data.value"
        :key="cityIdx"
    >
        <template v-for="(town, townIdx) in city.town" :key="townIdx">
            <template
                v-for="(location, locationIdx) in town.location"
                :key="locationIdx"
            >
                <div class="w-full h-auto bg-red-400 border-4">
                    <div>城市: {{ city.city }}</div>
                    <div>鄉鎮: {{ town.town }}</div>
                    <div>測站: {{ location.elName }}</div>
                    <div>溫度: {{ location.elVal }}</div>
                </div>
            </template>
        </template>
    </template>
    <template v-else>
        <div v-if="state.data.value.H_temp" class="flex mx-5 my-2">
            <span class="mr-2"
                >最高溫 {{ state.data.value.H_temp[0].temp }}</span
            >
            <span
                >發生時間:
                <span
                    v-for="(item, index) in state.data.value.H_temp"
                    :key="index"
                    class="mx-1"
                    >{{ item.time }}</span
                >
            </span>
        </div>
        <div v-if="state.data.value.L_temp" class="flex mx-5 my-2">
            <span class="mr-2"
                >最低溫 {{ state.data.value.L_temp[0].temp }}</span
            >
            <span
                >發生時間:
                <span
                    v-for="(item, index) in state.data.value.L_temp"
                    :key="index"
                    class="mx-1"
                    >{{ item.time }}</span
                >
            </span>
        </div>
        <div class="flex mx-5 my-2">
            <span>最大單日溫差: {{ state.data.value.today_temp }}</span>
        </div>
    </template>
</template>
<script setup>
import { defineProps, ref } from '@vue/runtime-core'
import {
    token,
    host,
    paramsObj,
    lastOneDay,
    lastTwoDay,
} from '../constants/parameter.js'
import {
    Max,
    Min,
    tempList,
    sum,
    validWeather,
    sameWeather,
    formatData,
} from '../utils/methods.js'
import dayjs from 'dayjs'

const props = defineProps({
    id: Number,
    src: String,
    parameter: String,
})

const state = {
    data: ref({}),
}
async function main() {
    const api = await fetch(
        `${host}${props.src}?Authorization=${token}${props.parameter}`,
        paramsObj
    )
    const apiJson = api.json()
    apiJson.then((res) => methods(res))
}
main()

function methods(res) {
    if (props.id === 1) return answer1(res.records.location)
    if (props.id === 2) return answer2(res.records.location)
    if (props.id === 3) return answer3(res.records.location)
    answer4(res.records.locations[0].location[0])
}

// answer data detail
function answer1(answer) {
    const valid = validWeather(answer)
    const tempList = valid.map((el) => el.weatherElement[3].elementValue)
    const min = Min(tempList)
    const data = valid.filter(
        (el) => min === +el.weatherElement[3].elementValue
    )
    state.data.value[0] = formatData(data, props.id)
}

function answer2(answer) {
    let group = {}
    answer.forEach((el) => {
        const temp = el.weatherElement[0].elementValue
        const id = parseInt(temp / 500)
        if (!group[id]) group[id] = []
        group[id].push(el)
    })
    let i = 0
    while (group[i]) {
        state.data.value[i] = formatData(validWeather(group[i]), props.id, i)
        i++
    }
}

function answer3(answer) {
    const sort = answer.sort(
        (a, b) =>
            b.weatherElement[0].elementValue - a.weatherElement[0].elementValue
    )
    const data = sort.slice(0, 20)
    let obj = []
    data.forEach((el) => {
        const city = el.parameter[0].parameterValue
        const town = el.parameter[2].parameterValue
        const elName = el.locationName
        const elVal = el.weatherElement[0].elementValue
        const cityIdx = obj.findIndex((el) => el.city === city)
        if (cityIdx === -1)
            obj.push({ city, town: [{ town, location: [{ elName, elVal }] }] })
        else {
            const townIdx = obj[cityIdx].town.findIndex(
                (el) => el.town === town
            )
            if (townIdx === -1)
                obj[cityIdx].town.push({ town, location: [{ elName, elVal }] })
            else obj[cityIdx].town[townIdx].location.push({ elName, elVal })
        }
    })
    state.data.value = Object.assign({}, obj)
}

function answer4(answer) {
    const weather = answer.weatherElement[0].time
    const lastOneTemp = weather.filter(
        (el) => dayjs(el.dataTime).get('date') === dayjs(lastOneDay).get('date')
    )
    const lastTwoTemp = weather.filter(
        (el) => dayjs(el.dataTime).get('date') !== dayjs(lastOneDay).get('date')
    )
    const [
        daysMax,
        daysMin,
        todayOneMax,
        todayOneMin,
        todayTwoeMax,
        todayTwoMin,
    ] = [
        Max(tempList(weather)),
        Min(tempList(weather)),
        Max(tempList(lastOneTemp)),
        Min(tempList(lastOneTemp)),
        Max(tempList(lastTwoTemp)),
        Min(tempList(lastTwoTemp)),
    ]

    const maxDays = sameWeather(weather, daysMax)
    const minDays = sameWeather(weather, daysMin)

    const showData = (arr) =>
        arr.map((el) => {
            return { time: el.dataTime, temp: el.elementValue[0].value }
        })
    const [sumOneTemp, sumTwoTemp] = [
        sum([todayOneMax, todayOneMin]),
        sum([todayTwoeMax, todayTwoMin]),
    ]
    state.data.value = {
        H_temp: showData(maxDays),
        L_temp: showData(minDays),
        today_temp:
            sumOneTemp > sumTwoTemp
                ? todayTwoeMax - todayTwoMin
                : todayOneMax - todayOneMin,
    }
}
</script>
