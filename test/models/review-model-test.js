import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCountrys, testReviews, wales, kerry, hillwalkr, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Review Model tests", () => {
    let walesList = null;

    setup(async () => {
        await db.init("mongo");
        await db.countryStore.deleteAllCountrys();
        await db.reviewStore.deleteAllReviews();
        walesList = await db.countryStore.addCountry(wales);
        for (let i = 0; i < testReviews.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testReviews[i] = await db.reviewStore.addReview(walesList._id, testReviews[i]);
        }
    });

    test("create single review", async () => {
        const kerryList = await db.countryStore.addCountry(kerry);
        const review = await db.reviewStore.addReview(kerryList._id, hillwalkr);
        assert.isNotNull(review._id);
        assertSubset(hillwalkr, review);
    });

    test("create multiple reviewApi", async () => {
        const reviews = await db.countryStore.getCountryById(walesList._id);
        assert.equal(testReviews.length, testReviews.length);
    });

    test("delete all reviewApi", async () => {
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(testReviews.length, reviews.length);
        await db.reviewStore.deleteAllReviews();
        const newReviews = await db.reviewStore.getAllReviews();
        assert.equal(0, newReviews.length);
    });

    test("get a review - success", async () => {
        const kerryList = await db.countryStore.addCountry(kerry);
        const review = await db.reviewStore.addReview(kerryList._id, hillwalkr);
        const newReview = await db.reviewStore.getReviewById(review._id);
        assertSubset(hillwalkr, newReview);
    });

    test("delete One Review - success", async () => {
        const id = testReviews[0]._id;
        await db.reviewStore.deleteReview(id);
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(reviews.length, testCountrys.length - 1);
        const deletedReview = await db.reviewStore.getReviewById(id);
        assert.isNull(deletedReview);
    });

    test("get a country - bad params", async () => {
        assert.isNull(await db.reviewStore.getReviewById(""));
        assert.isNull(await db.reviewStore.getReviewById());
    });

    test("delete One User - fail", async () => {
        await db.reviewStore.deleteReview("bad-id");
        const reviews = await db.reviewStore.getAllReviews();
        assert.equal(reviews.length, testCountrys.length);
    });
});
