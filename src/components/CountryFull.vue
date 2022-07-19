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
    <button @click="currentCountryFunctions.toggleIsViewingIndividual">
        Back
    </button>
    <div>
        <div>
            <img
                :src="country['flags']['png']"
                :alt="`Flag of ${country['name']['common']}`"
            />
        </div>
        <div>
            <p>{{ country["name"]["common"] }}</p>
            <div>
                <p><span>Native name: </span>{{ getNativeName(country) }}</p>
                <p><span>Population: </span>{{ country["population"] }}</p>
                <p><span>Region: </span>{{ country["region"] }}</p>
                <p><span>Sub Region: </span>{{ country["subregion"] }}</p>
                <p>
                    <span>Capital: </span
                    >{{ getCapital(country) || "No capital" }}
                </p>
                <p>
                    <span>Top Level Domain: </span
                    >{{ getDomain(country) || "No domain" }}
                </p>
                <p><span>Currencies: </span>{{ getCurrencies(country) }}</p>
                <p><span>Language: </span>{{ getLanguages(country) }}</p>
            </div>
            <div>
                Border countries:
                <span v-if="borderCountries === undefined"
                    >{{ country["name"]["common"] }} does not border any other
                    countries!</span
                >
                <button
                    v-if="borderCountries !== undefined"
                    v-for="c in getBorders(country)"
                    @click="currentCountryFunctions.setCurrentCountry(c)"
                >
                    {{ c["name"]["common"] }}
                </button>
            </div>
        </div>
    </div>
</template>
