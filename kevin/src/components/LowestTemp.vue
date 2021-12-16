<template>
    <div class="text-gray-900">
        <div v-if="data && status === 200" class="flex flex-wrap gap-x-10 gap-y-2">
            <div class="flex justify-between w-full">
                <h2 class="text-gray-900 font-bold text-xs">最低溫觀測站</h2>
                <p class="text-xs text-gray-400">{{ lowestLocation.time }}</p>
            </div>
            <div class="self-end">
                <div class="flex gap-2">
                    <p class="text-5xl font-bold">{{ lowestLocation.temperature }}</p>
                    <span class="self-end">°C</span>
                </div>
            </div>
            <div class="space-y-1 self-end">
                <p class="text-xs text-gray-700">
                    經緯 {{ lowestLocation.latLon.lat }}, {{ lowestLocation.latLon.lon }}
                </p>
                <h2 class="font-bold text-xl">
                    <span>{{ lowestLocation.location.city }}</span>
                    <span>{{ lowestLocation.location.town }}</span>
                    <span>{{ lowestLocation.location.name }}</span>
                </h2>
            </div>
        </div>
        <div v-else>
            <p>Loading...</p>
        </div>
    </div>
</template>

<script>
import { Temperature } from "@/apis/temperature.js";
export default {
    name: "Lowest-Temp",

    data() {
        return {
            data: null,
            status: null,
            lowestLocation: null,
        };
    },

    mounted() {
        this.getTemperature();
    },

    methods: {
        async getTemperature() {
            const { data, status, lowestLocation } = await new Temperature();
            this.data = data;
            this.status = status;
            this.lowestLocation = lowestLocation;
            console.log("第一題", lowestLocation);
        },
    },
};
</script>
