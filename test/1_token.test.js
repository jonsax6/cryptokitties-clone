// import the contracts you are going to use
const Kittycontract = artifacts.require("Kittycontract");

const {
    BN,           // Big Number support 
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
  } = require('@openzeppelin/test-helpers');

// Main function that is executed during the test
contract("Kittycontract", ([owner, alice, bob, charlie]) => {
    // Global variable declarations
    let kittycontract;
    const genes1 = 5368298526545211;
    const genes2 = 5289121556575841;
    const genes3 = 7884733212593141;
    const genes4 = 6942691265662311;
    const genesSmall = 123;
    
    before(async function() {
        // Deploy Kittycontract to testnet
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

        it("should create a new kitty and send to contract owner address", async function() {
            await kittycontract.createKittyGen0(genes1);

            // collect all cat birth events and bind to 'events' object
            const events = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })
            
            // variable binding for the newest or youngest cat that we just birthed
            const cat = events.pop(); 

            // variable bindings for the returned values of 'owner' and 'genes'
            const catOwner = cat.returnValues.owner;
            const catGenes = cat.returnValues.genes;
            const catMomId = cat.returnValues.momId;
            const catDadId = cat.returnValues.dadId;

            // assert that the genes for the newest cat are the same as genes1
            assert.equal(catGenes, genes1);

            // assert momId is 0
            assert.equal(catMomId, 0);

            // assert dadId is 0
            assert.equal(catDadId, 0);

            // assert that the owner address is the contract owner address
            assert.equal(catOwner, owner);
        });

        it("should breed two cats that you own, emitting the Birth Event ", async function(){
            // first create 2 new cats
            await kittycontract.createKittyGen0(genes1);
            await kittycontract.createKittyGen0(genes2);

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

            // should fail because user does not own kitty id 1000
            await expectRevert.unspecified(kittycontract.breed(_dadId, 1000));

            // breed a new kitty from mom and dad DNA
            const bredCat = await kittycontract.breed(_dadId, _momId);

            // check that Birth event was emitted
            expectEvent(bredCat, "Birth", {
                momId: _momId,
                dadId: _dadId
            });
            
            // now get the updated events object with the bred cat
            const recentEvents = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })
            // .pop() method returns the most recent event object (index of event array.length -1 )
            const newKitten = recentEvents.pop();

            // test that mom and dad IDs are correct in the newKitten meta data
            assert.equal(newKitten.returnValues.momId, _momId);
            assert.equal(newKitten.returnValues.dadId, _dadId);
            assert.equal(newKitten.returnValues.kittenId, recentEvents.length);
        })

        it("owner should be 'owner' for any cat in events array", async function() {
            await kittycontract.createKittyGen0(genes1);
            await kittycontract.createKittyGen0(genes2);
            await kittycontract.createKittyGen0(genes3);
            await kittycontract.createKittyGen0(genes4);

            const events = await kittycontract.getPastEvents("Birth", {
                fromBlock:0,
                toBlock:"latest"
            })
            
            const lastCat = events.pop();
            const _owner = lastCat.returnValues.owner;
            assert.equal(_owner, owner);
        })

        it("should show approval = true for given accounts", async function() {
            await kittycontract.createKittyGen0(genes1);
            await kittycontract.createKittyGen0(genes2);
            await kittycontract.createKittyGen0(genes3);
            await kittycontract.createKittyGen0(genes4);

            // set approval for alice and bob
            await kittycontract.setApprovalForAll(alice, true);  
            await kittycontract.setApprovalForAll(bob, true);
            
            // query approval for alice and bob (binded as boolean)
            const isApproved1 = await kittycontract.isApprovedForAll(owner, alice);
            const isApproved2 = await kittycontract.isApprovedForAll(owner, bob);

            // test approval = true for alice and bob
            assert(isApproved1);
            assert(isApproved2);
        })

        it("should revert for a cat with small number DNA", async () => {            
            await expectRevert(kittycontract.createKittyGen0(genesSmall), 
            "genes must be a minimum of 16 digits");
        })
        
        it("should revert if cat IDs are the same", async () => {
            await expectRevert(kittycontract.breed(1, 1), "Kitty IDs must not be the same");
        })

    })
})
