var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x1F51FB2e9A7A090A2585dfFBD2fd071bF49d4aE7";

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
            <b>owner: ${owner}</b><br>
            <b>kittenId: ${kittenId}</b><br>
            <b>momId: ${momId}</b><br>
            <b>dadId: ${dadId}</b><br>
            <b>genes: ${genes}</b><br>`)
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