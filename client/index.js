var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xB01C0f0Eb65f860fA1EB38ab2174274056cf3b43";

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
})

function createKitty(){
    let dnaStr = getDna();
    instance.methods.createKittyGen0(dnaStr).send({}, function(error, txHash){
        if(error)
            console.log(err);
        else
            console.log(txHash);
    })
}

function getUserIds(user) {
    let userTokens = instance.methods.getKittiesByUser(user).call();
    return userTokens;
}

function getKittyObject(idsArray){
    let ownerKitties = [];
    for(let i = 0; i < idsArray.length; i++){
        // each loop pushes a kitty object from the getKitty function call into the ownerKitties object array
        ownerKitties.push(instance.methods.getKitty(idsArray[i]).call());
    }
return ownerKitties;
}

function makeDNA(genes){
    var DNA = {
        headColor : genes.substr(0,2),
        mouthColor : genes.substr(2,2),
        eyesColor : genes.substr(4,2),
        earsColor : genes.substr(6,2),
        markingsMidColor : genes.substr(8,1),
        markingsOuterColor : genes.substr(9,1),
        eyesShape : genes.substr(10,2),
        markingsShape : genes.substr(12,2),
        animation :  genes.substr(14,1),
        lastNum :  1
    }
return DNA;
}

// now we have the full object array, grab the id, genes and generation for each kitty, then render each cat to the grid
function addToKittyPride(CatObjectArray){
    for(let i = 0; i < CatObjectArray.length; i++){
        let id = tokenIds[i];
        let genes = CatObjectArray[i].genes;
        let generation = CatObjectArray[i].generation;
        
        // populate the html with the kitty w/id
        $('#kitty-pride-grid').append(
            `
            <div class="col-lg-4 prideBox">
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
                <b id="cat_id${id}"></b><br>
                <b id="generation${id}"></b><br>
                <b>
                    DNA:
                    <span id="dnabody${id}"></span>
                    <span id="dnamouth${id}"></span>
                    <span id="dnaeyes${id}"></span>
                    <span id="dnaears${id}"></span>
                    <span id="dnashape${id}"></span>
                    <span id="dnaMarkingsShape${id}"></span>
                    <span id="dnaMarkingsMid${id}"></span>
                    <span id="dnaMarkingsOuter${id}"></span>
                    <span id="dnaAnimation${id}"></span>
                    <span id="dnaspecial${id}"></span>
                </b>
            </div>
        </div>
            `
        )
        
        // make the DNA object
        let DNA = makeDNA(genes);
        
        // populates the appended html with the DNA data
        $(`#dnabody${id}`).html(DNA.headColor);
        $(`#dnamouth${id}`).html(DNA.mouthColor);
        $(`#dnaeyes${id}`).html(DNA.eyesColor);
        $(`#dnaears${id}`).html(DNA.earsColor);
        $(`#dnashape${id}`).html(DNA.eyesShape);
        $(`#dnamarkings${id}`).html(DNA.markingsShape);
        $(`#dnaMarkingsMid${id}`).html(DNA.markingsMidColor);
        $(`#dnaMarkingsOuter${id}`).html(DNA.markingsOuterColor);
        $(`#dnaAnimation${id}`).html(DNA.animation);
        $(`#dnaspecial${id}`).html(DNA.lastNum);

        // render cat from DNA for kitty id
        renderCat(DNA, id);

        // populate the appended html with the Kitty generation
        $(`#cat_id${id}`).html(`ID: ${id}`);

        // populate the appended html with the kitty ID
        $(`#generation${id}`).html(`Generation: ${generation}`);
    }
}

// listener for ETH address form - collects user address, pings Kittycontract.sol for tokenId array, 
// calls addToKittyPride function to populate page with all owned kitties.
$('#submit_eth_address').click(() =>{
    // bind user addres to user variable
    user = $("#enter_owner_eth_address").val();

    // now we fetch the user id array from Kittycontract.sol and bind to the tokenIds variable
    var tokenIds = getUserIds(user);

    // now execute the main function to populate the page with user's kitties using getKittyObject() function call
    // as the argument to fetch the kittyObject from Kittycontract.sol
    addToKittyPride(getKittyObject(tokenIds)); 
})

