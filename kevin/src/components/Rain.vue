<template>
    <div class="text-gray-900 space-y-4">
        <template v-if="top20_rain && status === 200">
            <div v-for="(each, i) in top20_rain" :key="`rain-${i}`">
                <div class="flex flex-wrap gap-x-10 gap-y-2">
                    <div class="flex justify-between w-full">
                        <h2 class="text-gray-900 font-bold text-xs">降雨量第 {{ i + 1 }} 名</h2>
                        <p class="text-xs text-gray-400">{{ each.time }}</p>
                    </div>
                    <div class="self-end w-52">
                        <div class="flex gap-2">
                            <p class="text-5xl font-bold">{{ each.hour_24 }}</p>
                            <span class="self-end">mm</span>
                        </div>
                    </div>
                    <div class="space-y-1 self-end">
                        <p class="text-xs text-gray-700">經緯 {{ each.latLon.lat }}, {{ each.latLon.lon }}</p>
                        <h2 class="font-bold text-xl">
                            <span>{{ each.location.city }}</span>
                            <span>{{ each.location.town }}</span>
                            <span>{{ each.location.name }}</span>
                        </h2>
                    </div>
                </div>
            </div>
        </template>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { Rain } from "@/apis/rain.js";
export default {
    name: "Rain",

    data() {
        return {
            status: null,
            top20_rain: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const { status, top20_rain } = await new Rain();
            this.status = status;
            this.top20_rain = top20_rain;
            console.log("第三題", top20_rain);
        },
    },
};
</script>
