<template>
    <div class="py-4">
        <ul class="container space-y-8">
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第一題</h2>
                <Card>
                    <Lowest-temp />
                </Card>
            </li>
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第二題</h2>
                <Card>
                    <LowTempByElev />
                </Card>
            </li>
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第三題</h2>
                <Card>
                    <Rain />
                </Card>
            </li>
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第四題</h2>
                <Card>
                    <WeeklyWeather />
                </Card>
            </li>
        </ul>
    </div>
</template>

<script>
import LowestTemp from "@/components/LowestTemp.vue";
import LowTempByElev from "@/components/LowTempByElev.vue";
import Rain from "@/components/Rain.vue";
import WeeklyWeather from "@/components/WeeklyWeather.vue";
import Card from "@/components/Card.vue";
export default {
    name: "App",
    components: {
        Card,
        LowTempByElev,
        LowestTemp,
        Rain,
        WeeklyWeather,
    },
};
</script>
