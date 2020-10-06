var web3 = new Web3(Web3.givenProvider);

var instance;
var user;
var contractAddress = "0x3Cb31E4Be8a8E75FcF3699253D0b2C521A9Bf19D";

$(document).ready(async function(){
    const accounts = await window.ethereum.enable();
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);
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