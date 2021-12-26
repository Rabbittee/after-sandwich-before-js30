<template>
    <div class="card flex-col flex items-center">
        <span class="text-left"
            >問題 {{ question.id }}: {{ question.item }}</span
        >
        <div class="bg-blue-300 w-3/5 h-auto rounded-md my-2 shadow-xl">
            <answerGroup
                :id="question.id"
                :src="src[question.id - 1]"
                :parameter="parameter[question.id - 1]"
            ></answerGroup>
        </div>
    </div>
</template>
<script setup>
import { defineProps } from '@vue/runtime-core'
import answerGroup from './answerGroup.vue'
import { lastOneDay, lastTwoDay } from '../constants/parameter.js'

defineProps({
    question: Object,
})

const src = ['O-A0001-001', 'O-A0001-001', 'O-A0002-001', 'F-D0047-089']
const parameter = [
    '',
    '',
    '&elementName=HOUR_24',
    `&locationName=高雄市&elementName=T&sort=time&timeFrom=${lastOneDay}&timeTo=${lastTwoDay}`,
]
</script>
