import axios, { AxiosError } from "axios";
import { Country } from "./interfaces";

const BASE: string = "https://restcountries.com/v3.1/";

// GET by full name
export const getSingleCountry = async (country: string): Promise<Country[]> => {
    try {
        const data = await axios.get(BASE + `/name/${country}`, {
            params: { fullText: true },
        });
        return data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            // Returns 404 if nothing is found
            if (err.code === "ERR_BAD_REQUEST") {
                return [];
            } else return Promise.reject(err);
        } else {
            return Promise.reject(err);
        }
    }
};

// GET partial search
export const getCountry = async (country: string): Promise<Country[]> => {
    try {
        const data = await axios.get(BASE + `/name/${country}`);
        return data.data;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            // Returns 404 if nothing is found
            if (err.code === "ERR_BAD_REQUEST") {
                return [];
            } else return Promise.reject(err);
        } else {
            return Promise.reject(err);
        }
    }
};

// GET All
export const getAllCountries = async (): Promise<Country[]> => {
    try {
        const data = await axios.get(BASE + `/all`);
        return data.data;
    } catch (err) {
        return Promise.reject(err);
    }
};
