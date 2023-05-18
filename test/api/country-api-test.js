import { assert } from "chai";
import { placemarkService } from "./placemark-service.js";
import { assertSubset } from "../test-utils.js";

import { maggie, maggieCredentials, kerry, testCountrys } from "../fixtures.js";

suite("Country API tests", () => {
    let user = null;

    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllCountrys();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        kerry.userid = user._id;
    });

    teardown(async () => {});

    test("create country", async () => {
        const returnedCountry = await placemarkService.createCountry(kerry);
        assert.isNotNull(returnedCountry);
        assertSubset(kerry, returnedCountry);
    });

    test("delete a country", async () => {
        const country = await placemarkService.createCountry(kerry);
        const response = await placemarkService.deleteCountry(country._id);
        assert.equal(response.status, 204);
        try {
            const returnedCountry = await placemarkService.getCountry(country.id);
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
        }
    });

    test("create multiple countrys", async () => {
        for (let i = 0; i < testCountrys.length; i += 1) {
            testCountrys[i].userid = user._id;
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createCountry(testCountrys[i]);
        }
        let returnedLists = await placemarkService.getAllCountrys();
        assert.equal(returnedLists.length, testCountrys.length);
        await placemarkService.deleteAllCountrys();
        returnedLists = await placemarkService.getAllCountrys();
        assert.equal(returnedLists.length, 0);
    });

    test("remove non-existant country", async () => {
        try {
            const response = await placemarkService.deleteCountry("not an id");
            assert.fail("Should not return a response");
        } catch (error) {
            assert(error.response.data.message === "No Country with this id", "Incorrect Response Message");
        }
    });
});
