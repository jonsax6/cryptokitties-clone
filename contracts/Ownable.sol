pragma solidity 0.6.6;

contract Ownable{

    address payable public owner;

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _; //continue execution
    }
}