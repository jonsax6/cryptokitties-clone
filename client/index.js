var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0xad8055B4552cd21F119Bf0Ac9ae58a1475c0A8df";

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