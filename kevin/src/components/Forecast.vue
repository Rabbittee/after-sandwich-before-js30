<template>
    <div>
        <div class="space-y-4">
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
            <template v-if="weeklyForecast.status === 200 && weeklyResult">
                <h3 class="font-bold">未來一周溫度預測</h3>
                <div class="flex gap-8">
                    <div>
                        <h4 class="text-sm">最高溫</h4>
                        <p class="text-5xl font-bold">
                            {{ weeklyResult.highestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">最低溫</h4>
                        <p class="text-5xl font-bold">
                            {{ weeklyResult.lowestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">單日最大溫差</h4>
                        <p class="text-5xl font-bold">
                            {{ weeklyResult.maxDiff.temp.diff }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                </div>
            </template>
            <template v-if="twoDayForecast.status === 200 && twoDaysResult">
                <h3 class="font-bold">未來兩日溫度預測</h3>
                <div class="flex gap-8">
                    <div>
                        <h4 class="text-sm">最高溫</h4>
                        <p class="text-5xl font-bold">
                            {{ twoDaysResult.highestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">最低溫</h4>
                        <p class="text-5xl font-bold">
                            {{ twoDaysResult.lowestTemp }}
                            <span class="text-sm self-end">°C</span>
                        </p>
                    </div>
                    <div>
                        <h4 class="text-sm">單日最大溫差</h4>
                        <p class="text-5xl font-bold">
                            {{ twoDaysResult.maxDiff }}
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
import { twoDaysForecast } from "@/apis/twoDaysForecast.js";
import { cities as allLocations } from "@/apis/locations.js";
export default {
    name: "WeeklyWeather",

    data() {
        return {
            locationOptions: null,
            form: {
                selectedLocation: "",
            },
            weeklyForecast: {
                getLocationTempExtreme: null,
                getLocationTempMaxDiff: null,
                status: null,
            },
            twoDayForecast: {
                getLocationTempExtreme: null,
                getLocationTempMaxDiff: null,
                status: null,
            },
            weeklyResult: null,
            twoDaysResult: null,
        };
    },

    async mounted() {
        this.getData();
        twoDaysForecast();
    },

    methods: {
        getData() {
            this.locationOptions = allLocations;
            this.getWeeklyData();
            this.getTwoDayData();
            console.log("第四題 要選一下城市");
        },

        async getWeeklyData() {
            const { getLocationTempExtreme, getLocationTempMaxDiff, status } = await weeklyForecast();
            this.weeklyForecast = {
                getLocationTempExtreme,
                getLocationTempMaxDiff,
                status,
            };
        },

        async getTwoDayData() {
            const { getLocationTempExtreme, getLocationTempMaxDiff, status } = await twoDaysForecast();
            this.twoDayForecast = {
                getLocationTempMaxDiff,
                getLocationTempExtreme,
                status,
            };
        },

        onChangeLocation() {
            const location = this.form.selectedLocation;

            // * 一周
            const highestTemp = this.weeklyForecast.getLocationTempExtreme(location, "highest");
            const lowestTemp = this.weeklyForecast.getLocationTempExtreme(location, "lowest");
            const maxDiff = this.weeklyForecast.getLocationTempMaxDiff(location);
            this.weeklyResult = {
                highestTemp,
                lowestTemp,
                maxDiff,
            };
            console.log(`一周: 最高溫 ${highestTemp} 度 | 最低溫 ${lowestTemp} 度 | 最大溫差 ${maxDiff.temp.diff} 度`);

            // * 兩天
            const twoDaysHighestTemp = this.twoDayForecast.getLocationTempExtreme(location, "highest");
            const twoDaysLowestTemp = this.twoDayForecast.getLocationTempExtreme(location, "lowest");
            const twoDaysMaxDiff = this.twoDayForecast.getLocationTempMaxDiff(location);
            this.twoDaysResult = {
                highestTemp: twoDaysHighestTemp,
                lowestTemp: twoDaysLowestTemp,
                maxDiff: twoDaysMaxDiff,
            };
            console.log(
                `兩日: 最高溫 ${twoDaysHighestTemp} 度 | 最低溫 ${twoDaysLowestTemp} 度 | 最大溫差 ${twoDaysMaxDiff} 度`
            );
        },
    },
};
</script>
