// import the contracts you are going to use
const Kittycontract = artifacts.require("Kittycontract");

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

        // it("should create a new kitty with given attributes", async function() {
        //     const _momId = 1;
        //     const _dadId = 2;
        //     const _generation = 1;
        //     const _genes = 5368298526545211;
        //     const _owner = owner;

        //     const kitty = await kittycontract._createKitty(_momId, _dadId, _generation, _genes, _owner);

        //     assert.equal(kitties[kitties.length].momId, kitty.momId);
        //     assert.equal(kitties[kitties.length].dadId, kitty.dadId);
        //     assert.equal(kitties[kitties.length].genes, kitty.dadId);
        //     assert.equal(kitties[kitties.length].generation, kitty.generation);
        //     assert.equal(kitties[kitties.length].owner, kitty.owner); 
        // })
        
        // it("should return a kitty of given ID", async function() {
        //     const kitties = await kittycontract.kitties();
        //     await kittycontract._createKitty(0, 0, 0, 5368298526545211, owner);
        //     const _kitty = await kittycontract.getKitty(kitties.length);

        //     assert.equal(_kitty.momId, 0);
        //     assert.equal(_kitty.dadId, 0);
        //     assert.equal(_kitty.generation, 0);
        //     assert.equal(_kitty.genes, 5368298526545211);
        //     assert.equal(_kitty.owner, owner);    
        // })

        it("should return ", async function() {
            await kittycontract._createKitty(0, 0, 0, 5368298526545211, owner);
            await kittycontract._createKitty(0, 0, 0, 5368298526545211, owner);
            await kittycontract._createKitty(0, 0, 0, 5368298526545211, owner);
            const owned = await kittycontract.getKittiesByUser();
        

            for (let i = 0; i < owned.length; i++) {
                let cat = owned[i];
                assert.equal(cat.owner, owner);
            } 

        })


    })


})