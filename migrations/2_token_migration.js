const token = artifacts.require("Kittycontract");

module.exports = async (deployer) => {
    await deployer.deploy(token);
};