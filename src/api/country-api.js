import Boom from "@hapi/boom";
import { IdSpec, CountryArraySpec, CountrySpec, CountrySpecPlus } from "../models/joi-schemas.js";
import { db } from "../models/db.js";
import { validationError } from "./logger.js";

export const countryApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const countrys = await db.countryStore.getAllCountrys();
                return countrys;
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        response: { schema: CountryArraySpec, failAction: validationError },
        description: "Get all countrys",
        notes: "Returns all countrys",
    },

    findOne: {
        auth: {
            strategy: "jwt",
        },
        async handler(request) {
            try {
                const country = await db.countryStore.getCountryById(request.params.id);
                if (!country) {
                    return Boom.notFound("No Country with this id");
                }
                return country;
            } catch (err) {
                return Boom.serverUnavailable("No Country with this id");
            }
        },
        tags: ["api"],
        description: "Find a Country",
        notes: "Returns a country",
        validate: { params: { id: IdSpec }, failAction: validationError },
        response: { schema: CountrySpecPlus, failAction: validationError },
    },

    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const country = request.payload;
                const newCountry = await db.countryStore.addCountry(country);
                if (newCountry) {
                    return h.response(newCountry).code(201);
                }
                return Boom.badImplementation("error creating country");
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        tags: ["api"],
        description: "Create a Country",
        notes: "Returns the newly created country",
        validate: { payload: CountrySpec, failAction: validationError },
        response: { schema: CountrySpecPlus, failAction: validationError },
    },

    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const country = await db.countryStore.getCountryById(request.params.id);
                if (!country) {
                    return Boom.notFound("No Country with this id");
                }
                await db.countryStore.deleteCountryById(country._id);
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("No Country with this id");
            }
        },
        tags: ["api"],
        description: "Delete a country",
        validate: { params: { id: IdSpec }, failAction: validationError },
    },

    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.countryStore.deleteAllCountrys();
                return h.response().code(204);
            } catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    tags: ["api"],
    description: "Delete all CountryApi",
};
