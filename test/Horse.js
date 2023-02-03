const Horse = artifacts.require("Horse");
const Farmer = artifacts.require("Farmer");

contract("Horse and Farmer", (accounts) => {
    it("Horse has the correct name.", async () => {
        const horseInstance = await Horse.deployed();
        const horseName = await horseInstance.getName.call();
        assert.isNotEmpty(horseName, "name cannot be empty");
    });
    it("Horse can sleep.", async () => {
        const horseInstance = await Horse.deployed();
        const horseSleep = await horseInstance.sleep.call();
        assert.equal(horseSleep, "Z-z-z...", "Horse must be sleepble")
    });
    it("Horse can eat “plant”.", async () => {
        const horseInstance = await Horse.deployed();
        const horseEat = await horseInstance.eat.call("plant");
        assert.equal(horseEat, "Animal eats plant", "Horse must eat plant");

    });
    it("Horse cannot eat ”meat”, ”not-food”, ”plastic”.", async () => {
        const horseInstance = await Horse.deployed();
        let errMeat, errNotFood, errPlastic = '';
        try {
            await horseInstance.eat.call("meat");
        } catch (error) {
            errMeat = error
        }
        try {
            await horseInstance.eat.call("not-food");
        } catch (error) {
            errNotFood = error
        }
        try {
            await horseInstance.eat.call("plastic");
        } catch (error) {
            errPlastic = error
        }
        assert.isTrue(errMeat instanceof Error, "Horse must not eat meat")
        assert.isTrue(errNotFood instanceof Error, "Horse must not eat not-food")
        assert.isTrue(errPlastic instanceof Error, "Horse must not eat plastic")
    });
    it("Farmer can call Horse, Horse responds correctly", async () => {
        const horseInstance = await Horse.deployed();
        const farmerInstance = await Farmer.deployed();
        const horseResponse = await farmerInstance.call.call(horseInstance.address);
        assert.equal(horseResponse, "Igogo", "Horse must responde Igogo")
    });
    it("Farmer can feed Horse with plant", async () => {
        const horseInstance = await Horse.deployed();
        const farmerInstance = await Farmer.deployed();
        const response = await farmerInstance.feed.call(horseInstance.address, "plant");
        assert.equal(response, "Animal eats plant", "Farmer must have ability to feed horse by plant")
    });
    it("Farmer cannot feed Horse with anything else", async () => {
        const horseInstance = await Horse.deployed();
        const farmerInstance = await Farmer.deployed();
        let err = '';
        try {
            await farmerInstance.feed.call(horseInstance.address, "plant8");
        } catch (error) {
            err = error
        }
        assert.isTrue(err instanceof Error, "Farmer must have ability to feed horse only plant");
    });
});
