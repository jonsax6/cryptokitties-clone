const Kittycontract = artifacts.require("Kittycontract");
const Marketplace = artifacts.require("KittyMarketPlace");

module.exports = function(deployer){
    deployer.deploy(Marketplace, Kittycontract.address);
};