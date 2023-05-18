import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";
import { pointofinterestJsonStore } from "./pointofinterest-json-store.js";

const db = new Low(new JSONFile("./src/models/json/countrys.json"));
db.data = { countrys: [] };

export const countryJsonStore = {
    async getAllCountrys() {
        await db.read();
        return db.data.countrys;
    },

    async addCountry(country) {
        await db.read();
        country._id = v4();
        db.data.countrys.push(country);
        await db.write();
        return country;
    },

    async getCountryById(id) {
        await db.read();
        let list = db.data.countrys.find((country) => country._id === id);
        if (list) {
            list.pointofinterests = await pointofinterestJsonStore.getPointofinterestsByCountryId(list._id);
        } else {
            list = null;
        }
        return list;
    },

    async getUserCountrys(userid) {
        await db.read();
        return db.data.countrys.filter((country) => country.userid === userid);
    },

    async deleteCountryById(id) {
        await db.read();
        const index = db.data.countrys.findIndex((country) => country._id === id);
        if (index !== -1) db.data.countrys.splice(index, 1);
        await db.write();
    },

    async deleteAllCountrys() {
        db.data.countrys = [];
        await db.write();
    },
};
