<script setup lang="ts">
import { PropType } from "vue";
import { Country } from "../api/interfaces";
import { formatNumber } from "../helpers/numbers";

const props = defineProps({
    country: {
        required: true,
        type: Object as PropType<Country>,
    },
});
</script>

<template>
    <div>
        <div>
            <img
                :src="country['flags']['png']"
                :alt="`Flag of ${country['name']['common']}`"
            />
        </div>
        <div
            class="bg-lmelements dark:bg-dmelements px-5 pb-10 text-sm rounded-b-md font-light w-[267px] h-[160px]"
        >
            <div>
                <p class="font-bold text-base py-4">
                    {{ country["name"]["common"] }}
                </p>
            </div>
            <div class="preview-info">
                <p>
                    <span class="font-semibold">Population:</span>
                    {{ formatNumber(country["population"]) }}
                </p>
                <p>
                    <span class="font-semibold">Region:</span>
                    {{ country["region"] }}
                </p>
                <p v-if="country['capital'] !== undefined">
                    <span class="font-semibold">Capital:</span>
                    {{ country["capital"][0] }}
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 267px;
    height: 160px;
    object-fit: fill;
    overflow: hidden;
    border-radius: 6px;
}

.preview-info > p {
    margin: 5px 0px;
}
</style>
