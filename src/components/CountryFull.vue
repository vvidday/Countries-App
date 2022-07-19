<script setup lang="ts">
import { PropType } from "vue";
import { Country } from "../api/interfaces";
import { CountryCodeStore, CurrentCountryFunctions } from "../App.vue";

const props = defineProps({
    country: {
        required: true,
        type: Object as PropType<Country>,
    },
    allCountriesCodes: {
        required: true,
        type: Object as PropType<CountryCodeStore>,
    },
    currentCountryFunctions: {
        required: true,
        type: Object as PropType<CurrentCountryFunctions>,
    },
});

const getNativeName = (country: Country): string | undefined => {
    for (const key in country["name"]["nativeName"]) {
        return country["name"]["nativeName"][key]["common"];
    }
};
const getCapital = (country: Country): string | undefined => {
    if (country["capital"] === undefined) return undefined;
    else return country["capital"][0];
};
const getDomain = (country: Country): string | undefined => {
    if (country["tld"] === undefined) return undefined;
    else return country["tld"][0];
};
const getCurrencies = (country: Country): string => {
    const answer: String[] = [];
    for (const key in country["currencies"]) {
        answer.push(country["currencies"][key]["name"]);
    }
    return answer.join(", ");
};
const getLanguages = (country: Country): string => {
    const answer: String[] = [];
    for (const key in country["languages"]) {
        answer.push(country["languages"][key]);
    }
    return answer.sort().join(", ");
};
const getBorders = (country: Country): Country[] | undefined => {
    if (country["borders"] === undefined) return undefined;
    const answer: Country[] = [];
    for (const code of country["borders"]) {
        const c: Country | undefined =
            props.allCountriesCodes.countries.get(code);
        if (c !== undefined) answer.push(c);
    }
    return answer;
};
const borderCountries = getBorders(props.country);
</script>

<template>
    <div
        class="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 justify-items-center my-10"
    >
        <div class="w-[320px] lg:w-3/5">
            <button
                class="bg-lmelements dark:bg-dmelements px-6 py-1.5 shadow-lg hover:bg-slate-600"
                @click="currentCountryFunctions.toggleIsViewingIndividual"
            >
                ← Back
            </button>
        </div>
    </div>

    <div
        class="grid grid-cols-1 lg:grid-cols-2 grid-rows-1 text-base justify-items-center items-center"
    >
        <div class="w-full">
            <img
                class="m-auto lg:w-3/5"
                :src="country['flags']['png']"
                :alt="`Flag of ${country['name']['common']}`"
            />
        </div>
        <div
            class="flex-col items-center lg:pr-20 w-[320px] mt-5 lg:w-auto lg:mt-0"
        >
            <p class="font-extrabold text-2xl mb-4">
                {{ country["name"]["common"] }}
            </p>
            <div class="flex flex-col lg:flex-row justify-between">
                <div class="lg:mr-10 xl:mr-36">
                    <p class="my-2">
                        <span class="font-semibold">Native name: </span
                        >{{ getNativeName(country) }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Population: </span
                        >{{ country["population"] }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Region: </span
                        >{{ country["region"] }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Sub Region: </span
                        >{{ country["subregion"] }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Capital: </span
                        >{{ getCapital(country) || "No capital" }}
                    </p>
                </div>
                <div>
                    <p class="my-2">
                        <span class="font-semibold">Top Level Domain: </span
                        >{{ getDomain(country) || "No domain" }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Currencies: </span
                        >{{ getCurrencies(country) }}
                    </p>
                    <p class="my-2">
                        <span class="font-semibold">Language: </span
                        >{{ getLanguages(country) }}
                    </p>
                </div>
            </div>
            <div
                class="flex flex-col w-[320px] lg:w-auto mt-5 font-semibold lg:flex-row lg:items-center"
            >
                <p class="mr-5">
                    Border countries:
                    <span v-if="borderCountries === undefined"
                        >{{ country["name"]["common"] }} does not border any
                        other countries!</span
                    >
                </p>
                <div>
                    <button
                        v-if="borderCountries !== undefined"
                        v-for="c in getBorders(country)"
                        @click="currentCountryFunctions.setCurrentCountry(c)"
                        class="font-light px-4 py-1.5 mr-2 my-2 bg-lmelements dark:bg-dmelements hover:bg-slate-600"
                    >
                        {{ c["name"]["common"] }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
