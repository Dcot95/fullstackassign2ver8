import { CountrySpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const countrys = await db.countryStore.getUserCountrys(loggedInUser._id);
            const viewData = {
                title: "Placemark Dashboard",
                user: loggedInUser,
                countrys: countrys,
            };
            return h.view("dashboard-view", viewData);
        },
    },

    addCountry: {
        validate: {
            payload: CountrySpec,
            options: { abortEarly: false },
            failAction: function (request, h, error) {
                return h.view("dashboard-view", { title: "Add Country error", errors: error.details }).takeover().code(400);
            },
        },
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const newCountry = {
                userid: loggedInUser._id,
                title: request.payload.title,
            };
            await db.countryStore.addCountry(newCountry);
            return h.redirect("/dashboard");
        },
    },

    deleteCountry: {
        handler: async function (request, h) {
            const country = await db.countryStore.getCountryById(request.params.id);
            await db.countryStore.deleteCountryById(country._id);
            return h.redirect("/dashboard");
        },
    },
};
