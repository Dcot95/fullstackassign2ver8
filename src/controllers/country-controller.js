import { PointofinterestSpec, ReviewSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { imageStore } from "../models/image-store.js";

export const countryController = {
    index: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const viewData = {
                title: "Country",
                country: country,
            };
            return h.view("country-view", viewData);
        },
    },

    addPointofinterest: {
        validate: {
            payload: PointofinterestSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("country-view", { title: "Add pointofinterest error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const newPointofinterest = {
                title: request.payload.title,
                county: request.payload.county,
                description: request.payload.description,
                latitude: Number(request.payload.latitude),
                longitude: Number(request.payload.longitude),
            };
            await db.pointofinterestStore.addPointofinterest(country._id, newPointofinterest);
            return h.redirect(`/country/${country._id}`);
        },
    },

    deletePointofinterest: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            await db.pointofinterestStore.deletePointofinterest(request.params.pointofinterestid);
            return h.redirect(`/country/${country._id}`);
        },
    },
    uploadImage: {
        handler: async function (request, h) {
            try {
                const country = await db.countryStore.getCountryById(request.params.id);
                const file = request.payload.imagefile;
                if (Object.keys(file).length > 0) {
                    const url = await imageStore.uploadImage(request.payload.imagefile);
                    country.img = url;
                    await db.countryStore.updateCountry(country);
                }
                return h.redirect(`/country/${country._id}`);
            } catch (err) {
                console.log(err);
                return h.redirect(`/country/${country._id}`);
            }
        },
        payload: {
            multipart: true,
            output: "data",
            maxBytes: 209715200,
            parse: true,
        },
    },
    addReview: {
        validate: {
            payload: ReviewSpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("country-view", { title: "Add review error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            const newReview = {
                title: request.payload.title,
                comment: request.payload.comment,
                rating: Number(request.payload.rating),
            };
            await db.reviewStore.addReview(country._id, newReview);
            return h.redirect(`/country/${country._id}`);
        },
    },

    deleteReview: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            await db.reviewStore.deleteReview(request.params.reviewid);
            return h.redirect(`/country/${country._id}`);
        },
    },
};
