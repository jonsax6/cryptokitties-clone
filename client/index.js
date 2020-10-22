var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xfBa3c66d0b2043368b613a5d74226cb3892e3550";

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
        $('#breed_subtitle').hide();
    }

    // Array to record both parents.  It gets zero'd out on pride page load so new parents can be selected.
    var parents = [];

    // hide all on page load, then show homepage div
    hideAll();
    $('#homepage_link').show();

    // homepage nav menu click listener
    $('#nav_homepage').click(()=>{
        hideAll();
        $('#homepage_link').show();
    })

    // kitty pride nav menu click listener
    $('#nav_pride').click(()=>{
        hideAll();
        parents = [];
        $('#pride_link').show();
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        $('#kitty-pride-grid').show();

        $('#pride_subtitle').show();
        $('#breeding_form').hide();
        $('#breed_Select').show();
        fetchCats(user, "pride");
    })

    // Breeder nav menu click listener
    $('#nav_breed_0').click(()=>{
        hideAll();
        $('#breed_0_link').show();
    })

    // Breeder click listener in homepage banner
    $('#nav_breed_0_2').click(()=>{
        hideAll();
        $('#breed_0_link').show();
    })

    // the "Get Them A Room!" button.  Captures mom and dad ID selections from 'breeding_form' inputs
    // resets form inputs to ''
    // calls breetCats(datCat, momCat) which sends cat IDs to Kittycontract breed function.
    // clears page, then reloads kitty matrix with the new cats at the bottom of the page. 
    $('#breed_Select').click(()=>{
        hideAll();
        parents = [];
        // div containing the male-female chooser boxes
        $('#pride_link').show();
        $('#breeding_form').show();
        // hides the cat grid div
        $('#kitty-pride-grid').hide();
        $('#breed_Select').hide();
    })

    $('#launch_menu_modal').click(()=>{
        // first empty all grids to avoid id conflicts
        $('#kitty-pride-grid').empty();
        $('#kitty-menu-grid').empty();
        // now put the kitty grid into DOM @menu_modal
        $('#kitty-menu-grid').append(
            `
            <div class="col-lg-4 prideBox m-5" onclick="selectCat(${id})">
            <div class="cat">
                <div id="head_and_ears${id}">
                    <div id="cat_ear${id}" class="cat__ear">
                        <div id="left_ear${id}" class="cat__ear--left">
                            <div id="left_ear_inside${id}" class="cat__ear--left-inside"></div>
                        </div>
                        <div id="right_ear${id}" class="cat__ear--right">
                            <div id="right_ear_inside${id}" class="cat__ear--right-inside"></div>
                        </div>
                    </div>
    
                    <div id="head${id}" class="cat__head">
                        <div id="mid-dot${id}" class="cat__head-dots">
                            <div id="left_dot${id}" class="cat__head-dots_first"></div>
                            <div id="right_dot${id}" class="cat__head-dots_second"></div>
                        </div>
                        <div id="cat_eye${id}" class="cat__eye">
                            <div id="cat_eye_left${id}" class="cat__eye--left">
                                <span id="left_pupil${id}" class="pupil-left"></span>
                            </div>
                            <div class="cat__eye--right">
                                <span id="right_pupil${id}" class="pupil-right"></span>
                            </div>
                        </div>
                        <div id="nose${id}" class="cat__nose"></div>
    
                        <div id="mouth_contour${id}" class="cat__mouth-contour"></div>
                        <div class="cat__mouth-left"></div>
                        <div class="cat__mouth-right"></div>
    
                        <div id="whiskers_left${id}" class="cat__whiskers-left"></div>
                        <div id="whiskers_right${id}" class="cat__whiskers-right"></div>
                    </div>
    
                </div>
                
    
                <div class="cat__body">
    
                    <div id="chest${id}" class="cat__chest"></div>
    
                    <div id="belly${id}" class="cat__chest_inner"></div>
    
    
                    <div id="left_paw${id}" class="cat__paw-left"></div>
                    <div id="paw_left_inner${id}" class="cat__paw-left_inner"></div>
    
    
                    <div id="right_paw${id}" class="cat__paw-right"></div>
                    <div id="right_paw_inner${id}"class="cat__paw-right_inner"></div>
    
    
                    <div id="tail${id}" class="cat__tail"></div>
                </div>
            </div>
            <br>
            <div class="dnaDiv">
                <b>ID:<span id="cat_id${id}"></span></b><br>
                <b id="generation${id}"></b><br>
                <b>Genes: ${genes}</b>
            </div>
        </div>
            `
        )
        // populate grid inside menu modal
        fetchCats(user, "menu");
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

// this is called when catbox divs are clicked on.  after two selections, an alert is thrown.
function selectCat(id) {
    if(parents.length < 2){
        parents.push(id); 
        console.log(parents);
    } else {
        alert("only two cats can mate!");
    }
}

function catParentsMenu() {
    // Whenever possible, place your modal HTML in a top-level position to avoid potential 
    // interference from other elements. You’ll likely run into issues when nesting a .modal 
    // within another fixed element.
    $('body').append(
        // modal window popout
        `<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        test content
        </div>`
    )
}

function breedCats(_dadId, _momId, grid){
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
        fetchCats(user, grid);
    })
    .on("error", (error) => {

    })
}