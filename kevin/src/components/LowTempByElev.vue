<template>
    <div class="text-gray-900">
        <ul v-if="sortTempByElev" class="space-y-4">
            <template v-for="location in sortTempByElev">
                <li :key="`sorted-location-with-elev-${location.stationId}`" class="flex flex-wrap gap-y-2">
                    <h3 class="w-full text-xs font-bold">
                        {{ location.elev }} ~ {{ Number(location.elev) + 499 }} 公尺
                    </h3>
                    <p class="w-36 flex gap-2">
                        <span class="text-5xl font-bold">
                            {{ getElementValueByKey(location.weatherElement, "TEMP") }}
                        </span>
                        <span class="text-sm self-end">°C</span>
                    </p>
                    <div class="flex flex-col justify-between">
                        <p class="text-sm text-gray-700">
                            {{ getElementValueByKey(location.weatherElement, "ELEV") }} 公尺
                        </p>
                        <p class="font-bold text-xl">
                            {{ locationName(location.parameter) }} {{ location.locationName }}
                        </p>
                    </div>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
import { weatherCurrentRecord } from "@/apis/weather.js";

export default {
    name: "LowTempByElev",

    data() {
        return {
            weatherData: null,
        };
    },

    async mounted() {
        this.getTempAndElev();
    },

    computed: {
        tempByElev() {
            if (!this.weatherData) return null;
            const getValue = (ary, key) => this.getElementValueByKey(ary, key);
            return this.weatherData.reduce((all, current) => {
                const tempCurrent = Number(getValue(current.weatherElement, "TEMP"));
                const elevCurrent = Number(getValue(current.weatherElement, "ELEV"));
                if (isNaN(tempCurrent) || isNaN(elevCurrent)) return all;

                const level = Math.floor(elevCurrent / 500) * 500;

                if (Number(tempCurrent) !== -99) {
                    if (all[level] === undefined) {
                        all[level] = current;
                    } else {
                        const tempInAll = Number(getValue(all[level].weatherElement, "TEMP"));
                        if (tempInAll > tempCurrent) {
                            all[level] = current;
                        } else if (tempInAll === tempCurrent) {
                            console.log("居然有同溫度的...");
                            all[level].sameTemp =
                                all[level].sameTemp === undefined
                                    ? [all[level], current]
                                    : [...all[level].sameTemp, current];
                        }
                    }
                }

                return all;
            }, {});
        },
        sortTempByElev() {
            if (!this.tempByElev) return null;
            return Object.entries(this.tempByElev)
                .map(([elev, item]) => {
                    return { ...item, elev };
                })
                .sort((prev, next) => {
                    return prev.elev - next.elev;
                });
        },
    },

    methods: {
        async getTempAndElev() {
            const { data } = await weatherCurrentRecord({
                elementName: "TEMP,ELEV",
            });
            this.weatherData = data.records.location;
            return data.records.location;
        },

        getElementValueByKey(ary, key) {
            if (!Array.isArray(ary)) return null;
            return ary.find(item => item.elementName === key).elementValue;
        },

        getParamByKey(ary, key) {
            if (!Array.isArray(ary)) return null;
            return ary.find(item => item.parameterName === key).parameterValue;
        },
        locationName(parameter) {
            return `${this.getParamByKey(parameter, "CITY")} ${this.getParamByKey(parameter, "TOWN")}`;
        },
    },
};
</script>
