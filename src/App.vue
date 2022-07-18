<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from "./components/HelloWorld.vue";
import Navbar from "./components/Navbar.vue";
import { getSingleCountry, getCountry, getAllCountries } from "./api/countries";
import { reactive, onBeforeMount, provide, InjectionKey, ref } from "vue";
import { Country } from "./api/interfaces";
import CountryDisplay from "./components/CountryDisplay.vue";

// State to keep track of all countries (CODES) - used for quick border lookup
interface CountryCodeStore {
    countries: Map<string, Country>;
    addToCountries(country: Country): void;
}
const allCountriesCodes: CountryCodeStore = reactive({
    countries: new Map<string, Country>(),
    addToCountries(country) {
        this.countries.set(country["cioc"], { ...country });
    },
});

// State to keep track of all countries (NAMES) - used in search
interface CountryStore {
    countries: Map<string, Country>;
    addToCountries(country: Country): void;
}
const allCountries: CountryStore = reactive({
    countries: new Map<string, Country>(),
    addToCountries(country) {
        this.countries.set(country["name"]["common"], { ...country });
    },
});

// Providing Map of countries to child components
//const CountryCodeMap = Symbol() as InjectionKey<Map<string, Country>>;
provide(CountryCodeMap, allCountriesCodes.countries);
//const CountryMap = Symbol() as InjectionKey<Map<string, Country>>;
provide(CountryMap, allCountries.countries);

// Reactive boolean to wait for async call.
const loading = ref(true);
// Array of countries to be displayed (Passed as props to CountryDisplay)
interface CountryListStore {
    countryList: Country[];
    addToList(country: Country): void;
}
const countryListStore: CountryListStore = reactive({
    countryList: new Array<Country>(),
    addToList(country) {
        this.countryList.push(country);
    },
});
// Set of Regions
const regionList = ref<Set<String>>(new Set<String>());

// Function that loads all countries into memory (to be called before Mount)
onBeforeMount(async () => {
    const countryArray = await getAllCountries();
    let i = 0;
    for (const country of countryArray) {
        allCountries.addToCountries(country);
        allCountriesCodes.addToCountries(country);
        // Build 10 countries we show on default
        if (i++ < 10) countryListStore.addToList(country);
        // Build region set
        if (!regionList.value.has(country["region"]))
            regionList.value.add(country["region"]);
    }
    loading.value = false;
    // Process Regions
});
</script>
<script lang="ts">
// Exporting type for type-safe provide/injections
export const CountryCodeMap = Symbol() as InjectionKey<Map<string, Country>>;
export const CountryMap = Symbol() as InjectionKey<Map<string, Country>>;
</script>

<template>
    <div
        class="h-full bg-lmbg dark:bg-dmbg text-black dark:text-white font-light"
    >
        <Navbar />

        <CountryDisplay
            v-if="!loading"
            :country-list="countryListStore.countryList"
        />
    </div>
</template>

<style scoped></style>
