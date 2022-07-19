<script setup lang="ts">
import { stringify } from "querystring";
import { inject, onMounted, PropType, watch } from "vue";
import { Country } from "../api/interfaces";
import {
    CountryCodeMap,
    CountryMap,
    CurrentCountryFunctions,
} from "../App.vue";
import CountryPreview from "./CountryPreview.vue";

const props = defineProps({
    countryList: {
        required: true,
        type: Array as PropType<Country[]>,
    },
    currentCountryFunctions: {
        required: true,
        type: Object as PropType<CurrentCountryFunctions>,
    },
});

const viewFullCountry = (country: Country) => {
    props.currentCountryFunctions.setCurrentCountry(country);
    props.currentCountryFunctions.toggleIsViewingIndividual();
};
</script>

<template>
    <div class="flex flex-wrap mx-10 my-5 justify-between">
        <CountryPreview
            v-for="country in props.countryList"
            :country="country"
            @click="viewFullCountry(country)"
        />
    </div>
</template>
