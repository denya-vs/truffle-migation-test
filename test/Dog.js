const Dog = artifacts.require("Dog");
const Farmer = artifacts.require("Farmer");

contract("Dog and Farmer", (accounts) => {
    it("Dog has the correct name.", async () => {
        const dogInstance = await Dog.deployed();
        const dogName = await dogInstance.getName.call();
        assert.isNotEmpty(dogName, "name cannot be empty");
    });
    it("Dog can sleep.", async () => {
        const dogInstance = await Dog.deployed();
        const dogSleep = await dogInstance.sleep.call();
        assert.equal(dogSleep, "Z-z-z...", "Dog must be sleepble")
    });
    it("Dog can eat “plant”.", async () => {
        const dogInstance = await Dog.deployed();
        const dogEat = await dogInstance.eat.call("plant");
        assert.equal(dogEat, "Animal eats plant", "Dog must eat plant");

    });
    it("Dog can eat “meat”.", async () => {
        const dogInstance = await Dog.deployed();
        const dogEat = await dogInstance.eat.call("meat");
        assert.equal(dogEat, "Animal eats meat", "Dog must eat meat");

    });
    it("Dog cannot eat ”not-food”, ”plastic”, ”chocolate”.", async () => {
        const dogInstance = await Dog.deployed();
        let errMeat, errNotFood, errPlastic = '';
        try {
            await dogInstance.eat.call("not-food");
        } catch (error) {
            errNotFood = error
        }
        try {
            await dogInstance.eat.call("plastic");
        } catch (error) {
            errPlastic = error
        }
        try {
            await dogInstance.eat.call("chocolate");
        } catch (error) {
            errMeat = error
        }
        assert.isTrue(errNotFood instanceof Error, "Dog must not eat not-food")
        assert.isTrue(errPlastic instanceof Error, "Dog must not eat plastic")
        assert.isTrue(errMeat instanceof Error, "Dog must not eat chocolate")
    });
    it("Farmer can call Dog, Dog responds correctly", async () => {
        const dogInstance = await Dog.deployed();
        const farmerInstance = await Farmer.deployed();
        const dogResponse = await farmerInstance.call.call(dogInstance.address);
        assert.equal(dogResponse, "Woof", "Dog must responde Woof")
    });
    it("Farmer can feed Dog with ”meat”,”plant”", async () => {
        const dogInstance = await Dog.deployed();
        const farmerInstance = await Farmer.deployed();
        const responsePlant = await farmerInstance.feed.call(dogInstance.address, "plant");
        const responseMeat = await farmerInstance.feed.call(dogInstance.address, "meat");
        assert.equal(responsePlant, "Animal eats plant", "Farmer must have ability to feed Dog by plant")
        assert.equal(responseMeat, "Animal eats meat", "Farmer must have ability to feed Dog by meat")
    });
    it("Farmer cannot feed Dog with ”not-food”, ”plastic” and anything else.", async () => {
        const dogInstance = await Dog.deployed();
        const farmerInstance = await Farmer.deployed();
        let errElse, errNotFood, errPlastic = '';
        try {
            await farmerInstance.feed.call(dogInstance.address, "not-food");
        } catch (error) {
            errNotFood = error
        }
        try {
            await farmerInstance.feed.call(dogInstance.address, "plastic");
        } catch (error) {
            errPlastic = error
        }
        try {
            await farmerInstance.feed.call(dogInstance.address, "plant8");
        } catch (error) {
            errElse = error
        }
        assert.isTrue(errNotFood instanceof Error, "Farmer cannot feed Dog not-food");
        assert.isTrue(errPlastic instanceof Error, "Farmer cannot feed Dog plastic");
        assert.isTrue(errElse instanceof Error, "Farmer cannot feed Dog plant8");
    });
});
