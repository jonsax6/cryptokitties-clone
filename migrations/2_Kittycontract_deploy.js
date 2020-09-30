const IERC721 = artifacts.require("IERC721");

const TOKEN_NAME = "JC Crypto Kitties"
const TOKEN_SYMBOL = "JCCK"

module.exports = async (deployer, network, accounts) => {
    await deployer.deploy(IERC721, TOKEN_NAME, TOKEN_SYMBOL);
    const instance = await IERC721.deployed();
};