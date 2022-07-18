import { expect, it, TestContext } from "vitest";
import {
    getSingleCountry,
    getAllCountries,
    getCountry,
} from "../api/countries";
import { Country } from "../api/interfaces";

// getSingleCountry()
it("should get italy", async (ctx) => {
    const response = await getSingleCountry("italy");
    expect(response.length).toBe(1);
    expect(response[0]["name"]["common"]).toBe("Italy");
});

it("should return an empty array on a query that finds nothing", async (ctx) => {
    const response = await getSingleCountry("den");
    expect(response.length).toBe(0);
});

// getCountry()
it("should get 5 results from den query", async (ctx) => {
    const response = await getCountry("den");
    expect(response.length).toBe(5);
});

it("should return an empty array on a query that finds nothing", async (ctx) => {
    const response = await getCountry("xxxx");
    expect(response.length).toBe(0);
});

// getAllCountries()
it("should return the correct number of results", async (ctx) => {
    const response = await getAllCountries();
    expect(response.length).toBe(250);
});
