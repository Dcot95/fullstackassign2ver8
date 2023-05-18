import { Country } from "./country.js";
import { pointofinterestMongoStore } from "./pointofinterest-mongo-store.js";
import { reviewMongoStore } from "./review-mongo-store.js";

export const countryMongoStore = {
    async getAllCountrys() {
        const countrys = await Country.find().lean();
        return countrys;
    },

    async getCountryById(id) {
        if (id) {
            const country = await Country.findOne({ _id: id }).lean();
            if (country) {
                country.pointofinterests = await pointofinterestMongoStore.getPointofinterestsByCountryId(country._id);
                country.reviews = await reviewMongoStore.getReviewsByCountryId(country._id);
            }
            return country;
        }
        return null;
    },

    async addCountry(country) {
        const newCountry = new Country(country);
        const countryObj = await newCountry.save();
        return this.getCountryById(countryObj._id);
    },

    async getUserCountrys(id) {
        const country = await Country.find({ userid: id }).lean();
        return country;
    },

    async deleteCountryById(id) {
        try {
            await Country.deleteOne({ _id: id });
        } catch (error) {
            console.log("bad id");
        }
    },

    async deleteAllCountrys() {
        await Country.deleteMany({});
    },
    async updateCountry(updatedCountry) {
        const country = await Country.findOne({ _id: updatedCountry._id });
        country.title = updatedCountry.title;
        country.img = updatedCountry.img;
        await country.save();
    },
};
