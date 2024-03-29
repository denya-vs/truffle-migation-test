// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.17;

interface Living{
    function eat(string memory food) external returns(string memory);
}

contract HasName{
    string internal _name;
    constructor(string memory name){
        _name=name;
    }

    function getName() view public returns(string memory){
        return _name;
    }
}

abstract contract Animal is Living{

    function eat(string memory food) view virtual public returns(string memory){
        return string.concat(string.concat("Animal eats ",food));
    }

    function sleep() pure public returns(string memory){
        return "Z-z-z...";
    }

    function speak() view virtual public returns(string memory){
        return "...";
    }
}

library StringComparer{
    function compare(string memory str1, string memory str2) public pure returns (bool) {
        return keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
    }
}

abstract contract Herbivore is Animal, HasName{
    string constant PLANT = "plant";

    modifier eatOnlyPlant(string memory food){
        require(StringComparer.compare(food,PLANT),"Can only eat plant food");
        _;
    }

    function eat(string memory food) view virtual override public eatOnlyPlant(food) returns(string memory){
        return super.eat(food);
    }
}

abstract contract Carnivora is Animal{
    string constant MEAT = "meat";

    modifier eatOnlyMeat(string memory food){
        require(StringComparer.compare(food,MEAT),"Can only eat meat food");
        _;
    }
    function eat(string memory food) view virtual override public eatOnlyMeat(food) returns(string memory){
        return super.eat(food);
    }
}

abstract contract Omnivore is Herbivore, Carnivora{

    modifier eatOnlyMeatOrPlant(string memory food){
        require(StringComparer.compare(food,MEAT) || StringComparer.compare(food,PLANT),"Can only eat meat or plant food");
        _;
    }

    function eat(string memory food) view virtual override(Herbivore, Carnivora) public eatOnlyMeatOrPlant(food) returns(string memory){
        return Animal.eat(food);
    }
}

contract Cow is Herbivore{

    constructor(string memory name) HasName(name){
    }

    function speak() pure override public returns(string memory){
        return "Mooo";
    }
}

contract Horse is Herbivore{

    constructor(string memory name) HasName(name){
    }

    function speak() pure override public returns(string memory){
        return "Igogo";
    }

}

contract Wolf is Carnivora{

    function speak() pure override public returns(string memory){
        return "Awoo";
    }
}

contract Dog is Omnivore{
    string constant CHOCOLATE = "chocolate";

    constructor(string memory name) HasName(name){
    }

    modifier notEatChocolade(string memory food){
        require(!StringComparer.compare(food,CHOCOLATE),"Can not eat chocolate");
        _;
    }

    function speak() pure override public returns(string memory){
        return "Woof";
    }

    function eat(string memory food) view override public notEatChocolade(food) returns(string memory){
        return super.eat(food);
    }
}

contract Farmer{
    function feed(address animal, string memory food) view public returns(string memory){
        return Animal(animal).eat(food);
    }

    function call(address animal) view public returns(string memory){
        return Animal(animal).speak();
    }
}

