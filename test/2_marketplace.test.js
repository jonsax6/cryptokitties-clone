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
    const genes5 = 2421358865879841;
    const price = web3.utils.toWei("0.1");

    before(async function() {
        // Deploy Kittycontract to testnet
        kittycontract = await Kittycontract.new();

        // Deploy Marketplace to testnet
        marketplace = await Marketplace.new(kittycontract.address);
    });
    describe("Initial Values", () => {
        it("should set a new offer to sell a kitty", async () => {
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
        
        it("should revert when offer set by not approved", async () => {
            // create a new gen0 cat
            await kittycontract.createKittyGen0(genes2);
            
            // expect revert when setting a new offer for token ID = 2 from account bob
            await expectRevert.unspecified(marketplace.setOffer(price, 2, { from: bob }));
        })

        it("should emit a 'MarketTransaction' event", async () => {
            // create a new gen0 cat
            await kittycontract.createKittyGen0(genes3);

            // set offer for new cat from owner account
            const newCat = await marketplace.setOffer(price, "3");

            expectEvent(newCat, "MarketTransaction", {
                TxType: "Create offer",
                owner: owner,
                tokenId: "3"
            });
        })

        it("should fetch the total number of kitty's that are for sale", async () => {
            // create 1 more new cat
            await kittycontract.createKittyGen0(genes4);

            // now setOffers for cats 2 and 4
            await marketplace.setOffer(price, "2");
            await marketplace.setOffer(price, "4");

            const catsForSale = await marketplace.getAllTokenOnSale();
            const numOffers = await marketplace.totalOffers();

            // 4 cats have offers (from above tests), 
            assert.equal(catsForSale.length, numOffers);
        })

        it("should get an offer for kitty with tokenId ID", async () => {
            const offer = await marketplace.getOffer(1);

            assert.equal(offer.seller, owner);
            assert.equal(offer.price, price);
            assert.equal(offer.index, 0);
            assert.equal(offer.tokenId, "1");
            assert.equal(offer.active, true);
        })

        it("should fail for a kitty with no active offer", async () => {
            // create a new kitty
            await kittycontract.createKittyGen0(genes5);
            
            // getting an offer that doesn't exist, should return 0 values
            let offer = await marketplace.getOffer(5);

            // testing that in fact we get 0 values from the getter
            assert.equal(offer.tokenId, 0, "there is an offer already");
        })
    
        it("should remove an offer, returning active == false", async () => {
            // fetch the existing active offer
            let offerActive = await marketplace.getOffer(2);

            // changes the offer's active status to "false"
            await marketplace.removeOffer(2);

            // fetch the offer from the offers array
            let offerUnactive = await marketplace.getOffer(2);

            // checks that the original offer status before removeOffer is active == true
            assert(offerActive.active);

            // checks that the new offer status should now be active == false
            assert(!offerUnactive.active);
        })

        it("should buy a kitty, transfer ownership, and verify eth value transfered to owner", async () => {
            const ownerBalBefore = web3.eth.getBalance(owner);
            console.log(ownerBalBefore);

            await marketplace.buyKitty(1, { from: bob, value: price });

            const ownerBalAfter = web3.eth.getBalance(owner);
            console.log(ownerBalAfter);

            assert(ownerBalBefore + price == ownerBalAfter);

        })

    })



})

