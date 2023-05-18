import { v4 } from "uuid";
// eslint-disable-next-line import/no-unresolved
import { JSONFile, Low } from "lowdb";

const db = new Low(new JSONFile("./src/models/json/pointofinterests.json"));
db.data = { pointofinterests: [] };

export const pointofinterestJsonStore = {
    async getAllPointofinterests() {
        await db.read();
        return db.data.pointofinterests;
    },

    async addPointofinterest(countryId, pointofinterest) {
        await db.read();
        pointofinterest._id = v4();
        pointofinterest.countryid = countryId;
        db.data.pointofinterests.push(pointofinterest);
        await db.write();
        return pointofinterest;
    },

    async getPointofinterestsByCountryId(id) {
        await db.read();
        return db.data.pointofinterests.filter((pointofinterest) => pointofinterest.countryid === id);
    },

    async getPointofinterestById(id) {
        await db.read();
        let pointofinterest = db.data.pointofinterests.find((pointofinterest) => pointofinterest._id === id);
        if (pointofinterest == undefined) {
            pointofinterest = null;
        }
        return pointofinterest;
    },

    async deletePointofinterest(id) {
        await db.read();
        const index = db.data.pointofinterests.findIndex((pointofinterest) => pointofinterest._id === id);
        if (index !== -1) db.data.pointofinterests.splice(index, 1);
        await db.write();
    },

    async deleteAllPointofinterests() {
        db.data.pointofinterests = [];
        await db.write();
    },

    async updatePointofinterest(pointofinterest, updatedPointofinterest) {
        pointofinterest.title = updatedPointofinterest.title;
        pointofinterest.county = updatedPointofinterest.county;
        pointofinterest.description = updatedPointofinterest.description;
        pointofinterest.latitude = updatedPointofinterest.latitude;
        pointofinterest.longitude = updatedPointofinterest.longitude;
        await db.write();
    },
};
