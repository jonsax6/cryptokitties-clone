const Token = artifacts.require("Kittycontract");

module.exports = async (deployer) => {
    deployer.deploy(Token);
    const instance = await Token.deployed();
};