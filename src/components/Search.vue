<script setup lang="ts">
import { watch } from "fs";
import { nextTick, PropType, ref } from "vue";
import { CountryStore, CurrentCountryFunctions } from "../App.vue";
// @ts-expect-error
import { search } from "../search/countryData";

const props = defineProps({
    allCountries: {
        required: true,
        type: Object as PropType<CountryStore>,
    },
    currentCountryFunctions: {
        required: true,
        type: Object as PropType<CurrentCountryFunctions>,
    },
});

// No type checking because of trie-search library not supporting Typescript.
// message : string
const message = ref("");
// matches : string[]
const matches = ref<string[]>(new Array());

/*
@param {string} str
*/
function updateChange(str: string): void {
    matches.value = new Array();
    // @ts-expect-error
    search(str).forEach((x) => matches.value.push(x));
}
// Ref for focusing input
const searchinput = ref<HTMLInputElement | undefined>(undefined);

// Ref for handling focus on/off
const isfocused = ref<boolean>(false);

function focus() {
    if (searchinput.value !== undefined) searchinput.value.focus();
}

function goToCountryPage(countryName: string) {
    const country = props.allCountries.countries.get(countryName);
    if (country !== undefined) {
        props.currentCountryFunctions.setCurrentCountry(country);
        props.currentCountryFunctions.toggleIsViewingIndividual();
    }
}
</script>

<template>
    <div>
        <div
            class="flex items-center bg-lmelements dark:bg-dmelements cursor-text"
            @click="focus"
        >
            <span class="ml-5 material-symbols-outlined"> search </span>
            <input
                ref="searchinput"
                class="bg-lmelements dark:bg-dmelements w-[300px] py-3 px-4 focus:outline-none"
                @input="updateChange(message)"
                @focus="isfocused = true"
                @blur="isfocused = false"
                type="text"
                placeholder="Search for a country..."
                v-model="message"
            />
        </div>

        <div v-if="isfocused" class="bg:lmelements dark:bg-dmelements z-10">
            <ul class="relative">
                <li
                    class="absolute bg-slate-100 dark:bg-dmelements w-[344px] pl-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 h-[50px] leading-[50px]"
                    :style="'top:' + index * 50 + 'px'"
                    @mousedown="goToCountryPage(x)"
                    v-for="(x, index) in matches"
                >
                    {{ x }}
                </li>
            </ul>
        </div>
    </div>
</template>
