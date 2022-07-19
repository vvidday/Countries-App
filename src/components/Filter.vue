<script setup lang="ts">
import { PropType } from 'vue';
import { CountryListStore, CountryStore } from '../App.vue';

const props = defineProps({
    regionList: {
        required: true,
        type: Set<string>
    },
    countryListStore: {
        required: true,
        type: Object as PropType<CountryListStore>
    },
    allCountries: {
        required: true,
        type: Object as PropType<CountryStore>
    }
})


const filterByRegion = (e: Event) => {
    const region : string = (<HTMLSelectElement>e.target).value
    // Reset countryliststore
    props.countryListStore.resetList();
    // Loop through allcountries
    props.allCountries.countries.forEach((value, key) => {
        if (value['region'] === region) {
            props.countryListStore.addToList(value);
        }
    })
}
</script>

<template>
    <select
        name="region"
        id="region"
        class="text-black"
        @change="filterByRegion($event)"
    >
        <option selected disabled value="default">Filter by Region</option>
        <option v-for="region in props.regionList" :value="region">
            {{ region }}
        </option>
    </select>
</template>
