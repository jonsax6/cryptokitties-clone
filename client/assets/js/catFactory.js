
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
    $('.cat__head, .cat__chest, .cat__ear--left, .cat__ear--right').css('background', '#' + color)  //This changes the color of the cat
    $('#headcode').html('code: '+code) //This updates text of the badge next to the slider
    $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
    $('.cat__mouth-contour, .cat__chest_inner, .cat__tail').css('background', '#' + color)
    $('#mouthCode').html('code: '+code)
    $('#dnamouth').html(code)
}

function eyesColor(color,code) {
    $('.cat__eye span').css('background', '#' + color)
    $('#eyesCode').html('code: '+code)
    $('#dnaeyes').html(code)
}

function earsColor(color,code) {
    $('.cat__ear--left-inside, .cat__ear--right-inside, .cat__paw-left, .cat__paw-right, .cat__paw-right_inner, .cat__paw-left_inner').css('background', '#' + color)
    $('#earsCode').html('code: '+code)
    $('#dnaears').html(code)
}

function markingsMidColor(color, code) {
    $('.cat__head-dots').css('background', '#' + color)
    $('#markingsMidCode').html('code: '+code)
    $('#dnaMarkingsMid').html(code)
}

function markingsOuterColor(color, code) {
    $('.cat__head-dots_first').css('background', '#' + color)
    $('.cat__head-dots_second').css('background', '#' + color)
    $('#markingsOuterCode').html('code: '+code)
    $('#dnaMarkingsOuter').html(code)
}

// funtions for animation
function animationVariation (num) {
    $('#dnaAnimation').html(num)
    switch (num) {
        case 1:
            $('#animationName').html('Head')
            animationType1()
            break
        case 2:
            $('#animationName').html('Ears')
            animationType2()
            break
        case 3:
            $('#animationName').html('Tail')
            animationType3()
            break
        case 4:
            $('#animationName').html('Whiskers')
            animationType4()
            break
        case 5:
            $('#animationName').html('Paw Tapping')
            animationType5()
            break
        case 6:
            $('#animationName').html('Nose')
            animationType6()
            break
    }
}

// cases 1-6
function animationType1() {
    $('#left_ears').removeClass('moving_Left_Ear')
    $('#right_ears').removeClass('moving_Right_Ear')
    $('#tail').removeClass('tail_Rotation')
    $('#whiskers_left').removeClass('twitch_Whiskers_Left')
    $('#whiskers_right').removeClass('twitch_Whiskers_Right')
    $('#right_paw').removeClass('tap_Right_Paw')
    $('#nose').removeClass('nose_Wiggle')
    $('#nose').removeClass('nose_Chest_Wiggle')
    $('#chest').removeClass('nose_Chest_Wiggle')
    $('#belly').removeClass('nose_Chest_Wiggle')
    $('#head').addClass('moving_Head');
}

function animationType2() {
    $('#head').removeClass('moving_Head')
    $('#tail').removeClass('tail_Rotation')
    $('#whiskers_left').removeClass('twitch_Whiskers_Left')
    $('#whiskers_right').removeClass('twitch_Whiskers_Right')
    $('#right_paw').removeClass('tap_Right_Paw')
    $('#nose').removeClass('nose_Wiggle')
    $('#nose').removeClass('nose_Chest_Wiggle')
    $('#chest').removeClass('nose_Chest_Wiggle')
    $('#belly').removeClass('nose_Chest_Wiggle')
    $('#left_ears').addClass('moving_Left_Ear')
    $('#right_ears').addClass('moving_Right_Ear')
}

function animationType3() {
    $('#head').removeClass('moving_Head')
    $('#left_ears').removeClass('moving_Left_Ear')
    $('#right_ears').removeClass('moving_Right_Ear')
    $('#whiskers_left').removeClass('twitch_Whiskers_Left')
    $('#whiskers_right').removeClass('twitch_Whiskers_Right')
    $('#right_paw').removeClass('tap_Right_Paw')
    $('#nose').removeClass('nose_Wiggle')
    $('#nose').removeClass('nose_Chest_Wiggle')
    $('#chest').removeClass('nose_Chest_Wiggle')
    $('#belly').removeClass('nose_Chest_Wiggle')
    $('#tail').addClass('tail_Rotation')

}

function animationType4() {
    $('#head').removeClass('moving_Head')
    $('#left_ears').removeClass('moving_Left_Ear')
    $('#right_ears').removeClass('moving_Right_Ear')
    $('#tail').removeClass('tail_Rotation')
    $('#right_paw').removeClass('tap_Right_Paw')
    $('#nose').removeClass('nose_Wiggle')
    $('#nose').removeClass('nose_Chest_Wiggle')
    $('#chest').removeClass('nose_Chest_Wiggle')
    $('#belly').removeClass('nose_Chest_Wiggle')
    $('#whiskers_left').addClass('twitch_Whiskers_Left')
    $('#whiskers_right').addClass('twitch_Whiskers_Right')
}

function animationType5() {
    $('#head').removeClass('moving_Head')
    $('#left_ears').removeClass('moving_Left_Ear')
    $('#right_ears').removeClass('moving_Right_Ear')
    $('#tail').removeClass('tail_Rotation')
    $('#whiskers_left').removeClass('twitch_Whiskers_Left')
    $('#whiskers_right').removeClass('twitch_Whiskers_Right')
    $('#nose').removeClass('nose_Wiggle')
    $('#nose').removeClass('nose_Chest_Wiggle')
    $('#chest').removeClass('nose_Chest_Wiggle')
    $('#belly').removeClass('nose_Chest_Wiggle')
    $('#right_paw').addClass('tap_Right_Paw')
}

function animationType6() {
    $('#head').removeClass('moving_Head')
    $('#left_ears').removeClass('moving_Left_Ear')
    $('#right_ears').removeClass('moving_Right_Ear')
    $('#tail').removeClass('tail_Rotation')
    $('#whiskers_left').removeClass('twitch_Whiskers_Left')
    $('#whiskers_right').removeClass('twitch_Whiskers_Right')
    $('#right_paw').removeClass('tap_Right_Paw')
    $('#nose').addClass('nose_Chest_Wiggle')
    $('#chest').addClass('nose_Chest_Wiggle')
    $('#belly').addClass('nose_Chest_Wiggle')
}

// functions for eye shape variations
function eyeVariation(num) {

    $('#dnashape').html(num)
    switch (num) {
        case 1:
            normalEyes()
            $('#eyeName').html('Basic')
            break
        case 2:
            normalEyes()
            $('#eyeName').html('Chill')
            return eyesType2()
            break
        case 3:
            normalEyes()
            $('#eyeName').html('Suspicious')
            return eyesType3()
            break
        case 4:
            normalEyes()
            $('#eyeName').html('Guilty')
            return eyesType4()
            break
        case 5:
            normalEyes()
            $('#eyeName').html('Dozing')
            return eyesType5()
            break
        case 6:
            normalEyes()
            $('#eyeName').html('Left')
            return eyesType6()
            break
        case 7:
            normalEyes()
            $('#eyeName').html('Right') 
            return eyesType7()
            break
    }
}

// cases 1-7
function normalEyes() {
    $('.cat__eye').find('span').css('border', 'none')
    $('.cat__eye span').removeClass('left');
    $('.cat__eye span').removeClass('up');
}

function eyesType2() {
    $('.cat__eye').find('span').css('border-top', '15px solid')
    $('.cat__eye span').removeClass('left');
    $('.cat__eye span').removeClass('up');
}

function eyesType3() {
    $('.cat__eye').find('span').css('border-top', '10px solid')
    $('.cat__eye').find('span').css('border-bottom', '10px solid')
    $('.cat__eye span').removeClass('left');
    $('.cat__eye span').removeClass('up');

}

function eyesType4() {
    $('.cat__eye').find('span').css('border-bottom', '10px solid')
    $('.cat__eye span').addClass('up');
    $('.cat__eye span').addClass('left');
}

function eyesType5() {
    $('.cat__eye').find('span').css('border-top', '20px solid')
    $('.cat__eye span').removeClass('left');
    $('.cat__eye span').removeClass('up');
}

function eyesType6() {
    $('.cat__eye').find('span').css('border-left', '10px solid')
    $('.cat__eye span').removeClass('left');
    $('.cat__eye span').removeClass('up');
}

function eyesType7() {
    $('.cat__eye').find('span').css('border-right', '10px solid')
    $('.cat__eye span').addClass('left');
    $('.cat__eye span').removeClass('up');

}

// functions for marking shape variateions
function markingsVariation(num) {
    $('#dnaMarkingsShape').html(num)
    switch (num) {
        case 1:
            $('#markingsName').html('Basic')
            normalMarkings()
            break
        case 2:
            $('#markingsName').html('Long')
            markings2()
            break
        case 3:
            $('#markingsName').html('Long Outwards')
            markings3()
            break
        case 4:
            $('#markingsName').html('Long Inwards')
            markings4()
            break
        case 5:
            $('#markingsName').html('Short')
            markings5()
            break
        case 6:
            $('#markingsName').html('Short Outwards')
            markings6()
            break
        case 7:
            $('#markingsName').html('Short Inwards')
            markings7()
            break
    }
}

// cases 1-7
async function normalMarkings() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings2() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings3() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings4() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "58px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(-10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(10deg)", "height": "45px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings5() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings6() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

async function markings7() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "38px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(-10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(10deg)", "height": "25px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}

