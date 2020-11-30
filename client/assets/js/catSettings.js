
var colors = Object.values(allColors())

var defaultDNA = {
    //Colors
    headColor : 53,
    mouthColor : 68,
    eyesColor : 29,
    earsColor : 85,
    //Cattributes
    markingsMidColor : 54,
    markingsOuterColor : 52,
    eyesShape : 2,
    markingsShape : 6,
    animation :  1,
    lastNum :  1
    }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);
  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnamarkings').html(defaultDNA.markingsShape);
  $('#dnaMarkingsMid').html(defaultDNA.markingsMidColor);
  $('#dnaMarkingsOuter').html(defaultDNA.markingsOuterColor);
  $('#dnaAnimation').html(defaultDNA.animation);
  $('#dnaspecial').html(defaultDNA.lastNum);

  renderCat(defaultDNA)
});

// creates the DNA string and then parseInt into an integer.  
// index.js createKitty() to send DNA integer to createKittyGen0() function call in Kittycontract.sol 
function getDna(){
    var dna = ''
    dna += $('#dnabody').html()
    dna += $('#dnamouth').html()
    dna += $('#dnaeyes').html()
    dna += $('#dnaears').html()
    dna += $('#dnashape').html()
    dna += $('#dnaMarkingsShape').html()
    dna += $('#dnaMarkingsMid').html()
    dna += $('#dnaMarkingsOuter').html()
    dna += $('#dnaAnimation').html()
    dna += $('#dnaspecial').html()

    return (dna)
}

function renderCat(dna){
  headColor(colors[dna.headColor],dna.headColor)
  $('#bodycolor').val(dna.headColor)
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

function defaultCat(){
  renderCat(defaultDNA);
}

function randomCat(){
  var randomDNA = {
    //Colors
    headColor : Math.floor(Math.random() * 89) + 10,
    mouthColor : Math.floor(Math.random() * 89) + 10,
    eyesColor : Math.floor(Math.random() * 89) + 10,
    earsColor : Math.floor(Math.random() * 89) + 10,
    //Cattributes
    markingsMidColor : Math.floor(Math.random() * 89) + 10,
    markingsOuterColor : Math.floor(Math.random() * 89) + 10,
    eyesShape : Math.floor(Math.random() * 7) + 1,
    markingsShape : Math.floor(Math.random() * 7) + 1,
    animation :  Math.floor(Math.random() * 6) + 1,
    lastNum :  1  
  }
  renderCat(randomDNA)
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

$('#markingsShape').change(()=>{
  var pattern = parseInt($('#markingsShape').val())
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

$('#breeder-btn').click(()=>{
  window.location.href='/client/breeder.html';
})

$('#homepage-btn').click(()=>{
  window.location.href='/client/breeder.html';
})