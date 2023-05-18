import { PointofinterestSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const pointofinterestController = {
    index: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const pointofinterest = await db.pointofinterestStore.getPointofinterestById(request.params.pointofinterestid);
            const viewData = {
                title: "Edit POI",
                country: country,
                pointofinterest: pointofinterest,
            };
            return h.view("pointofinterest-view", viewData);
        },
    },

    update: {
        validate: {
            payload: PointofinterestSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("pointofinterest-view", { title: "Edit pointofinterest error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const pointofinterest = await db.pointofinterestStore.getPointofinterestkById(request.params.pointofinterestid);
            const newPointofinterest = {
                title: request.payload.title,
                county: request.payload.county,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.pointofinterestStore.updatePointofinterest(pointofinterest, newPointofinterest);
            return h.redirect(`/country/${request.params.id}`);
        },
    },
};
