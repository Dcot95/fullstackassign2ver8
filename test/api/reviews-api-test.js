import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, kerry, testCountrys, testReviews, hillwalkr } from "../fixtures.js";

suite("Review API tests", () => {
    let user = null;
    let brazil = null;

    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllCountrys();
        await placemarkService.deleteAllReviews();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        kerry.userid = user._id;
        brazil = await placemarkService.createCountry(kerry);
    });

    teardown(async () => {});

    test("create review", async () => {
        const returnedReview = await placemarkService.createReview(brazil._id, hillwalkr);
        assertSubset(hillwalkr, returnedReview);
    });

    test("create Multiple reviews", async () => {
        for (let i = 0; i < testReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createReview(brazil._id, testReviews[i]);
        }
        const returnedReviews = await placemarkService.getAllReviews();
        assert.equal(returnedReviews.length, testReviews.length);
        for (let i = 0; i < returnedReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const review = await placemarkService.getReview(returnedReviews[i]._id);
            assertSubset(review, returnedReviews[i]);
        }
    });

    test("Delete ReviewApi", async () => {
        for (let i = 0; i < testReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createReview(brazil._id, testReviews[i]);
        }
        let returnedReviews = await placemarkService.getAllReviews();
        assert.equal(returnedReviews.length, testReviews.length);
        for (let i = 0; i < returnedReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const review = await placemarkService.deleteReview(returnedReviews[i]._id);
        }
        returnedReviews = await placemarkService.getAllReviews();
        assert.equal(returnedReviews.length, 0);
    });
});
