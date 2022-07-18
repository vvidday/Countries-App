<script setup lang="ts">
import { PropType } from "vue";
import { Country } from "../api/interfaces";

defineProps({
    country: {
        required: true,
        type: Object as PropType<Country>,
    },
});
</script>

<template>
    <div>
        <div>
            <img
                :src="country['flags']['png']"
                :alt="`Flag of ${country['name']['common']}`"
            />
        </div>
        <div>
            <p>{{ country["name"]["common"] }}</p>
        </div>
        <div>
            <p>Population: {{ country["population"] }}</p>
            <p>Region: {{ country["region"] }}</p>
            <p>Capital: {{ country["capital"][0] }}</p>
        </div>
    </div>
</template>

<style scoped>
img {
    width: 267px;
    height: 160px;
    object-fit: fill;
    overflow: hidden;
    border-radius: 5px;
}
</style>
