<template>
    <Answer12
        v-if="props.id === 1 || props.id === 2"
        :data="state.data"
    ></Answer12>
    <Answer3 v-else-if="props.id === 3" :data="state.data"></Answer3>
    <Answer4 v-else :data="state.data"></Answer4>
</template>
<script setup>
import { defineProps, reactive } from '@vue/runtime-core'
import api from '../utils/api.js'

import Answer12 from '../views/answer12.vue'
import Answer3 from '../views/answer3.vue'
import Answer4 from '../views/answer4.vue'

import solution1 from '../utils/answer1.js'
import solution2 from '../utils/answer2.js'
import solution3 from '../utils/answer3.js'
import solution4 from '../utils/answer4.js'

const props = defineProps({
    id: Number,
    src: String,
    parameter: String,
})

const state = reactive({ data: {} })

try {
    api(props.src, props.parameter).then((res) => {
        if (props.id === 1)
            return (state.data[0] = solution1(res.records.location, props.id))
        if (props.id === 2)
            return (state.data = solution2(res.records.location, props.id))
        if (props.id === 3)
            return (state.data = solution3(res.records.location, props.id))
        state.data = solution4(res.records.locations[0].location[0], props.id)
    })
} catch (err) {
    console.log('ooops..api err')
}
</script>
