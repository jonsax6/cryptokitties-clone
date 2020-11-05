var colors = Object.values(allColors())

function _renderCat(dna, id){
    _headColor(colors[dna.headColor], id);
    _mouthColor(colors[dna.mouthColor], id);
    _eyesColor(colors[dna.eyesColor], id);
    _earsColor(colors[dna.earsColor], id);
    _eyeVariation(dna.eyesShape, id);
    _markingsVariation(dna.markingsShape, id);
    _markingsMidColor(colors[dna.markingsMidColor], id);
    _markingsOuterColor(colors[dna.markingsOuterColor], id);
    _animationVariation(dna.animation, id);
}

//These functions create each kitty's various css stylings according to id
function _headColor(color, id) {
    $(`#head${id}, #chest${id}, #left_ear${id}, #right_ear${id}`).css('background', '#' + color)  //This changes the color of the cat
}

function _mouthColor(color, id) {
    $(`#mouth_contour${id}, #belly${id}, #tail${id}`).css('background', '#' + color)
}

function _eyesColor(color, id) {
    $(`#left_pupil${id}, #right_pupil${id}`).css('background', '#' + color)
}

function _earsColor(color, id) {
    $(`#left_ear_inside${id}, #right_ear_inside${id}, #left_paw${id}, #right_paw${id}, #right_paw_inner${id}, #paw_left_inner${id}`).css('background', '#' + color)
}

function _markingsMidColor(color, id) {
    $(`#mid-dot${id}`).css('background', '#' + color)
}

function _markingsOuterColor(color, id) {
    $(`#left_dot${id}`).css('background', '#' + color)
    $(`#right_dot${id}`).css('background', '#' + color)
}

// funtions for animation

// cases 1-6
function _animationType1(id) {
    $(`#left_ear${id}`).removeClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#left_ear${id}`).removeClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).removeClass(`perky_Ear_Right`)
    $(`#head_and_ears${id}`).addClass(`moving_Head`);
}

function _animationType2(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#left_ear${id}`).removeClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).removeClass(`perky_Ear_Right`)
    $(`#left_ear${id}`).addClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).addClass(`moving_Right_Ear`)
}

function _animationType3(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#left_ear${id}`).removeClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).removeClass(`moving_Right_Ear`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#left_ear${id}`).addClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).addClass(`perky_Ear_Right`)
    $(`#tail${id}`).addClass(`tail_Rotation`)

}

function _animationType4(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#left_ear${id}`).removeClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#left_ear${id}`).removeClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).removeClass(`perky_Ear_Right`)
    $(`#whiskers_left${id}`).addClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).addClass(`twitch_Whiskers_Right`)
}

function _animationType5(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#left_ear${id}`).removeClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#left_ear${id}`).addClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).addClass(`perky_Ear_Right`)
    $(`#right_paw${id}`).addClass(`tap_Right_Paw`)
}

function _animationType6(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#left_ear${id}`).removeClass(`moving_Left_Ear`)
    $(`#right_ear${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#left_ear${id}`).removeClass(`perky_Ear_Left`)
    $(`#right_ear${id}`).removeClass(`perky_Ear_Right`)
    $(`#nose${id}`).addClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).addClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).addClass(`nose_Chest_Wiggle`)
}

function _animationVariation(num, id) {
    switch (parseInt(num)) {
        case 1:
            _animationType1(id)
            break
        case 2:
            _animationType2(id)
            break
        case 3:
            _animationType3(id)
            break
        case 4:
            _animationType4(id)
            break
        case 5:
            _animationType5(id)
            break
        case 6:
            _animationType6(id)
            break
    }
}

// cases 1-7
function _normalEyes(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border`, `none`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function _eyesType2(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `15px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function _eyesType3(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `10px solid`)
    $(`#cat_eye${id}`).find(`span`).css(`border-bottom`, `10px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);

}

function _eyesType4(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-bottom`, `10px solid`)
    $(`#left_pupil${id}`).addClass(`left`);
    $(`#left_pupil${id}`).addClass(`up`);
    $(`#right_pupil${id}`).addClass(`left`);
    $(`#right_pupil${id}`).addClass(`up`);
}

function _eyesType5(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `20px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function _eyesType6(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-left`, `10px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function _eyesType7(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-right`, `10px solid`)
    $(`#left_pupil${id}`).addClass(`left`);
    $(`#right_pupil${id}`).addClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

// functions for eye shape variations
function _eyeVariation(num, id) {
    switch (parseInt(num)) {
        case 1:
            _normalEyes(id);
            break;
        case 2:
            _normalEyes(id);
            return _eyesType2(id);
            break;
        case 3:
            _normalEyes(id);
            return _eyesType3(id);
            break;
        case 4:
            _normalEyes(id);
            return _eyesType4(id);
            break;
        case 5:
            _normalEyes(id);
            return _eyesType5(id);
            break;
        case 6:
            _normalEyes(id);
            return _eyesType6(id);
            break;
        case 7:
            _normalEyes(id);
            return _eyesType7(id);
            break;
    }
}

// cases 1-7
async function _normalMarkings(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings2(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings3(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings4(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings5(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings6(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function _markings7(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

// functions for marking shape variateions
function _markingsVariation(num, id) {
    switch (parseInt(num)) {
        case 1:
            _normalMarkings(id);
            break;
        case 2:
            _normalMarkings(id);
            return _markings2(id);
            break;
        case 3:
            _normalMarkings(id);
            return _markings3(id);
            break;
        case 4:
            _normalMarkings(id);
            return _markings4(id);
            break;
        case 5:
            _normalMarkings(id);
            return _markings5(id);
            break;
        case 6:
            _normalMarkings(id);
            return _markings6(id);
            break;
        case 7:
            _normalMarkings(id);
            return _markings7(id);
            break;
    }
}


// code for fetching kitties from blockchain and rendering to grid

async function getUserIds(user) {
    let userTokens = await instance.methods.getKittiesByUser(user).call();
    return userTokens;
}

// use the id array fetched from getKittiesByUser() from Kittycontract via getUserIds() js function 
// and now fetch each cat object using getKitty() from Kittycontract
async function getKittyObject(idsArray){
    let ownerKitties = []; // local array we will build in this function
    for(let i = 0; i < idsArray.length; i++){ // loop through each index of the idsArray
        // each loop pushes a kitty object from the getKitty function call into the ownerKitties object array
        let kitty = await instance.methods.getKitty(idsArray[i]).call();

        // create a new value of catId to each kitty object in the array and assign it the correct id
        kitty.catId = idsArray[i];

        // now add the new kitty object to our local array ownerKitties
        ownerKitties.push(kitty);
    }
return ownerKitties;
}

function makeDNA(genes){
    var DNA = {
        headColor : genes.substr(0,2),
        mouthColor : genes.substr(2,2),
        eyesColor : genes.substr(4,2),
        earsColor : genes.substr(6,2),
        eyesShape : genes.substr(8,1),
        markingsShape : genes.substr(9,1),
        markingsMidColor : genes.substr(10,2),
        markingsOuterColor : genes.substr(12,2),
        animation :  genes.substr(14,1),
        lastNum :  1
    }
return DNA;
}

// now we have the full object array, grab the id, genes and generation for each kitty, then render each cat to the grid
async function appendGrid(CatObjectArray, grid){
    // empty all kitty grids prior to populating any fresh grid 
    // to avoid attribute id conflicts and to avoid adding new grid to bottom of old one
    $('#kitty-pride-grid').empty();
    $('#kitty-menu-grid').empty();

    // loop through each index of the cat object array
    for(let i = 0; i < CatObjectArray.length; i++){
        // console.log(CatObjectArray);
        if(CatObjectArray[i].catId != 0){
        // the catObjectArray index mirrors the ids array index (containing the cat ids), therefore we can 
        // take the ids array value at each index[i] to get the cat id.
        let cat = CatObjectArray[i];
        let id = cat.catId;

        // get genes from cat object array
        let genes = cat.genes;
        let momId = cat.momId;
        let dadId = cat.dadId;
        let price = cat.price;

        // get generation from cat object array
        let generation = cat.generation;
        // populate the html with the kitty w/id: id 

        // populate either kitty-pride-grid or kitty-menu-grid
        $(`#kitty-${grid}-grid`).append(
            `
            <div id="box${id}" class="col-lg-4 prideBox" onclick="selectCat(${id})">
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
            <div class="dnaDiv text-light">
                <b>ID:<span id="cat_id${id}"></span></b><br>
                <b>dadID:&nbsp${dadId}</b><br>
                <b>momID:&nbsp${momId}</b><br>
                <b id="generation${id}"></b><br>
                <b class="kitty_dna_block">DNA:
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
                <b class="kitty_price_block">Price: <span class="eth_symbol">Ξ</span>${price} ETH</b>
            </div>
        </div>
            `
        )

        // now create the DNA object from the genes fetched from the cat object array
        let DNA = makeDNA(genes);

        // populate the DNA spans
        $(`#dnabody${id}`).html(DNA.headColor);
        $(`#dnamouth${id}`).html(DNA.mouthColor);
        $(`#dnaeyes${id}`).html(DNA.eyesColor);
        $(`#dnaears${id}`).html(DNA.earsColor);
        $(`#dnashape${id}`).html(DNA.eyesShape);
        $(`#dnaMarkingsShape${id}`).html(DNA.markingsShape);
        $(`#dnaMarkingsMid${id}`).html(DNA.markingsMidColor);
        $(`#dnaMarkingsOuter${id}`).html(DNA.markingsOuterColor);
        $(`#dnaAnimation${id}`).html(DNA.animation);
        $(`#dnaspecial${id}`).html(DNA.lastNum);

        // render cat from DNA for kitty id
        _renderCat(DNA, id);

        // populate the appended html with the Kitty ID
        $(`#cat_id${id}`).html(`&nbsp${id}`);

        // populate the appended html with the kitty generation
        $(`#generation${id}`).html(`Generation: ${generation}`);



        }      
    }
}

async function appendShowcase(CatObjectArray, id, box){
    // see comments for appendGrid above, this function is identical, except with no looping, renders one cat into a div
    // make sure ALL cat grids are empty first to avoid id conflicts
    $(`#kitty-pride-grid`).empty();
    $(`#kitty-menu-grid`).empty();
    $(`#${box}`).empty();

    // filter for the cat with catId == id.  Since this produces 
    // a one element array, we just add [0] and assign this to local variable catParent.
    let catParent = CatObjectArray.filter(cat => cat.catId == id)[0];

    // fetch kitty parameters from variables obtained from blockchain
    let genes = catParent.genes;
    let generation = catParent.generation;
    let momId = catParent.momId;
    let dadId = catParent.dadId;
    let price = catParent.price;
    
    // render the html structure to the div
    $(`#${box}`).append(
        `
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
            <div class="dnaDiv text-light">
            <b>ID:<span id="cat_id${id}"></span></b><br>
            <b>dadID:&nbsp${dadId}</b><br>
            <b>momID:&nbsp${momId}</b><br>
            <b id="generation${id}"></b><br>
            <b class="kitty_dna_block">DNA:
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
            <b class="kitty_price_block">Price: <span class="eth_symbol">Ξ</span>${price} ETH</b>
            </div>
            `
    )
    
    // render the cat into the appended html
    let DNA = makeDNA(genes);

    // populate the DNA spans
    $(`#dnabody${id}`).html(DNA.headColor);
    $(`#dnamouth${id}`).html(DNA.mouthColor);
    $(`#dnaeyes${id}`).html(DNA.eyesColor);
    $(`#dnaears${id}`).html(DNA.earsColor);
    $(`#dnashape${id}`).html(DNA.eyesShape);
    $(`#dnaMarkingsShape${id}`).html(DNA.markingsShape);
    $(`#dnaMarkingsMid${id}`).html(DNA.markingsMidColor);
    $(`#dnaMarkingsOuter${id}`).html(DNA.markingsOuterColor);
    $(`#dnaAnimation${id}`).html(DNA.animation);
    $(`#dnaspecial${id}`).html(DNA.lastNum);

    _renderCat(DNA, id);
    $(`#cat_id${id}`).html(`${id}`);
    $(`#generation${id}`).html(`Generation: ${generation}`);
    if(loc == "adopt"){
        $(`#buy_price`).html(`Price: <span class="eth_symbol">Ξ</span>${price} ETH`);
    }
}

async function fetchCats(_user){
    // now we fetch the user id array from Kittycontract.sol and bind to the tokenIds variable
    tokenIds = await getUserIds(_user);

    // now execute the main function to populate the page with the user's kitties using getKittyObject() function call
    // as the argument to fetch the kittyObject from Kittycontract.sol and pass into the addToKittyPride() function
    catObj = await getKittyObject(tokenIds);
} 
