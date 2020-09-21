
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
    $('.cat__ear--left-inside, .cat__ear--right-inside, .cat__paw-left, .cat__paw-right, .cat__paw-right_inner, .cat__paw-left_inner, .cat__head-dots, .cat__head-dots_first, .cat__head-dots_second').css('background', '#' + color)
    $('#earsCode').html('code: '+code)
    $('#dnaears').html(code)
}

//###################################################
//Functions below will be used later on in the project
//###################################################
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

function decorationVariation(num) {
    $('#dnadecoration').html(num)
    switch (num) {
        case 1:
            $('#decorationName').html('Basic')
            normaldecoration()
            break
    }
}

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


async function normaldecoration() {
    //Remove all style from other decorations
    //In this way we can also use normalDecoration() to reset the decoration style
    $('.cat__head-dots').css({ "transform": "rotate(0deg)", "height": "48px", "width": "14px", "top": "1px", "border-radius": "0 0 50% 50%" })
    $('.cat__head-dots_first').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "50% 0 50% 50%" })
    $('.cat__head-dots_second').css({ "transform": "rotate(0deg)", "height": "35px", "width": "14px", "top": "1px", "border-radius": "0 50% 50% 50%" })
}
