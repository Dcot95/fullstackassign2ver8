import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { countryController } from "./controllers/country-controller.js";
import { pointofinterestController } from "./controllers/pointofinterest-controller.js";
import { reviewController } from "./controllers/review-controller.js";

export const webRoutes = [
    { method: "GET", path: "/", config: accountsController.index },
    { method: "GET", path: "/signup", config: accountsController.showSignup },
    { method: "GET", path: "/login", config: accountsController.showLogin },
    { method: "GET", path: "/logout", config: accountsController.logout },
    { method: "POST", path: "/register", config: accountsController.signup },
    { method: "POST", path: "/authenticate", config: accountsController.login },

    { method: "GET", path: "/about", config: aboutController.index },

    { method: "GET", path: "/dashboard", config: dashboardController.index },
    { method: "POST", path: "/dashboard/addcountry", config: dashboardController.addCountry },
    { method: "GET", path: "/dashboard/deletecountry/{id}", config: dashboardController.deleteCountry },

    { method: "GET", path: "/country/{id}", config: countryController.index },
    { method: "POST", path: "/country/{id}/addpointofinterest", config: countryController.addPointofinterest },
    { method: "GET", path: "/country/{id}/deletepointofinterest/{pointofinterestid}", config: countryController.deletePointofinterest },

    { method: "GET", path: "/pointofinterest/{id}/editpointofinterest/{pointofinterestid}", config: pointofinterestController.index },
    { method: "POST", path: "/pointofinterest/{id}/updatepointofinterest/{pointofinterestid}", config: pointofinterestController.update },
    { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" } }, options: { auth: false } },
    { method: "POST", path: "/country/{id}/uploadimage", config: countryController.uploadImage },

    { method: "POST", path: "/country/{id}/addreview", config: countryController.addReview },
    { method: "GET", path: "/country/{id}/deletereview/{reviewid}", config: countryController.deleteReview },

    { method: "GET", path: "/review/{id}/editreview/{reviewid}", config:reviewController.index },
    { method: "POST", path: "/review/{id}/updatereview/{reviewid}", config: reviewController.update },
];
