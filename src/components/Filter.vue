<script setup lang="ts">
import { PropType, ref } from 'vue';
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
    },
    currentRegion: {
        required: true,
        type: String
    }
})

const emit = defineEmits(['changeFilteredRegion']);
const filterByRegion = (e: Event) => {
    const region : string = (<HTMLSelectElement>e.target).value
    // Reset countryliststore
    props.countryListStore.resetList();
    // Loop through allcountries
    props.allCountries.countries.forEach((value, key) => {
        if (region === "all") {
            props.countryListStore.addToList(value);
        }
        else if (value['region'] === region) {
            props.countryListStore.addToList(value);
        }
    })
    emit('changeFilteredRegion', region);

}
</script>

<template>
    <select
        name="region"
        id="region"
        class="bg-lmelements dark:bg-dmelements py-3 pl-4 pr-10 cursor-pointer"
        style="border-right: 16px solid transparent"
        @change="filterByRegion($event)"
        :value="currentRegion"
    >
        <option selected disabled value="default">Filter by Region</option>
        <option value="all">All</option>
        <option v-for="region in props.regionList" :value="region">
            {{ region }}
        </option>
    </select>
</template>
