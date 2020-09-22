
var colors = Object.values(allColors())

var defaultDNA = {
    "headcolor" : 24,
    "mouthColor" : 22,
    "eyesColor" : 90,
    "earsColor" : 14,
    //Cattributes
    "markingsMidColor" : 22,
    "markingsOuterColor" : 14,
    "eyesShape" : 5,
    "markingsShape" : 6,
    "animation" :  3,
    "lastNum" :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
    
  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnamarkings').html(defaultDNA.markingsShape)
  $('#dnaMarkingsMid').html(defaultDNA.markingsMidColor)
  $('#dnaMarkingsOuter').html(defaultDNA.markingsOuterColor)
  $('#dnaAnimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnaMarkingsShape').html()
    dna += $('#dnaMarkingsMid').html()
    dna += $('#dnaMarkingsSides').html()
    dna += $('#dnaAnimation').html()
    dna += $('#dnaspecial').html()

    return parseInt(dna)
}

function renderCat(dna){
    headColor(colors[dna.headcolor],dna.headcolor)
    $('#bodycolor').val(dna.headcolor)
    mouthColor(colors[dna.mouthColor],dna.mouthColor)
    $('#mouthColor').val(dna.mouthColor)
    eyesColor(colors[dna.eyesColor],dna.eyesColor)
    $('#eyesColor').val(dna.eyesColor)
    earsColor(colors[dna.earsColor],dna.earsColor)
    $('#earsColor').val(dna.earsColor)
    eyeVariation(dna.eyesShape)
    $('#eyesShape').val(dna.eyesShape)
    markingsVariation(dna.markingsShape)
    $('#markingsShape').val(dna.markingsShape)
    markingsMidColor(colors[dna.markingsMidColor],dna.markingsMidColor)
    $('#markingsMidColor').val(dna.markingsMidColor)
    markingsOuterColor(colors[dna.markingsOuterColor],dna.markingsOuterColor)
    $('#markingsOuterColor').val(dna.markingsOuterColor)
    animationVariation(dna.animation)
    $('#animation').val(dna.animation)
}


// Changing cat colors
$('#bodycolor').change(()=>{
    var colorVal = $('#bodycolor').val()
    headColor(colors[colorVal],colorVal)
})

$('#mouthColor').change(()=>{
  var colorVal = $('#mouthColor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyesColor').change(()=>{
  var colorVal = $('#eyesColor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earsColor').change(()=>{
  var colorVal = $('#earsColor').val()
  earsColor(colors[colorVal],colorVal)
})

// Changing catributes
$('#eyesShape').change(()=>{
  var shapeVal = parseInt($('#eyesShape').val())
  eyeVariation(shapeVal)
})

$('#markingsPattern').change(()=>{
  var pattern = parseInt($('#markingsPattern').val())
  markingsVariation(pattern)
})

$('#markingsMidColor').change(()=>{
  var colorVal = $('#markingsMidColor').val()
  markingsMidColor(colors[colorVal],colorVal)
})

$('#markingsOuterColor').change(()=>{
  var colorVal = $('#markingsOuterColor').val()
  markingsOuterColor(colors[colorVal],colorVal)
})

$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val())
  animationVariation(animationVal)
})