import { v4 } from "uuid";
import { pointofinterestMemStore } from "./pointofinterest-mem-store.js";

let countrys = [];

export const countryMemStore = {
    async getAllCountrys() {
        return countrys;
    },

    async addCountry(country) {
        country._id = v4();
        countrys.push(country);
        return country;
    },

    async getCountryById(id) {
        const list = countrys.find((country) => country._id === id);
        if (list) {
            list.pointofinterests = await pointofinterestMemStore.getPointofinterestsByCountryId(list._id);
            return list;
        }
        return null;
    },

    async getUserCountrys(userid) {
        return countrys.filter((country) => country.userid === userid);
    },

    async deleteCountryById(id) {
        const index = countrys.findIndex((country) => country._id === id);
        if (index !== -1) countrys.splice(index, 1);
    },

    async deleteAllCountrys() {
        countrys = [];
    },
};
