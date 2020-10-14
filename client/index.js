var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xe004125b1ce5EBB09103E161Fa2780DE4B11E217";

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
    fetchCats(user);

    // hides all page divs for clean page load on click listeners and page refresh.
    function hideAll(){
        $('#homepage_link').hide();
        $('#breeder_link').hide();
        $('#pride_link').hide();
    }
    // hide all on page load, then show homepage div
    hideAll();
    $('#homepage_link').show();

    // homepage nav menu click listener
    $('#nav_homepage').click(()=>{
        hideAll();
        $('#homepage_link').show();
    })

    // kitty pride nav menu click listener
    $('#nav_pride').click(async()=>{
        hideAll();
        $('#kitty-pride-grid').empty();
        fetchCats(user)        
        $('#pride_link').show();
    })

    // Breeder nav menu click listener
    $('#nav_breeder').click(()=>{
        hideAll();
        $('#breeder_link').show();
    })

    // Breeder click listener in homepage banner
    $('#nav_breeder2').click(()=>{
        hideAll();
        $('#breeder_link').show();
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
    })
}