var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xfBa3c66d0b2043368b613a5d74226cb3892e3550";

// Array to record both parents.  It gets zero'd out on pride page load so new parents can be selected.
var parents = [];

// Tracking variable for navigation/location
var loc = '';

$(document).ready(async function(){
    const accounts = await window.ethereum.enable();
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    instance.events.Birth().on('data', function(event){
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

    // get msg.sender kitties from blockchain
    fetchCats(user, "pride");

    // hides all page divs for clean page load on click listeners and page refresh.
    function hideAll(){
        $('#homepage_link').hide();
        $('#breeder_link').hide();
        $('#pride_link').hide();
        $('#breed_0_link').hide();
        $('#breed_kittens_link').hide();
        // $('#breeding_form').hide();
        $('#pride_subtitle').hide();
        $('#breeding_subtitle').hide();
        $('#breeding_title').hide();
        $('#pride_title').hide();

    }



    // hide all on page load, then show homepage div
    hideAll();
    $('#homepage_link').show();
    loc = "home";

    // homepage nav menu click listener
    $('#nav_homepage').click(()=>{
        hideAll();
        $('#homepage_link').show();
        loc = "home";
    })

    // kitty pride nav menu click listener
    $('#nav_pride').click(()=>{
        loc = "pride";
        hideAll();
        parents = [];
        $('#launch_menu_modal_1').empty();
        $('#launch_menu_modal_2').empty();
        $('#pride_link').show();
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        $('#kitty-pride-grid').show();

        $('#pride_subtitle').show();
        $('#breeding_form').hide();
        $('#breed_Select').show();
        $('#breeding_title').hide();
        $('#pride_title').show();
        $('#launch_breeder').show();
        $('#launch_menu_modal_1').html(
            `<img src="/client/assets/raster images/female_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_2').html(
            `<img src="/client/assets/raster images/male_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_1').addClass('breed_select');
        $('#launch_menu_modal_1').removeClass('showcase_box');
        $('#launch_menu_modal_2').addClass('breed_select');
        $('#launch_menu_modal_2').removeClass('showcase_box');
        fetchCats(user, "pride");
    })

    // Breeder nav menu click listener
    $('#nav_breed_0').click(()=>{
        loc = "gen0";
        hideAll();
        $('#breed_0_link').show();
    })

    // Breeder click listener in homepage banner
    $('#nav_breed_0_2').click(()=>{
        loc = "gen0";
        hideAll();
        $('#breed_0_link').show();
    })

    // the "Get Them A Room!" button.  Captures mom and dad ID selections from 'breeding_form' inputs
    // resets form inputs to ''
    // calls breetCats(datCat, momCat) which sends cat IDs to Kittycontract breed function.
    // clears page, then reloads kitty matrix with the new cats at the bottom of the page. 
    $('#breedCats').click(()=>{
        hideAll();
        
        // assign respective ID's to momId and dadId from the parents array, created from cat choices
        momId = parents[0];
        dadId = parents[1];

        // breeds the two cats, and sends to blockchain.  After tx receipt, rerenders the kitty pride page.
        breedCats(momId, dadId, "pride");
        
        // reloads the kitty pride page
        $('#pride_link').show();
        $('#breeding_form').hide();

        // hides the cat grid div
        $('#kitty-pride-grid').hide();
        $('#breed_Select').hide();
    })

    $('#launch_menu_modal_1').click(()=>{
        loc = "female_showcase";
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        // now put the kitty grid into DOM @menu_modal
        // populate grid inside menu modal
        fetchCats(user, "menu");
    })

    $('#launch_menu_modal_2').click(()=>{
        loc = "male_showcase";
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        // now put the kitty grid into DOM @menu_modal
        // populate grid inside menu modal
        fetchCats(user, "menu");
    })

    $('#launch_breeder').click(()=>{
        hideAll();
        $('#launch_breeder').hide();
        $('#pride_link').show();
        $('#kitty-pride-grid').empty();
        $('#breeding_form').show();
        $('#breeding_title').show();
        $('#breeding_subtitle').show();
        $('#pride_title').hide();

    })

    $('#breedCats').click(()=>{
        dadCat = parseInt($('#dadCat').val());
        momCat = parseInt($('#momCat').val());
        $('#momCat').val('');
        $('#dadCat').val('');
        breedCats(dadCat, momCat, "pride");
        fetchCats(user, "pride");
        hideAll();        
        $('#kitty-pride-grid').empty();
        $('#breed_subtitle').show();
        $('#breeding_form').show();
        $('#pride_link').show();
    }) 
})

// creates a new kitty and transfers to msg.sender eth address.
function createKitty(user){
    let dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
        if(error)
            console.log(err);
        else
            console.log(txHash);
    });
}

// this is called when catbox divs are clicked on.  after two parent selections, an alert is thrown.
// the parents array gets emptied every time nav_pride gets clicked.
function selectCat(id) {
    if(loc == "menu" && parents.length < 2){
        parents.push(id); 
        console.log(parents);
    } else if(loc == "menu"){
        alert("Choose only two cats!");
    }
    // hides the modal menu after every cat selection
    $("#menu_modal").modal('hide');
    catParentsShowcase(loc, id);
}

// This gets called when we click on a cat in the menu_modal pop up menu
function catParentsShowcase(page, catId){
    // checks to see which page state is active
    if(page == "female_showcase"){
        $('#launch_menu_modal_1').empty();
        $('#launch_menu_modal_1').addClass('showcase_box');
        $('#launch_menu_modal_1').removeClass('breed_select');
        fetchSingleCat(user, "launch_menu_modal_1", catId);
        parents[0] = catId;
    } else {
        $('#launch_menu_modal_2').empty();
        $('#launch_menu_modal_2').addClass('showcase_box');
        $('#launch_menu_modal_2').removeClass('breed_select');
        fetchSingleCat(user, "launch_menu_modal_2", catId);
        parents[1] = catId;
    }
    console.log(parents);
}

function breedCats(_dadId, _momId, pride){
    // instance.methods.breed(_dadId, _momId).send({}, function(error, txHash){
    //     if(error)
    //         console.log(error);
    //     else
    //         console.log(txHash);
    // }); 

    instance.methods
    .breed(_dadId, _momId)
    .send()
    .on("transactionHash", function (hash) {
        console.log(hash); // 'etherscan.io/tx/${hash}'
    })
    .on("receipt", function (receipt) {
        // receipt example
        console.log(receipt);
        loc = "pride";
        hideAll();
        parents = [];
        $('#launch_menu_modal_1').empty();
        $('#launch_menu_modal_2').empty();
        $('#pride_link').show();
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        $('#kitty-pride-grid').show();

        $('#pride_subtitle').show();
        $('#breeding_form').hide();
        $('#breed_Select').show();
        $('#breeding_title').hide();
        $('#pride_title').show();
        $('#launch_breeder').show();
        $('#launch_menu_modal_1').html(
            `<img src="/client/assets/raster images/female_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_2').html(
            `<img src="/client/assets/raster images/male_cat.png" class="breed_select_icon"></img>`
        );
        $('#launch_menu_modal_1').addClass('breed_select');
        $('#launch_menu_modal_1').removeClass('showcase_box');
        $('#launch_menu_modal_2').addClass('breed_select');
        $('#launch_menu_modal_2').removeClass('showcase_box');
        fetchCats(user, pride);    
    })
    .on("error", (error) => {

    })
}