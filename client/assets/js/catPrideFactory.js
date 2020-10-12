
// This function adds a cat from our user's collection
function addToKittyPride(id){
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

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code, id) {
    $(`#head${id}, #chest${id}, #left_ear${id}, #right_ear${id}`).css('background', '#' + color)  //This changes the color of the cat
    $(`#headcode${id}`).html('code: '+code) //This updates text of the badge next to the slider
    $(`#dnabody${id}`).html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $(`#mouth_contour${id}, #belly${id}, #tail${id}`).css('background', '#' + color)
    $(`#mouthCode${id}`).html('code: '+code)
    $(`#dnamouth${id}`).html(code)
}

function eyesColor(color,code) {
    $(`#left_pupil${id}, #right_pupil${id}`).css('background', '#' + color)
    $(`#eyesCode${id}`).html('code: '+code)
    $(`#dnaeyes${id}`).html(code)
}

function earsColor(color,code) {
    $(`#left_ear_inside${id}, #right_ear_inside${id}, #left_paw${id}, #right_paw${id}, #right_paw_inner${id}, #paw_left_inner${id}`).css('background', '#' + color)
    $(`#earsCode${id}`).html('code: '+code)
    $(`#dnaears${id}`).html(code)
}

function markingsMidColor(color, code) {
    $(`#mid-dot${id}`).css('background', '#' + color)
    $(`#markingsMidCode${id}`).html('code: '+code)
    $(`#dnaMarkingsMid${id}`).html(code)
}

function markingsOuterColor(color, code) {
    $(`#left_dot${id}`).css('background', '#' + color)
    $(`#right_dot${id}`).css('background', '#' + color)
    $(`#markingsOuterCode${id}`).html('code: '+code)
    $(`#dnaMarkingsOuter${id}`).html(code)
}

// funtions for animation
function animationVariation (num, id) {
    $(`#dnaAnimation${id}`).html(num)
    switch (num) {
        case 1:
            $(`#animationName${id}`).html('Head')
            animationType1()
            break
        case 2:
            $(`#animationName${id}`).html('Ears')
            animationType2()
            break
        case 3:
            $(`#animationName${id}`).html('Tail')
            animationType3()
            break
        case 4:
            $(`#animationName${id}`).html('Whiskers')
            animationType4()
            break
        case 5:
            $(`#animationName${id}`).html('Paw Tapping')
            animationType5()
            break
        case 6:
            $(`#animationName${id}`).html('Nose & Torso')
            animationType6()
            break
    }
}

// cases 1-6
function animationType1(id) {
    $(`#leftEar${id}`).removeClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#leftEar${id}`).removeClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).removeClass(`perky_Ear_Right`)
    $(`#head_and_ears${id}`).addClass(`moving_Head`);
}

function animationType2(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#leftEar${id}`).removeClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).removeClass(`perky_Ear_Right`)
    $(`#leftEar${id}`).addClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).addClass(`moving_Right_Ear`)
}

function animationType3(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#leftEar${id}`).removeClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).removeClass(`moving_Right_Ear`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#leftEar${id}`).addClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).addClass(`perky_Ear_Right`)
    $(`#tail${id}`).addClass(`tail_Rotation`)

}

function animationType4(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#leftEar${id}`).removeClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#leftEar${id}`).removeClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).removeClass(`perky_Ear_Right`)
    $(`#whiskers_left${id}`).addClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).addClass(`twitch_Whiskers_Right`)
}

function animationType5(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#leftEar${id}`).removeClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#nose${id}`).removeClass(`nose_Wiggle`)
    $(`#nose${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).removeClass(`nose_Chest_Wiggle`)
    $(`#leftEar${id}`).addClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).addClass(`perky_Ear_Right`)
    $(`#right_paw${id}`).addClass(`tap_Right_Paw`)
}

function animationType6(id) {
    $(`#head_and_ears${id}`).removeClass(`moving_Head`)
    $(`#leftEar${id}`).removeClass(`moving_Left_Ear`)
    $(`#rightEar${id}`).removeClass(`moving_Right_Ear`)
    $(`#tail${id}`).removeClass(`tail_Rotation`)
    $(`#whiskers_left${id}`).removeClass(`twitch_Whiskers_Left`)
    $(`#whiskers_right${id}`).removeClass(`twitch_Whiskers_Right`)
    $(`#right_paw${id}`).removeClass(`tap_Right_Paw`)
    $(`#leftEar${id}`).removeClass(`perky_Ear_Left`)
    $(`#rightEar${id}`).removeClass(`perky_Ear_Right`)
    $(`#nose${id}`).addClass(`nose_Chest_Wiggle`)
    $(`#chest${id}`).addClass(`nose_Chest_Wiggle`)
    $(`#belly${id}`).addClass(`nose_Chest_Wiggle`)
}

// functions for eye shape variations
function eyeVariation(num, id) {

    $(`#dnashape${id}`).html(num, id)
    switch (num) {
        case 1:
            normalEyes(id)
            break
        case 2:
            normalEyes(id)
            return eyesType2(id)
            break
        case 3:
            normalEyes(id)
            return eyesType3(id)
            break
        case 4:
            normalEyes(id)
            return eyesType4(id)
            break
        case 5:
            normalEyes(id)
            return eyesType5(id)
            break
        case 6:
            normalEyes(id)
            return eyesType6(id)
            break
        case 7:
            normalEyes(id)
            return eyesType7(id)
            break
    }
}

// cases 1-7
function normalEyes(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border`, `none`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function eyesType2(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `15px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function eyesType3(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `10px solid`)
    $(`#cat_eye${id}`).find(`span`).css(`border-bottom`, `10px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);

}

function eyesType4(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-bottom`, `10px solid`)
    $(`#left_pupil${id}`).addClass(`left`);
    $(`#left_pupil${id}`).addClass(`up`);
    $(`#right_pupil${id}`).addClass(`left`);
    $(`#right_pupil${id}`).addClass(`up`);
}

function eyesType5(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-top`, `20px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function eyesType6(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-left`, `10px solid`)
    $(`#left_pupil${id}`).removeClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`left`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

function eyesType7(id) {
    $(`#cat_eye${id}`).find(`span`).css(`border-right`, `10px solid`)
    $(`#left_pupil${id}`).addClass(`left`);
    $(`#right_pupil${id}`).addClass(`left`);
    $(`#left_pupil${id}`).removeClass(`up`);
    $(`#right_pupil${id}`).removeClass(`up`);
}

// functions for marking shape variateions
function markingsVariation(num, id) {
    $(`#dnaMarkingsShape${id}`).html(num)
    switch (num) {
        case 1:
            $(`#markingsName${id}`).html(`Basic`)
            normalMarkings()
            break
        case 2:
            $(`#markingsName${id}`).html(`Long`)
            markings2()
            break
        case 3:
            $(`#markingsName${id}`).html(`Long Outwards`)
            markings3()
            break
        case 4:
            $(`#markingsName${id}`).html(`Long Inwards`)
            markings4()
            break
        case 5:
            $(`#markingsName${id}`).html(`Short`)
            markings5()
            break
        case 6:
            $(`#markingsName${id}`).html(`Short Outwards`)
            markings6()
            break
        case 7:
            $(`#markingsName${id}`).html(`Short Inwards`)
            markings7()
            break
    }
}

// cases 1-7
async function normalMarkings(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings2(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings3(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings4(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings5(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings6(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings7(id) {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $(`#mid-dot${id}`).css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $(`#left_dot${id}`).css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $(`#right_dot${id}`).css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

