import { assert } from "chai";
import { db } from "../../src/models/db.js";
import { testCountrys, testPointofinterests, wales, kerry, hillwalk, testUsers } from "../fixtures.js";
import { assertSubset } from "../test-utils.js";

suite("Pointofinterest Model tests", () => {
    let walesList = null;

    setup(async () => {
        await db.init("mongo");
        await db.countryStore.deleteAllCountrys();
        await db.pointofinterestStore.deleteAllPointofinterests();
        walesList = await db.countryStore.addCountry(wales);
        for (let i = 0; i < testPointofinterests.length; i += 1) {
            // eslint-disable-next-line no-await-in-loop
            testPointofinterests[i] = await db.pointofinterestStore.addPointofinterest(walesList._id, testPointofinterests[i]);
        }
    });

    test("create single pointofinterest", async () => {
        const kerryList = await db.countryStore.addCountry(kerry);
        const pointofinterest = await db.pointofinterestStore.addPointofinterest(kerryList._id, hillwalk);
        assert.isNotNull(pointofinterest._id);
        assertSubset(hillwalk, pointofinterest);
    });

    test("create multiple pointofinterestApi", async () => {
        const pointofinterests = await db.countryStore.getCountryById(walesList._id);
        assert.equal(testPointofinterests.length, testPointofinterests.length);
    });

    test("delete all pointofinterestApi", async () => {
        const pointofinterests = await db.pointofinterestStore.getAllPointofinterests();
        assert.equal(testPointofinterests.length, pointofinterests.length);
        await db.pointofinterestStore.deleteAllPointofinterests();
        const newPointofinterests = await db.pointofinterestStore.getAllPointofinterests();
        assert.equal(0, newPointofinterests.length);
    });

    test("get a pointofinterest - success", async () => {
        const kerryList = await db.countryStore.addCountry(kerry);
        const pointofinterest = await db.pointofinterestStore.addPointofinterest(kerryList._id, hillwalk);
        const newPointofinterest = await db.pointofinterestStore.getPointofinterestById(pointofinterest._id);
        assertSubset(hillwalk, newPointofinterest);
    });

    test("delete One Pointofinterest - success", async () => {
        const id = testPointofinterests[0]._id;
        await db.pointofinterestStore.deletePointofinterest(id);
        const pointofinterests = await db.pointofinterestStore.getAllPointofinterests();
        assert.equal(pointofinterests.length, testCountrys.length - 1);
        const deletedPointofinterest = await db.pointofinterestStore.getPointofinterestById(id);
        assert.isNull(deletedPointofinterest);
    });

    test("get a country - bad params", async () => {
        assert.isNull(await db.pointofinterestStore.getPointofinterestById(""));
        assert.isNull(await db.pointofinterestStore.getPointofinterestById());
    });

    test("delete One User - fail", async () => {
        await db.pointofinterestStore.deletePointofinterest("bad-id");
        const pointofinterests = await db.pointofinterestStore.getAllPointofinterests();
        assert.equal(pointofinterests.length, testCountrys.length);
    });
});
