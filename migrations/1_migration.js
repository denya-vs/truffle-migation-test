const StringLibrary = artifacts.require("StringComparer");
const CowContract = artifacts.require("Cow");
const HorseContract = artifacts.require("Horse");
const DogContract = artifacts.require("Dog");
const WolfContract = artifacts.require("Wolf");
const FarmerContract = artifacts.require("Farmer");

let cowContract, horseContract, dogContract, wolfContract, farmerContract, stringLibrary = null
module.exports = async(deployer, network, accounts)=>{
    // deployment steps
    await deployer.deploy(StringLibrary);
    stringLibrary = await StringLibrary.deployed();
    deployer.link(stringLibrary, [CowContract, HorseContract, DogContract, WolfContract]);

    await deployer.deploy(CowContract, 'testCow');
    cowContract = await CowContract.deployed();

    await deployer.deploy(HorseContract, 'testHorse');
    horseContract = await HorseContract.deployed();

    await deployer.deploy(DogContract, 'testDog');
    dogContract = await DogContract.deployed();

    await deployer.deploy(WolfContract, 'testWolf');
    wolfContract = await WolfContract.deployed();

    await deployer.deploy(FarmerContract, 'testFarmer');
    farmerContract = await FarmerContract.deployed();

    // console.log(await call(cowContract.address));
    // console.log(await call(horseContract.address));
    // console.log(await feed(wolfContract.address, "plant"));
    // console.log(await feed(wolfContract.address, "meat"));

};

async function call(address) {
    return await farmerContract.call(address);
}
async function feed(address, food) {
    try {
        return await farmerContract.feed(address, food);
    } catch (e) {
        return e.message;
    }

}
