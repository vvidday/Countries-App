<script setup lang="ts">
import { stringify } from "querystring";
import { inject, onMounted, PropType, watch } from "vue";
import { Country } from "../api/interfaces";
import { CountryCodeMap, CountryMap } from "../App.vue";
import CountryPreview from "./CountryPreview.vue";

const props = defineProps({
    countryList: {
        required: true,
        type: Array as PropType<Country[]>,
    },
});
let country = props.countryList[0];
</script>

<template>
    <div>Country Display</div>
    <div
        v-if="props.countryList !== undefined"
        v-for="country in props.countryList"
    >
        <CountryPreview :country="country" />
    </div>
</template>
