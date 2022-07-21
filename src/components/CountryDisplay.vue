<script setup lang="ts">
import { PropType } from "vue";
import { Country } from "../api/interfaces";
import { CurrentCountryFunctions } from "../App.vue";
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
    <div
        class="flex flex-wrap lg:mx-10 lg:my-5 justify-center bp1:justify-between"
    >
        <CountryPreview
            class="hover:cursor-pointer sm:mx-10 my-10"
            v-for="country in props.countryList"
            :country="country"
            @click="viewFullCountry(country)"
        />
    </div>
</template>
