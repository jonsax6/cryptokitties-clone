// import the contracts you are going to use
const Kittycontract = artifacts.require("Kittycontract");
const Marketplace = artifacts.require("KittyMarketPlace");

// Main function that is executed during the test
contract("Kittycontract", ([owner, alice, bob, charlie]) => {
    // Global variable declarations
    let kittycontract;
    
    before(async function() {
        // Deploy the Token contract to testnet
        kittycontract = await Kittycontract.new();
    });
         
    describe("Initial Values", () => {
        it("should get correct token name", async function() {
            const name = await kittycontract._name();
            assert.equal(name, "JC_Kitties");
        });

        it("should get correct token symbol", async function() {
            const symbol = await kittycontract._symbol();
            assert.equal(symbol, "JCK");
        });

        it("should create a new kitty and send to contract address", async function() {
            await kittycontract.createKittyGen0(5368298526545211);
            const kitty = await kittycontract.getKitty(1);

            assert.equal(kitty.genes, "5368298526545211"); 
        });

        it("should breed two cats, returning correct parent IDs", async function(){
            // first create 2 new cats
            await kittycontract.createKittyGen0(5368298526545211);
            await kittycontract.createKittyGen0(5289121556575841);

            // collect all cat birth events and bind to 'events' object
            const events = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })

            const cat1 = events[1];
            const cat2 = events[2];

            // create variables for mom and dad IDs from the events object
            const _momId = cat1.returnValues.kittenId;
            const _dadId = cat2.returnValues.kittenId;

            // breed a new kitty from mom and dad DNA
            await kittycontract.breed(_dadId, _momId);

            // now get the updated events object
            const recentEvents = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })

            const newKitten = recentEvents.pop();

            // test that mom and dad IDs are correct in the newKitten meta data
            assert.equal(newKitten.returnValues.momId, _momId);
            assert.equal(newKitten.returnValues.dadId, _dadId);
            assert.equal(newKitten.returnValues.kittenId, recentEvents.length);
        })

        it("owner should be 'owner' for any cat in events array", async function() {
            await kittycontract.createKittyGen0(5368298526545211);
            await kittycontract.createKittyGen0(5289121556575841);
            await kittycontract.createKittyGen0(7884733212593141);
            await kittycontract.createKittyGen0(6942691265662311);

            const events = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })
            
            const lastCat = events.pop();
            const _owner = lastCat.returnValues.owner;
            assert.equal(_owner, owner);
        })

        it("should show approval = true for given accounts", async function() {
            await kittycontract.createKittyGen0(5368298526545211);
            await kittycontract.createKittyGen0(5289121556575841);
            await kittycontract.createKittyGen0(7884733212593141);
            await kittycontract.createKittyGen0(6942691265662311);

            // set approval for alice and bob
            const setApproval1 = await kittycontract.setApprovalForAll(alice, true);  
            const setApproval2 = await kittycontract.setApprovalForAll(bob, true);
            
            // query approval for alice and bob (binded as boolean)
            const isApproved1 = await kittycontract.isApprovedForAll(owner, alice);
            const isApproved2 = await kittycontract.isApprovedForAll(owner, bob);

            // test approval = true for alice and bob
            assert.equal(isApproved1, true);
            assert.equal(isApproved2, true);
        })
    })


})