import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCountrys, kerry } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Country Model tests", () => {
    setup(async () => {
        db.init("mongo");
        await db.countryStore.deleteAllCountrys();
        for (let i = 0; i < testCountrys.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testCountrys[i] = await db.countryStore.addCountry(testCountrys[i]);
        }
    });

    test("create a country", async () => {
        const country = await db.countryStore.addCountry(kerry);
        assertSubset(kerry, country);
        assert.isDefined(country._id);
    });

    test("delete all countrys", async () => {
        let returnedCountrys = await db.countryStore.getAllCountrys();
        assert.equal(returnedCountrys.length, 3);
        await db.countryStore.deleteAllCountrys();
        returnedCountrys = await db.countryStore.getAllCountrys();
        assert.equal(returnedCountrys.length, 0);
    });

    test("get a country - success", async () => {
        const country = await db.countryStore.addCountry(kerry);
        const returnedCountry = await db.countryStore.getCountryById(country._id);
        assertSubset(kerry, country);
    });

    test("delete One Country - success", async () => {
        const id = testCountrys[0]._id;
        await db.countryStore.deleteCountryById(id);
        const returnedCountrys = await db.countryStore.getAllCountrys();
        assert.equal(returnedCountrys.length, testCountrys.length - 1);
        const deletedCountry = await db.countryStore.getCountryById(id);
        assert.isNull(deletedCountry);
    });

    test("get a country - bad params", async () => {
        assert.isNull(await db.countryStore.getCountryById(""));
        assert.isNull(await db.countryStore.getCountryById());
    });

    test("delete One Country - fail", async () => {
        await db.countryStore.deleteCountryById("bad-id");
        const allCountrys = await db.countryStore.getAllCountrys();
        assert.equal(testCountrys.length, allCountrys.length);
    });
});
