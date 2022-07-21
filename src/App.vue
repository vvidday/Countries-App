<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Navbar from "./components/Navbar.vue";
import { getAllCountries } from "./api/countries";
import { reactive, onBeforeMount, ref, Ref } from "vue";
import { Country } from "./api/interfaces";
import CountryDisplay from "./components/CountryDisplay.vue";
import Filter from "./components/Filter.vue";
import CountryFull from "./components/CountryFull.vue";
import Search from "./components/Search.vue";

// State to keep track of all countries (CODES) - used for quick border lookup
const allCountriesCodes: CountryCodeStore = reactive({
    countries: new Map<string, Country>(),
    addToCountries(country) {
        this.countries.set(country["cca3"], { ...country });
    },
});

// State to keep track of all countries (NAMES) - used in search
const allCountries: CountryStore = reactive({
    countries: new Map<string, Country>(),
    addToCountries(country) {
        this.countries.set(country["name"]["common"], { ...country });
    },
});
// Array of countries to be displayed (Passed as props to CountryDisplay)
const countryListStore: CountryListStore = reactive({
    countryList: new Array<Country>(),
    addToList(country) {
        this.countryList.push(country);
    },
    resetList() {
        this.countryList.splice(0, this.countryList.length);
    },
});

// refs for current country
const currentCountry: Ref<Country | undefined> = ref(undefined);
const isViewingIndividual: Ref<boolean> = ref(false);

// Reactive State to determine what is shown
const currentCountryFunctions: CurrentCountryFunctions = reactive({
    setCurrentCountry(country: Country) {
        currentCountry.value = country;
    },
    toggleIsViewingIndividual() {
        isViewingIndividual.value = !isViewingIndividual.value;
    },
});

// Set of Regions
const regionList = ref<Set<string>>(new Set<string>());
// Reactive boolean to wait for async call.
const loading = ref<boolean>(true);

// Ref to store preference for dark/light mode
const prefersDarkMode = ref<boolean>(false);
// Reactive functions that are passed to nav.
const navFunctions: NavFunctions = reactive({
    toggleDarkMode(): void {
        prefersDarkMode.value = !prefersDarkMode.value;
    },
    toHomePage(): void {
        isViewingIndividual.value = false;
    },
});

// Ref to store filtered region
const currentRegion = ref<string>("default");

// Function that loads all countries into memory (to be called before Mount)
onBeforeMount(async () => {
    // Dark Mode Checking
    if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
        // Dark Mode
        prefersDarkMode.value = true;
    } else {
        prefersDarkMode.value = false;
    }

    const countryArray = await getAllCountries();
    let i = 0;
    for (const country of countryArray) {
        allCountries.addToCountries(country);
        allCountriesCodes.addToCountries(country);
        // Add all countries on default
        countryListStore.addToList(country);
        // Build region set
        if (!regionList.value.has(country["region"]))
            regionList.value.add(country["region"]);
    }
    loading.value = false;
});
</script>
<script lang="ts">
// Exporting type for type-safe provide/injections
export interface CountryListStore {
    countryList: Country[];
    addToList(country: Country): void;
    resetList(): void;
}
export interface CountryStore {
    countries: Map<string, Country>;
    addToCountries(country: Country): void;
}
export interface CountryCodeStore {
    countries: Map<string, Country>;
    addToCountries(country: Country): void;
}
export interface CurrentCountryFunctions {
    setCurrentCountry(country: Country): void;
    toggleIsViewingIndividual(): void;
}
export interface NavFunctions {
    toggleDarkMode(): void;
    toHomePage(): void;
}
</script>

<template>
    <html :class="prefersDarkMode ? 'dark' : 'light'">
        <body
            class="dark:bg-dmbg bg-lmbg text-black dark:text-white font-light"
            style="min-height: 100vh"
        >
            <Navbar
                :prefers-dark-mode="prefersDarkMode"
                :navFunctions="navFunctions"
            />
            <div v-if="loading" class="flex justify-center">
                <div class="loader mt-10"></div>
            </div>

            <div
                class="mt-10 flex flex-col bp1:grid bp1:grid-cols-2 bp1:grid-rows-1"
            >
                <div
                    class="flex justify-center bp1:justify-start bp1:ml-10 lg:ml-20"
                >
                    <Search
                        :all-countries="allCountries"
                        :current-country-functions="currentCountryFunctions"
                        class=""
                        v-if="!loading && !isViewingIndividual"
                    />
                </div>
                <div
                    class="flex justify-center mt-6 bp1:mt-0 bp1:justify-end bp1:mr-10 lg:mr-20"
                >
                    <Filter
                        @changeFilteredRegion="(region: string) => currentRegion = region"
                        v-if="!loading && !isViewingIndividual"
                        :region-list="regionList"
                        :country-list-store="countryListStore"
                        :all-countries="allCountries"
                        :current-region="currentRegion"
                    />
                </div>
            </div>

            <CountryDisplay
                v-if="!loading && !isViewingIndividual"
                :country-list="countryListStore.countryList"
                :current-country-functions="currentCountryFunctions"
            />
            <CountryFull
                v-if="isViewingIndividual && currentCountry !== undefined"
                :country="currentCountry"
                :all-countries-codes="allCountriesCodes"
                :current-country-functions="currentCountryFunctions"
                :prefers-dark-mode="prefersDarkMode"
            />
        </body>
    </html>
</template>

<style scoped>
/* Loading component taken from W3Schools */
.loader {
    border: 6px solid #f3f3f3; /* Light grey */
    border-top: 6px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
