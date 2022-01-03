<template>
    <div class="max-w-screen-lg mx-auto px-5 py-10 space-y-6">
        <div class="text-2xl px-5 font-semibold text-slate-700">
            JS讀書會期末考
        </div>
        <div
            class="bg-white text-black text-opacity-70 rounded-2xl shadow-xl p-8"
        >
            <template class="flex">
                <div
                    v-for="(btn, index) in btnCard"
                    :key="btn"
                    @click="state.btnClick = index"
                    :class="[
                        {
                            'hover:bg-red-500': state.btnClick === index,
                            'bg-red-500 text-white': state.btnClick === index,
                        },
                        'bg-gray-100 text-gray-600',
                        'rounded-lg',
                        'w-36',
                        'mx-2 mb-10 py-2',
                        'text-center',
                        'space-x-10',
                        'hover:bg-gray-400',
                        'hover:text-white',
                        'cursor-pointer',
                    ]"
                >
                    {{ btn }}
                </div>
            </template>
            <div class="bg-gray-300 rounded-lg p-5 mb-10">
                題目 {{ state.btnClick + 1 }} .{{
                    questionCard[state.btnClick].question
                }}
            </div>
            <div class="bg-gray-300 rounded-lg h-auto p-5">
                <Component :is="questionCard[state.btnClick].Comp"></Component>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Answer1 from './components/Answer1.vue'
import Answer2 from './components/Answer2.vue'
import Answer3 from './components/Answer3.vue'
import Answer4 from './components/Answer4.vue'

const state = reactive({
    btnClick: 0,
})

const btnCard = ['全台最低溫', '最低溫測站', '降雨量', '未來兩天天氣預報']

const questionCard = [
    {
        question:
            '找到全台當下最低溫的點，並列出 縣市 行政區 測站名稱 溫度 座標',
        Comp: Answer1,
    },
    {
        question:
            '同上，針對不同海拔高度找出最低溫測站，每500m一組，並回傳 object',
        Comp: Answer2,
    },
    {
        question: '近24小時降雨量前20名是哪些？ 分別統計整理列在哪些縣市？',
        Comp: Answer3,
    },
    {
        question:
            '自己所在的縣市，未來兩天的最低溫與最高溫分別為多少？且最大單日溫差為多少？',
        Comp: Answer4,
    },
]
</script>
