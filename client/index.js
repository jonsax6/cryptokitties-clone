var web3 = new Web3(Web3.givenProvider);

var instance;
var marketplaceInstance;
var user;
var contractAddress = "0x66d5c2b74448899d49F23729311b74751B752A14";
var marketplaceAddress = "0x88e1aae3fa007a138FC2eE714b58103a7496E67E";
var tokenIds;
var catObj;
var saleId;
var catsForSaleObjArray;
var catsForSaleArray;
var isAuthorized;

// Array to record both parents.  It gets zero'd out on pride page load so new parents can be selected.
var parents = [];

// Tracking variable declaration for navigation/location
var loc = '';

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
    $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid').hide();
    $("#cat_details").hide();
    $("#details_box").hide();
    $("#sell_cat_form").hide();
    $("#remove_offer_form").hide();
    $("#buy_cat_form").hide();
}

$(document).ready(async function(){
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
        console.log(event);
        var eventType = event.returnValues["TxType"].toString();
        var tokenId = event.returnValues["tokenId"];
        if(eventType == "Buy") {
            alert_msg('successful Kitty Adoption! Now you own this Kitty with TokenId: ' + tokenId, 'success');
        }
        if(eventType == "Create offer") {
            alert_msg('successful Offer set for this Kitty id: ' + tokenId, 'success');
            // add jquery selectors/actions here...
        }
        if(eventType == "Remove offer") {
            alert_msg('successful Offer removal for Kitty id: ' + tokenId, 'success');
            // add jquery selectors/actions here...
        }
    })
    .on('error', console.error);

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
        catsForSaleArray = await marketplaceInstance.methods.getAllTokenOnSale().call();
        catsForSaleObjArray = await getKittyObject(catsForSaleArray);
        var ethprice;
        for(i=0; i<catsForSaleObjArray.length; i++){
            let cats = catsForSaleObjArray[i];
            let _offer = await marketplaceInstance.methods.getOffer(cats.catId).call();
            ethprice = web3.utils.fromWei(_offer.price);
            cats.price = ethprice;
        }
    }

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
        $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
        $('#pride_page, #kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
        $('#launch_menu_modal_1').html(
            `<img src="/client/assets/raster images/female_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_2').html(
            `<img src="/client/assets/raster images/male_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_1, #launch_menu_modal_2').addClass('breed_select');
        $('#launch_menu_modal_1, #launch_menu_modal_2').removeClass('showcase_box');
        await fetchCats(user);
        appendGrid(catObj, "pride");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    })

    async function checkOwner(){
        let userAccount = web3.utils.toChecksumAddress(user);
        let ownerAccount = await instance.methods.owner().call();
        if(userAccount !== ownerAccount) {
            $('#nav_breed_0').hide();
            $('#breed_0_page').hide();
        } 
    }    


    // kitty pride nav menu click listener
    $('#nav_adopt').click(async()=>{
        loc = "adopt";
        hideAll();
        initMarketplace();
        getInventory();
        checkOwner();
        parents = [];
        $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
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
    $('#nav_breed_0_2').click(()=>{
        loc = "gen0";
        $('#kittyCreation').hide();
        hideAll();
        checkOwner();
        parents = [];
        $('#breed_0_page').show();
    })

    // the "Get Them A Room!" button.  Captures mom and dad ID selections from parents array
    // calls breetCats(dadCat, momCat) which sends cat IDs to Kittycontract breed function.
    // clears page, then reloads kitty matrix with the new cats at the bottom of the page. 
    $('#breedCats').click(()=>{
        hideAll();
        checkOwner();
        // assign respective ID's to momId and dadId from the parents array, created from cat choices
        momId = parents[0];
        dadId = parents[1];
        // breeds the two cats, and sends to blockchain.  After tx receipt, rerenders the kitty pride page.
        breedCats(momId, dadId, "pride");
    })

    $('#launch_menu_modal_1').click(()=>{
        loc = "female_showcase";
        checkOwner();
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid, #kitty-menu-grid').empty();
        $('#kitty-menu-grid').show();
        // now put the kitty grid into DOM @menu_modal, populate grid inside menu modal
        console.log(catObj);
        appendGrid(catObj, "menu");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
        // this control flow removes the chosen catIds from the appended Grid inside the modal only if they are defined
        if(parents[0] !== "undefined"){
            $(`#box${parents[0]}`).hide();
        } if(parents[1] !== "undefined"){
            $(`#box${parents[1]}`).hide();
        }
    })

    $('#launch_menu_modal_2').click(()=>{
        loc = "male_showcase";
        checkOwner();
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid, #kitty-menu-grid').empty();
        $('#kitty-menu-grid').show();
        // now put the kitty grid into DOM @menu_modal
        // populate grid inside menu modal
        console.log(catObj);
        appendGrid(catObj, "menu");
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
        if(parents[0] !== "undefined"){
            $(`#box${parents[0]}`).hide();
        } if(parents[1] !== "undefined"){
            $(`#box${parents[1]}`).hide();
        }
    })

    $('#launch_breeder_btn').click(()=>{
        hideAll();
        checkOwner();
        $('#pride_page, #breeding_form, #breeding_title, #breeding_subtitle, #launch_menu_modal_1, #launch_menu_modal_2').show();
        $('#kitty-pride-grid').empty();
    })

    $('#create_offer_btn').click(function() {
        let price = $('#eth_price').val();
        price = web3.utils.toWei(price);
        console.log(price);
        checkOwner();
        makeOffer(price, saleId);
    })

    $('#remove_offer_btn').click(function() {
        checkOwner();
        deleteOffer(saleId); 
    })

    $('#buy_cat_btn').click(()=>{
        marketplaceInstance.methods
        .buyKitty(saleId)
        .send()
        .on("transactionHash", function (hash){
            console.log(hash);
        })
        .on("receipt", async function (hash){
            console.log(receipt);
            // reloads pride_page
            loc = "pride";
            hideAll();
            parents = []; // resets the parents array to empty

            //refresh the page divs back to kitty pride page
            $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid').empty();
            $('#pride_page').show();
            $('#kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
            $('#launch_menu_modal_1').html(
                `<img src="/client/assets/raster images/female_cat.png" class="breed_select_icon"></img>`
            );
            $('#launch_menu_modal_2').html(
                `<img src="/client/assets/raster images/male_cat.png" class="breed_select_icon"></img>`
            );
            $('#launch_menu_modal_1, #launch_menu_modal_2').addClass('breed_select');
            $('#launch_menu_modal_1, #launch_menu_modal_2').removeClass('showcase_box');

            // fetch new cats
            await fetchCats(user);

            console.log("appending kitty grid");
            // append the entire grid now to include newly breeded cat.
            appendGrid(catObj, grid); 
            $('.kitty_price_block').hide();
        })

    })

    // combines two cats DNA to make a child cat. This all happens ETH contract-side and is saved to the blockchain.
    function breedCats(_dadId, _momId, grid){
        instance.methods
        .breed(_dadId, _momId)
        .send()
        .on("transactionHash", function (hash) {
            console.log(hash); // 'etherscan.io/tx/${hash}'
        })
        .on("receipt", async function (receipt) {
            // receipt example
            console.log(receipt);
            // reloads pride_page
            loc = "pride";
            hideAll();
            checkOwner();
            parents = []; // resets the parents array to empty

            //refresh the page divs back to kitty pride page
            $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid').empty();
            $('#pride_page').show();
            $('#kitty-pride-grid, #pride_subtitle, #pride_title, #launch_breeder_btn').show();
            $('#launch_menu_modal_1').html(
                `<img src="/client/assets/raster images/female_cat.png" class="breed_select_icon"></img>`
            );
            $('#launch_menu_modal_2').html(
                `<img src="/client/assets/raster images/male_cat.png" class="breed_select_icon"></img>`
            );
            $('#launch_menu_modal_1, #launch_menu_modal_2').addClass('breed_select');
            $('#launch_menu_modal_1, #launch_menu_modal_2').removeClass('showcase_box');

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
            $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
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
            $('#launch_menu_modal_1, #launch_menu_modal_2, #kitty-pride-grid, #kitty-menu-grid, #kitty-adopt-grid').empty();
            $('#pride_page, #kitty-adopt-grid, #adopt_subtitle, #adopt_title, #adopt_buttons, #launch_offer_btn').show();
            appendGrid(catsForSaleObjArray, "adopt");
        })
        .on("error", function (error){
            console.log(error);
        })
    }
    

})
/////////////////////////////////
// end of document.ready function



// This gets called inside selectCat() when we click on a cat in menu_modal -renders cat selection into showcase div
function catParentsShowcase(page, catId, catIdsObj){
    // checks to see which page state ("female_showcase" or "male_showcase") is active when "dame" or "sire" div is clicked
    if(page == "female_showcase"){
        $('#launch_menu_modal_1').empty();
        $('#launch_menu_modal_1').addClass('showcase_box');
        $('#launch_menu_modal_1').removeClass('breed_select');
        appendShowcase(catIdsObj, catId, "launch_menu_modal_1");
    } else if(page == "male_showcase") {
        $('#launch_menu_modal_2').empty();
        $('#launch_menu_modal_2').addClass('showcase_box');
        $('#launch_menu_modal_2').removeClass('breed_select');
        appendShowcase(catIdsObj, catId, "launch_menu_modal_2");
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

// called when catbox divs are clicked on.  Selections can be made infinitely, but will overwrite the previous ones 
// which are saved into the parents array.  The parents array gets emptied every time nav_pride gets clicked or a cat is bred.
function selectCat(id) {
    if(loc == "female_showcase"){
        // populate the appropriate showcase box according to page location (loc) 
        parents[1] = id;
        catParentsShowcase(loc, id, catObj);
        // hides the modal menu after every cat selection
        $("#menu_modal").modal('hide');
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    } 
    else if (loc == "male_showcase"){
        parents[0] = id;
        catParentsShowcase(loc, id, catObj);
        $("#menu_modal").modal('hide');
        $('.kitty_price_block').hide();
        $('.kitty_dna_block').show();
    } 
    else if(loc == "pride" || loc == "adopt"){
        let catOnSale = catsForSaleObjArray.filter(cat => cat.catId == id)[0];
        // if there is no offer for this cat:
        if(loc == "pride" && catOnSale == undefined) {
            $('#cat_details, #details_box').show();
            $('#kitty-adopt-grid').empty();
            $('#pride_title, #pride_subtitle, #launch_breeder_btn, #kitty-adopt-grid').hide();
            $("#sell_cat_form").show();
            saleId = id;
            catParentsShowcase(loc, id, catObj);
            $('.kitty_price_block').hide();
            $('.kitty_dna_block').show();
        }
        // if there is an active offer, this will allow us to remove it if its our offer
        else if(tokenIds.includes(`${id}`)) {
            $('#remove_offer_form, #cat_details, #details_box').show();
            $('#kitty-adopt-grid').empty();
            $('#adopt_title, #adopt_subtitle, #pride_title, #pride_subtitle, #kitty-adopt-grid, #launch_breeder_btn, #adopt_buttons, #buy_cat_form').hide();
            saleId = id;
            catParentsShowcase(loc, id, catsForSaleObjArray);
            $('.kitty_price_block').show();
            $('.kitty_dna_block').hide();
        } else {
            // buy this cat button buy_cat_form
            $('#buy_cat_form, #cat_details, #details_box').show();
            $('#kitty-adopt-grid').empty();
            $('#adopt_title, #adopt_subtitle, #pride_title, #pride_subtitle, #kitty-adopt-grid, #launch_breeder_btn, #adopt_buttons, #remove_offer_form').hide();
            saleId = id;
            catParentsShowcase(loc, id, catsForSaleObjArray);
            $('.kitty_price_block').show();
            $('.kitty_dna_block').hide();
        }
    }
}








