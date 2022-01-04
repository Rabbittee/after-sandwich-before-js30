<template>
    <div class="flex space-x-10" v-if="state.data.featureMax">
        <div>最高溫:</div>
        <div>
            {{ dayjs(state.data.featureMax.dataTime).format('YYYY-MM-DD') }}
        </div>
        <div>{{ state.data.featureMax.elementValue[0].value }}度</div>
    </div>
    <div class="flex space-x-10" v-if="state.data.featureMin">
        <div>最低溫:</div>
        <div>
            {{ dayjs(state.data.featureMin.dataTime).format('YYYY-MM-DD') }}
        </div>
        <div>{{ state.data.featureMin.elementValue[0].value }}度</div>
    </div>
    <div class="flex space-x-10" v-if="state.data.maxDiff">
        <div>單日溫差最大:</div>
        <div>{{ state.data.maxDiff }}度</div>
    </div>
</template>
<script setup>
import { reactive } from 'vue'
import { featureOneDay, featureNextDay } from '../constants/parameter.js'
import { min, max, findArrIdx } from '../utils/methods.js'
import fetchData from '../utils/fetchApi.js'
import dayjs from 'dayjs'

const state = reactive({
    data: {},
})

fetchData('F-D0047-089', {
    locationName: '高雄市',
    sort: 'time',
    timeFrom: featureOneDay,
    timeTo: featureNextDay,
}).then((res) => {
    const response = res.records.locations[0].location
    const featureMin = min(response, 'T', true)
    const featureMax = max(response, 'T')
    const maxDiff = diffTemp(response)
    state.data = { featureMin, featureMax, maxDiff }
})

function diffTemp(arr, minVal = Infinity, maxVal = -Infinity, result = -Infinity) {
    const oneDay = dayjs(featureOneDay).get('date')
    const index = findArrIdx(arr[0].weatherElement, 'T', 'weather')
    arr[0].weatherElement[index].time.forEach((el) => {
        if (dayjs(el.dataTime).get('date') === oneDay) {
            minVal = Math.min(minVal, Number(el.elementValue[0].value))
            maxVal = Math.max(maxVal, Number(el.elementValue[0].value))
            result = Math.max(maxVal-minVal, result)
        } else {
            minVal = Math.min(minVal, Number(el.elementValue[0].value))
            maxVal = Math.max(maxVal, Number(el.elementValue[0].value))
            result = Math.max(maxVal-minVal, result)
        }
    })
    return result
}
</script>
