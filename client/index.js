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
    let tokenIds = instance.methods.getKittiesByUser(user).call();
    return tokenIds;
}

var tokenIds = getUserIds(user);

function addToKittyPride(ids){
    let cats = [];
    for(let i = 0; i < ids.length; i++){
        // push the kitty object returned from getKitty function call into the cats array
        cats.push(instance.methods.getKitty(tokenIds[i]).call());
    }
    // after we get the full object array do something else still figuring out...      
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
            <div class="dnaDiv" id="catDNA${id}">
                <b>
                    DNA:
                    <!-- Colors -->
                     <span id="dnabody${id}"></span>
                     <span id="dnamouth${id}"></span>
                     <span id="dnaeyes${id}"></span>
                     <span id="dnaears${id}"></span>
                    
                     <!-- Cattributes -->
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
}



// function to call the smart contract and fetch kitties owner by "user"
// get back an array of Kitty ids
// need to use instance.methods.getKittiesByUser(user).call()
// once we get the ids, we need to populate the pride
// maybe we need to loop and get each kitty's info instance.methods.getKitty(id).call()
// we get the genes (uint 2353845345078) and generation of each kitty  

