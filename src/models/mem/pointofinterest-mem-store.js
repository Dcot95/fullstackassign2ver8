import { v4 } from "uuid";

let pointofinterests = [];

export const pointofinterestMemStore = {
    async getAllPointofinterests() {
        return pointofinterests;
    },

    async addPointofinterest(countryId, pointofinterest) {
        pointofinterest._id = v4();
        pointofinterest.countryid = countryId;
        pointofinterests.push(pointofinterest);
        return pointofinterest;
    },

    async getPointofinterestsByCountryId(id) {
        return pointofinterests.filter((pointofinterest) => pointofinterest.countryid === id);
    },

    async getPointofinterestById(id) {
        let pointofinterest = pointofinterests.find((pointofinterest) => pointofinterest._id === id);
        if (pointofinterest == undefined) {
            pointofinterest = null;
        }
        return pointofinterest;
    },

    async getCountryPointofinterests(CountryId) {
        return pointofinterests.filter((pointofinterest) => pointofinterest.countryid === countryId);
    },

    async deletePointofinterest(id) {
        const index = pointofinterests.findIndex((pointofinterest) => pointofinterest._id === id);
        if (index !== -1) pointofinterests.splice(index, 1);
    },

    async deleteAllPointofinterests() {
        pointofinterests = [];
    },

    async updatePointofinterest(pointofinterest, updatedPointofinterest) {
        pointofinterest.title = updatedPointofinterest.title;
        pointofinterest.county = updatedPointofinterest.county;
        pointofinterest.description = updatedPointofinterest.description;
        pointofinterest.latitude = updatedPointofinterest.latitude;
        pointofinterest.longitude = updatedPointofinterest.longitude;
    },
};
