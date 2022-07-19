<script setup lang="ts">
import { PropType, ref } from "vue";
import { NavFunctions } from "../App.vue";

const props = defineProps({
    prefersDarkMode: {
        required: true,
        type: Boolean,
    },
    navFunctions: {
        required: true,
        type: Object as PropType<NavFunctions>,
    },
});
</script>

<template>
    <div
        class="bg-lmelements dark:bg-dmelements flex justify-between py-5 px-5 bp1:px-10 lg:px-20"
    >
        <p
            class="bp1:text-xl font-extrabold cursor-pointer p-2"
            @click="navFunctions.toHomePage()"
        >
            Where in the world?
        </p>
        <div
            class="flex items-center cursor-pointer rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 p-2"
            @click="navFunctions.toggleDarkMode()"
        >
            <span v-if="prefersDarkMode" class="material-symbols-outlined mr-2">
                dark_mode
            </span>
            <span v-if="prefersDarkMode">Dark Mode</span>
            <span
                v-if="!prefersDarkMode"
                class="material-symbols-outlined mr-2"
            >
                light_mode
            </span>
            <span v-if="!prefersDarkMode">Light Mode</span>
        </div>
    </div>
</template>
