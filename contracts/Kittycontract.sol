pragma solidity ^0.5.12;

import "./IERC721.sol";

contract Kittycontract is IERC721 {

    string public constant _name = "JC_Kitties";
    string public constant _symbol = "JCK";
    address contractAddress;

    struct Kitty {
        uint256 genes;
        uint64 birthTime;
        uint32 momId;
        uint32 dadId;
        uint16 generation;
    }

    Kitty[] kitties;

    uint256 private _totalSupply;

    mapping(uint256 => address) public kittyIndexToOwner;
    mapping(address => uint256) ownershipTokenCount;


    function balanceOf(address owner) external view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    function totalSupply() external view returns (uint256 total) {
        return _totalSupply;
    }

    function name() external view returns (string memory tokenName) {
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
        return _symbol;
    }

    function ownerOf(uint256 tokenId) external view returns (address owner) {
        require(kitties[tokenId].birthTime != 0);
        return kittyIndexToOwner[tokenId];
    }

    function transfer(address to, uint256 tokenId) external {
        require(to != address(0), "sent to the zero address");
        require(to != address(this), "sent to contract address");
        require(kittyIndexToOwner[tokenId] == msg.sender);

        kittyIndexToOwner[tokenId] = to;
        emit Transfer(address(msg.sender), address(to), tokenId);
    }
}