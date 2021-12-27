<template>
    <div class="py-4">
        <ul class="container space-y-8">
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第一題</h2>
                <Card>
                    <LowestTemp />
                </Card>
            </li>
            <li class="space-y-2">
                <h2 class="font-bold text-xl">第二題</h2>
                <Card>
                    <LowTempByElevation />
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
                    <Forecast />
                </Card>
            </li>
        </ul>
    </div>
</template>

<script>
import LowestTemp from "@/components/LowestTemp.vue";
import LowTempByElevation from "@/components/LowTempByElevation.vue";
import Rain from "@/components/Rain.vue";
import Forecast from "@/components/Forecast.vue";
import Card from "@/components/Card.vue";
export default {
    name: "App",
    components: {
        Card,
        LowTempByElevation,
        LowestTemp,
        Rain,
        Forecast,
    },
};
</script>
