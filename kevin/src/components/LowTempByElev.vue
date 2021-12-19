<template>
    <div class="text-gray-900">
        <ul v-if="sortedLowestLocationByElev && status === 200" class="space-y-4">
            <template v-for="(location, i) in sortedLowestLocationByElev">
                <li :key="`sorted-location-with-elev-${i}`" class="flex flex-wrap gap-y-2">
                    <h3 class="w-full text-xs font-bold">
                        {{ location.elev }} ~ {{ Number(location.elev) + 499 }} 公尺
                    </h3>
                    <p class="w-36 flex gap-2">
                        <span class="text-5xl font-bold">
                            {{ location.temperature }}
                        </span>
                        <span class="text-sm self-end">°C</span>
                    </p>
                    <div class="flex flex-col justify-between">
                        <p class="text-sm text-gray-700">{{ location.locationElev }} 公尺</p>
                        <p class="font-bold text-xl">
                            {{ location.location.city }}
                            {{ location.location.town }}
                            {{ location.location.name }}
                        </p>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { Temperature } from "@/apis/temperature.js";

export default {
    name: "LowTempByElev",

    data() {
        return {
            sortedLowestLocationByElev: null,
            status: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const { lowestLocationByElev, sortedLowestLocationByElev, status } = await new Temperature();
            this.sortedLowestLocationByElev = sortedLowestLocationByElev;
            this.status = status;
            console.log("第二題 目前每 500 公尺海拔的最低溫區域: ", lowestLocationByElev);
        },
    },
};
</script>
