var web3 = new Web3(Web3.givenProvider);

var instance;
var marketplaceInstance;
var user;
// ropsten
// var contractAddress = "0x039dD21A290eCa0f42ab0b28e73F05C25C242880";
// var marketplaceAddress = "0x777Ad6549e2a1fd15142cF1794e02Baa161be659";

// kovan
var contractAddress = "0x76DB58353e9E4eFb2EF7583DF260570539EEaA12";
var marketplaceAddress = "0x4693f9d53177F0a3F88c26751e346Fc9F380DDe7";

// ganache
// var contractAddress = "0x530b7c6cBc89c83b21Dcf6701cD7c7F5Af63242c";
// var marketplaceAddress = "0xaA9c2F96F26749E27bDC8D86b553b9eF2fd15c12";

var tokenIds;
var catObj;
var saleId;
var catsForSaleObjArray;
var catsForSaleArray;

// Array to record both parents.  It gets zero'd out on pride page load so new parents can be selected.
var parents = [];

// Tracking variable declaration for navigation/location
var loc = '';

$(document).ready(async function(){
    // set the kittycontract and marketplace instances and user to global vars,  
    const accounts = await window.ethereum.enable();
    instance = new web3.eth.Contract(abi.kittycontract, contractAddress, {from: accounts[0]});
    marketplaceInstance = new web3.eth.Contract(abi.marketplace, marketplaceAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    
    instance.events.Birth()
    .on('data', function(event){
        console.log(event);
        let owner = event.returnValues.owner;
        let kittenId = event.returnValues.kittenId;
        let momId = event.returnValues.momId;
        let dadId = event.returnValues.dadId;
        let genes = event.returnValues.genes;
        $("#kittyCreation").css("display", "block");
        $("#kittyCreation").html(`
            <b>kitten_Id: ${kittenId}, </b><br>
            <b>owner: ${owner}, </b><br>
            <b>mom_Id: ${momId}, </b><br>
            <b>dad_Id: ${dadId}, </b><br>
            <b>genes: ${genes}, </b>`)
    })
    .on('error', console.error);

    marketplaceInstance.events.MarketTransaction()
    .on('data', (event) =>{
        var eventType = event.returnValues["TxType"].toString();
        var tokenId = event.returnValues["tokenId"];
        if(eventType == "Buy") {
            console.log('successful Kitty Adoption! Now you own this Kitty with TokenId: ' + tokenId, 'success');
        }
        if(eventType == "Create offer") {
            console.log('successful Offer set for this Kitty id: ' + tokenId, 'success');
            // add jquery selectors/actions here...
        }
        if(eventType == "Remove offer") {
            console.log('successful Offer removal for Kitty id: ' + tokenId, 'success');
            // add jquery selectors/actions here...
        }
    })
    .on('error', console.error);

    // get msg.sender kitties from blockchain
    fetchCats(user);
    
    // populate global variables with latest for-sale data
    getInventory();

    // hides all page divs for clean page load on click listeners and page refresh.

    // hide all on page load, then show homepage div
    hideAll();
    $('#homepage_page').show();
    loc = "home";
    checkOwner();
})
/////////////////////////////////
// end of document.ready function


function hideAll(){ 
    $('#homepage_page').hide();
    $('#homepage_page').hide();
    $('#breeder_link').hide();
    $('#breed_0_page').hide();
    $('#pride_page').hide();
    $('#adopt_page').hide();
    $('#breeding_form').hide();
    $('#pride_title').hide();
    $('#adopt_title').hide();
    $('#pride_subtitle').hide();
    $('#breeding_title').hide();
    $('#breeding_subtitle').hide();
    $('#adopt_subtitle').hide();
    $('#breeding_form').hide();
    $('#launch_breeder_btn').hide();
    $('#adopt_buttons').hide();
    $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid').hide();
    $("#cat_details").hide();
    $("#details_box").hide();
    $("#sell_cat_form").hide();
    $("#remove_offer_form").hide();
    $("#buy_cat_form").hide();
    $("#offer_title").hide();
    $("#offer_subtitle").hide();
    $("#offer_remove_title").hide();
    $("#offer_remove_subtitle").hide();
    $("#breeding_instructions").hide();
    $('#breeding_instructions_modal').hide();
    $('#inst_modal_mother').hide();
    $('#inst_modal_father').hide();
}

async function checkOwner(){
    let userAccount = web3.utils.toChecksumAddress(user);
    let ownerAccount = await instance.methods.owner().call();
    if(userAccount !== ownerAccount) {
        $('#nav_breed_0').hide();
        $('#breed_0_page').hide();
    } 
}    
    
async function buyCat(id, price) {
    marketplaceInstance.methods
    .buyKitty(id)
    .send({value: price})
    .on("transactionHash", function (hash){
        console.log(hash);
    })
    .on("receipt", async function (receipt){
        console.log(receipt);

        // reloads pride_page
        loc = "pride";
        hideAll();
        checkOwner();
        parents = []; // resets the parents array to empty

        //refresh the page divs back to kitty pride page
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid').empty();
        $('#pride_page').show();
        $('#kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
        $('#launch_menu_1').html(
            `<img src="https://i.imgur.com/vH1X4uQ.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_2').html(
            `<img src="https://i.imgur.com/qKmniXD.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_1, #launch_menu_2').addClass('breed_select');
        $('#launch_menu_1, #launch_menu_2').removeClass('showcase_box');

        // fetch new cats
        await fetchCats(user);

        console.log("appending kitty grid");
        // append the entire grid now to include newly breeded cat.
        appendGrid(catObj, 'pride'); 
        $('.kitty_price_block').hide();
    })
    .on("error", (error) => {
        console.log(error);
    })
}

// combines two cats DNA to make a child cat. This all happens ETH contract-side and is saved to the blockchain.
function breedCats(_dadId, _momId, _seed, grid){
    instance.methods
    .breed(_dadId, _momId, _seed)
    .send()
    .on("transactionHash", function (hash) {
        console.log(hash); // 'etherscan.io/tx/${hash}'
    })
    .on("receipt", async function (receipt) {
        console.log(receipt);
        // reloads pride_page
        loc = "pride";
        hideAll();
        checkOwner();
        parents = []; // resets the parents array to empty

        //refresh the page divs back to kitty pride page
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid').empty();
        $('#pride_page').show();
        $('#kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
        $('#launch_menu_1').html(
            `<img src="https://i.imgur.com/qKmniXD.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_2').html(
            `<img src="https://i.imgur.com/vH1X4uQ.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_1, #launch_menu_2').addClass('breed_select');
        $('#launch_menu_1, #launch_menu_2').removeClass('showcase_box');

        // fetch new cats
        await fetchCats(user);

        console.log("appending kitty grid");
        // append the entire grid now to include newly breeded cat.
        appendGrid(catObj, grid); 
        $('.kitty_price_block').hide();
    })
    .on("error", (error) => {
        console.log(error);
    })
}

async function setMarketApproval(address){
    await instance.methods.setApprovalForAll(address, true).send();
}

async function makeOffer(price, tokenId){
    marketplaceInstance.methods
    .setOffer(price, tokenId)
    .send()
    .on("transactionHash", function (hash) {
        console.log(hash); // 'etherscan.io/tx/${hash}'
    })
    .on("receipt", async function (receipt) {
        console.log(receipt);

        // now we reload the "Adopt Kitties" page 
        loc = "adopt";
        hideAll();
        await getInventory();
        parents = [];
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-adopt-grid, #adopt_subtitle, #adopt_title, #adopt_buttons, #launch_offer_btn').show();
        appendGrid(catsForSaleObjArray, "adopt");
        $('.kitty_price_block').show();
        $('.kitty_dna_block').hide();
    })
    .on("error", function (error) {
        console.log(error)
    })
}

async function deleteOffer(tokenId){
    marketplaceInstance.methods
    .removeOffer(tokenId)
    .send()
    .on("transactionHash", function (hash){
        console.log(hash);
    })
    .on("receipt", async function (receipt){
        console.log(receipt);
        // now we reload the "Adopt Kitties" page 
        loc = "adopt";
        hideAll();
        await getInventory();
        parents = [];
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-adopt-grid, #adopt_subtitle, #adopt_title, #adopt_buttons, #launch_offer_btn').show();
        appendGrid(catsForSaleObjArray, "adopt");
    })
    .on("error", function (error){
        console.log(error);
    })
}


async function initMarketplace() {
    var isMarketplaceOperator = await instance.methods.isApprovedForAll(user, marketplaceAddress).call();

    if(isMarketplaceOperator){
        getInventory();
    }
    else{
        await instance.methods.setApprovalForAll(marketplaceAddress, true).send().on('receipt', function(receipt){
            console.log("tx done");
            getInventory();
        })
    }
}

async function getInventory() {
    // first, get the array of cat IDs that have for sale offers
    catsForSaleArray = await marketplaceInstance.methods.getAllTokenOnSale().call();
    
    // then plug the above array into our function to get the array Kitty objects from the contract
    catsForSaleObjArray = await getKittyObject(catsForSaleArray);

    // local ethereum price variable
    var ethprice;

    for(i=0; i<catsForSaleObjArray.length; i++){
        // create local var 'cats' for the single Kitty object located at i.
        let cat = catsForSaleObjArray[i];

        // loop through each Kitty object, getting it's offer data from "getOffer", and binding to temp _offer variable,
        let _offer = await marketplaceInstance.methods.getOffer(cat.catId).call();

        // then convert the price data in _offer from Wei, into ETH, binding to local var ethprice.
        ethprice = web3.utils.fromWei(_offer.price);

        // then create the new value field in the catsForSaleObjArray and assign the ethereum price in ETH
        cat.price = ethprice;
    }
}


// This gets called inside selectCat() when we click on a cat in menu_modal -renders cat selection into showcase div
function catParentsShowcase(page, catId, catIdsObj){
    // checks to see which page state ("female_showcase" or "male_showcase") is active when "dame" or "sire" div is clicked
    if(page == "female_showcase"){
        $('#launch_menu_1').empty();
        $('#launch_menu_1').addClass('showcase_box');
        $('#launch_menu_1').removeClass('breed_select');
        appendShowcase(catIdsObj, catId, "launch_menu_1");
    } else if(page == "male_showcase") {
        $('#launch_menu_2').empty();
        $('#launch_menu_2').addClass('showcase_box');
        $('#launch_menu_2').removeClass('breed_select');
        appendShowcase(catIdsObj, catId, "launch_menu_2");
    } else {
        appendShowcase(catIdsObj, catId, "details_box");
    }
}

// creates a new kitty and transfers to msg.sender eth address.
async function createKitty(){
    let dnaStr = getDna();
    try {
        const tx = await instance.methods.createKittyGen0(dnaStr).send({});
    } catch (error) {
        console.log(error.message);
    }
    await fetchCats(user);
}

/** called when catbox divs are clicked on.  Selections can be made infinitely, but will overwrite the previous ones 
 * which are saved into the parents array.  The parents array, which stores the selected cats, gets emptied every time 
 * nav_pride gets clicked or a cat is bred. */
async function selectCat(id) {
    // if we've clicked on the female icon in the breed cat page this will be true
    if(loc == "female_showcase"){
        // populate the appropriate showcase box according to page location (loc) 

        // set the two-element parents array at index [1], which is the momId
        parents[1] = id;

        // render the selected cat
        catParentsShowcase(loc, id, catObj);

        // hides the modal menu after every cat selection
        $("#menu_modal").modal('hide');

        // hide the price data, and show the dna data in cat description fields
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    } 
    // if we've clicked on the male icon in the breed cat page this will be true
    else if (loc == "male_showcase"){
        // set the parents array at index [0], which is the dadId
        parents[0] = id;

        // render the cat
        catParentsShowcase(loc, id, catObj);
        $("#menu_modal").modal('hide');

        // hide the price data, and show the dna data in cat description fields
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    } 
    // if we are coming from the pride page, or the adopt page:
    else if(loc == "pride" || loc == "adopt"){ 
        // find the cat with "id" inside the catsForSaleObjArray using .filter
        let catOnSale = catsForSaleObjArray.filter(cat => cat.catId == id)[0];

        // if there is no offer for this cat go to make offer page for cat
        if(loc == "pride" && catOnSale == undefined) {
            // show the cat details showcase box
            $('#cat_details, #details_box, #offer_subtitle, #offer_title').show();

            // empty pride grid to avoid ID conflicts
            $('#kitty-adopt-grid').empty();

            // hide all pride page elements
            $('#pride_title, #pride_subtitle, #launch_breeder_btn, #kitty-adopt-grid').hide();
            
            // show sell cat elements
            $("#sell_cat_form").show();

            // set global variable saleId to the current id, this allows us to "remember" it 
            // when the create offer button is clicked in the following page
            saleId = id;

            // render this cat to the showcase box
            catParentsShowcase(loc, id, catObj);

            // hide price and show DNA
            $('.kitty_price_block').hide();
            $('.kitty_dna_block').show();
        }
        // if there is an active offer, this will return true and allow us to remove offer 
        // ONLY if we own the cat (in kitty pride):
        else if(tokenIds.includes(`${id}`)) {
            // show the remove offer elements
            $('#remove_offer_form, #cat_details, #details_box, #offer_remove_subtitle, #offer_remove_title').show();

            // empty adopt grid to avoid ID conflicts
            $('#kitty-adopt-grid').empty();

            // hide main adopt page (marketplace) page elements
            $('#adopt_title, #adopt_subtitle, #pride_title, #pride_subtitle, #launch_breeder_btn, #kitty-adopt-grid').hide();

            // set global variable saleId to the current id, this allows us to "remember" it 
            // when the remove offer button is clicked in the following page
            saleId = id;

            // render the kitty into the remove offer page showcase
            catParentsShowcase(loc, id, catsForSaleObjArray);

            // show the price data and hide the dna data in the rendered cat
            $('.kitty_price_block').show();
            $('.kitty_dna_block').hide();
        } else {
            // show the "buy this cat" button and buy_cat_form
            $('#buy_cat_form, #cat_details, #details_box').show();
            $('#kitty-adopt-grid').empty();
            $('#adopt_title, #adopt_subtitle, #pride_title, #pride_subtitle, #kitty-adopt-grid, #launch_breeder_btn, #adopt_buttons, #remove_offer_form').hide();
            // set global variable saleId to the current id, this allows us to "remember" it 
            // when the buy this cat button is clicked in the following page
            saleId = id;
            console.log(saleId);

            // render the kitty into buy this cat page showcase
            catParentsShowcase(loc, id, catsForSaleObjArray);

            // show the price and hide the dna
            $('.kitty_price_block').show();
            $('.kitty_dna_block').hide();
        }
    }
}


    // homepage nav menu click listener
    $('#nav_homepage').click(()=>{
        hideAll();
        parents = [];
        $('#homepage_page').show();
        loc = "home";
    })

    // kitty pride nav menu click listener
    $('#nav_pride').click(async()=>{
        loc = "pride";
        hideAll();
        parents = [];
        checkOwner();
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
        $('#launch_menu_1').html(
            `<img src="https://i.imgur.com/qKmniXD.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_2').html(
            `<img src="https://i.imgur.com/vH1X4uQ.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_1, #launch_menu_2').addClass('breed_select');
        $('#launch_menu_1, #launch_menu_2').removeClass('showcase_box');
        await fetchCats(user);
        appendGrid(catObj, "pride");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    })

    // kitty pride nav menu click listener
    $('#nav_adopt').click(async()=>{
        loc = "adopt";
        hideAll();
        await getInventory();
        checkOwner();
        parents = [];
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-adopt-grid, #adopt_subtitle, #adopt_title, #adopt_buttons, #launch_offer_btn').show();
        await fetchCats(user);
        appendGrid(catsForSaleObjArray, "adopt");
        $('.kitty_price_block').show();
        $('.kitty_dna_block').hide();
    })

    // Breeder nav menu click listener
    $('#nav_breed_0').click(()=>{
        loc = "gen0";
        $('#kittyCreation').hide();
        hideAll();
        checkOwner();
        parents = [];
        $('#breed_0_page').show();
    })

    // Breeder click listener in homepage banner
    $('#nav_breed_0_2').click(async()=>{
        loc = "pride";
        $('#kittyCreation').hide();
        hideAll();
        checkOwner();
        $('#launch_menu_1, #launch_menu_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
        $('#launch_menu_1').html(
            `<img src="https://i.imgur.com/qKmniXD.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_2').html(
            `<img src="https://i.imgur.com/vH1X4uQ.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_1, #launch_menu_2').addClass('breed_select');
        $('#launch_menu_1, #launch_menu_2').removeClass('showcase_box');
        await fetchCats(user);
        appendGrid(catObj, "pride");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    })

    /** the "Get Them A Room!" button.  Captures mom and dad ID selections from parents array
     * calls breetCats(dadCat, momCat) which sends cat IDs to Kittycontract breed function.
     * clears page, then reloads kitty matrix with the new cats at the bottom of the page. */ 
    $('#breedCats').click(()=>{
        hideAll();
        checkOwner();
        var seed = Math.trunc(10000*Math.random());
        // assign respective ID's to momId and dadId from the parents array, created from cat choices
        momId = parents[0];
        dadId = parents[1];
        // breeds the two cats, and sends to blockchain.  After tx receipt, rerenders the kitty pride page.
        breedCats(momId, dadId, seed, "pride");
    })

    $('#launch_menu_1').click(()=>{
        loc = "female_showcase";
        checkOwner();
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid, #kitty-menu-grid').empty();
        $('#kitty-menu-grid').show();
        // now put the kitty grid into DOM @menu_modal, populate grid inside menu modal
        appendGrid(catObj, "menu");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
        $('#breeding_instructions_modal').show();
        $('#inst_modal_mother').show();
        $('#inst_modal_father').hide();
        // this control flow removes the chosen catIds from the appended Grid inside the modal only if they are defined
        if(parents[0] !== "undefined"){
            $(`#box${parents[0]}`).hide();
        } if(parents[1] !== "undefined"){
            $(`#box${parents[1]}`).hide();
        }
    })

    $('#launch_menu_2').click(()=>{
        loc = "male_showcase";
        checkOwner();
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid, #kitty-menu-grid').empty();
        $('#kitty-menu-grid').show();
        // now put the kitty grid into DOM @menu_modal
        // populate grid inside menu modal
        appendGrid(catObj, "menu");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
        $('#breeding_instructions_modal').show();
        $('#inst_modal_mother').hide();
        $('#inst_modal_father').show();

        /** check to see if either mom or dad selection has been made already.  
        * Undefined means no selection yet. */
        if(parents[0] !== "undefined"){
            $(`#box${parents[0]}`).hide();
        } if(parents[1] !== "undefined"){
            $(`#box${parents[1]}`).hide();
        }
    })

    $('#launch_breeder_btn').click(()=>{
        hideAll();
        checkOwner();
        $('#pride_page, #breeding_form, #breeding_title, #breeding_subtitle, #launch_menu_1, #launch_menu_2, #breeding_instructions').show();
        $('#kitty-pride-grid').empty();
    })

    $('#create_offer_btn').click(async() => {
        // get price from eth price form field

        // get approval for all
        await initMarketplace();

        let price = $('#eth_price').val();

        // conerts the price to Wei.
        price = web3.utils.toWei(price);
        console.log("eth price", price);

        // var is a boolean, if true, then marketplace has been approved to buy/sell on behalf of user
        var isApprovedForAll = await instance.methods.isApprovedForAll(user, marketplaceAddress).call();

        // if isApprovedForAll is false, then marketplace needs to be approved by user to buy/sell
        if(!isApprovedForAll) {
            await setMarketApproval(marketplaceAddress); 
        } 

        // sets the marketplace offer on the kitty with ID saleId global var
        await makeOffer(price, saleId);
    })

    $('#remove_offer_btn').click(()=> {
        checkOwner();

        // calls the removeOffer() function in Kittycontract for kitty ID saleId
        deleteOffer(saleId); 
    })

    $('#buy_cat_btn').click(()=> {
        // finds the ID of the cat in the catsForSaleObjArray with ID saleId
        let catToBuy = catsForSaleObjArray.filter(cat => cat.catId == saleId)[0];

        // converts the price back to eth from Wei
        let ethprice = web3.utils.toWei(catToBuy.price, "ether");

        // calls the function in Kittycontract to buy kitty with ID saleId 
        // and transfers the cat to the user address, should now be in user's "Pride" page
        buyCat(saleId, ethprice);
    })









