// import the contracts you are going to use
const Kittycontract = artifacts.require("Kittycontract");
const Marketplace = artifacts.require("KittyMarketPlace");
const Imarketplace = artifacts.require("IKittyMarketPlace");


const {
    BN,           // Big Number support 
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');

// Main function that is executed during the test
contract("Marketplace", ([owner, alice, bob, charlie]) => {
    // Global variable declarations
    let kittycontract;
    let marketplace;
    const genes1 = 5368298526545211;
    const genes2 = 5289121556575841;
    const genes3 = 7884733212593141;
    const genes4 = 6942691265662311;
    const price = web3.utils.toWei("0.1");

    before(async function() {
        // Deploy Kittycontract to testnet
        kittycontract = await Kittycontract.new();

        // Deploy Marketplace to testnet
        marketplace = await Marketplace.new(kittycontract.address);
    });
    describe("Initial Values", () => {
        it("should set a new offer to sell a kitty", async function() {
            // create a new gen0 cat
            await kittycontract.createKittyGen0(genes1);

            // set marketplace address to approve for all
            await kittycontract.setApprovalForAll(marketplace.address, true);

            // set a new offer for token ID = 1
            await marketplace.setOffer(price, "1");

            // fetch the offer object for token ID = 1
            const newOffer = await marketplace.getOffer(1);
            assert.equal(newOffer.price, price);
        })
        
        it("should revert when offer set by not approved", async function() {
            // create a new gen0 cat
            await kittycontract.createKittyGen0(genes2);
            
            // expect revert when setting a new offer for token ID = 2 from account bob
            await expectRevert.unspecified(marketplace.setOffer(price, 2, { from: bob }));
        })

        it("should emit a 'Create offer' event", async function() {
            // create a new cat
            await kittycontract.createKittyGen0(genes3);

            // set offer for new cat from owner account
            const newCat = await marketplace.setOffer(price, "3");

            // const events = await marketplace.getPastEvents("Create offer", {
            //     fromBlock:0,
            //     toBlock:"latest"
            // })

            expectEvent(newCat, "MarketTransaction", {
                TxType: "Create offer",
                owner: owner,
                tokenId: "3"
            });
        })

    })


})

