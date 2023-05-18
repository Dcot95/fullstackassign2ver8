import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { placemarkService } from "./placemark-service.js";
import { maggie, maggieCredentials, kerry, testCountrys, testPointofinterests, hillwalk } from "../fixtures.js";

suite("Pointofinterest API tests", () => {
    let user = null;
    let canada = null;

    setup(async () => {
        placemarkService.clearAuth();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        await placemarkService.deleteAllCountrys();
        await placemarkService.deleteAllPointofinterests();
        await placemarkService.deleteAllUsers();
        user = await placemarkService.createUser(maggie);
        await placemarkService.authenticate(maggieCredentials);
        kerry.userid = user._id;
        canada = await placemarkService.createCountry(kerry);
    });

    teardown(async () => {});

    test("create pointofinterest", async () => {
        const returnedPointofinterest = await placemarkService.createPointofinterest(canada._id, hillwalk);
        assertSubset(hillwalk, returnedPointofinterest);
    });

    test("create Multiple pointofinterests", async () => {
        for (let i = 0; i < testPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPointofinterest(canada._id, testPointofinterests[i]);
        }
        const returnedPointofinterests = await placemarkService.getAllPointofinterests();
        assert.equal(returnedPointofinterests.length, testPointofinterests.length);
        for (let i = 0; i < returnedPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const pointofinterest = await placemarkService.getPointofinterest(returnedPointofinterests[i]._id);
            assertSubset(pointofinterest, returnedPointofinterests[i]);
        }
    });

    test("Delete PointofinterestApi", async () => {
        for (let i = 0; i < testPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPointofinterest(canada._id, testPointofinterests[i]);
        }
        let returnedPointofinterests = await placemarkService.getAllPointofinterests();
        assert.equal(returnedPointofinterests.length, testPointofinterests.length);
        for (let i = 0; i < returnedPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            const pointofinterest = await placemarkService.deletePointofinterest(returnedPointofinterests[i]._id);
        }
        returnedPointofinterests = await placemarkService.getAllPointofinterests();
        assert.equal(returnedPointofinterests.length, 0);
    });

    test("denormalised country", async () => {
        for (let i = 0; i < testPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            await placemarkService.createPointofinterest(canada._id, testPointofinterests[i]);
        }
        const returnedCountry = await placemarkService.getCountry(canada._id);
        assert.equal(returnedCountry.pointofinterests.length, testPointofinterests.length);
        for (let i = 0; i < testPointofinterests.length; i += 1) {
            assertSubset(testPointofinterests[i], returnedCountry.pointofinterests[i]);
        }
    });
});
