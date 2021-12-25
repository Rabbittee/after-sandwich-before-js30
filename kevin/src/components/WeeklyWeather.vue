<template>
    <div>
        <div v-if="status === 200" class="space-y-4">
            <div class="flex gap-4 items-center w-full">
                <select
                    name="location"
                    id="location"
                    class="px-4 py-2 cursor-pointer rounded-lg w-full"
                    v-if="locationOptions"
                    v-model="form.selectedLocation"
                    @change="onChangeLocation"
                >
                    <option value="" disabled>選啦！選啦！</option>
                    <option v-for="(option, i) in locationOptions" :value="option.value" :key="`location-option-${i}`">
                        {{ option.text }}
                    </option>
                </select>
            </div>
            <template v-if="result">
                <h3 class="font-bold">未來一周溫度預測</h3>
                <div class="flex gap-8">
                    <div>
                        <h4 class="text-sm">最高溫</h4>
                        <p class="text-5xl font-bold">
                            {{ result.highestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">最低溫</h4>
                        <p class="text-5xl font-bold">
                            {{ result.lowestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">單日最大溫差</h4>
                        <p class="text-5xl font-bold">
                            {{ result.maxDiff.temp.diff }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { weeklyForecast } from "@/apis/weeklyForecast.js";
export default {
    name: "WeeklyWeather",

    data() {
        return {
            locationOptions: null,
            status: null,
            getLocationTempExtreme: null,
            getLocationTempMaxDiff: null,
            form: {
                selectedLocation: "",
            },
            result: null,
        };
    },

    async mounted() {
        this.getData();
    },

    methods: {
        async getData() {
            const { getLocationTempExtreme, getLocationTempMaxDiff, allLocations, status } = await weeklyForecast();
            this.getLocationTempExtreme = getLocationTempExtreme;
            this.getLocationTempMaxDiff = getLocationTempMaxDiff;
            this.locationOptions = allLocations;
            this.status = status;
            console.log("第四題 要選一下城市");
        },

        onChangeLocation() {
            const location = this.form.selectedLocation;
            const highestTemp = this.getLocationTempExtreme(location, "highest");
            const lowestTemp = this.getLocationTempExtreme(location, "lowest");
            const maxDiff = this.getLocationTempMaxDiff(location);
            this.result = {
                highestTemp,
                lowestTemp,
                maxDiff,
            };
            console.log(
                `第四題: 最高溫 ${highestTemp} 度 | 最低溫 ${lowestTemp} 度 | 最大溫差 ${maxDiff.temp.diff} 度`
            );
            console.log("最大溫差的資料", maxDiff);
        },
    },
};
</script>
