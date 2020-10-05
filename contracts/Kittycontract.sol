pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    uint256 public constant CREATION_LIMIT_GEN0 = 10;
    string public constant _name = "JC_Kitties";
    string public constant _symbol = "JCK";

    event Birth(
        address owner, 
        uint256 kittenId,
        uint256 momId,
        uint256 dadId,
        uint256 genes
    );

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

    uint256 public gen0Counter;

    function creatKittyGen0(uint256 _genes) public onlyOwner {
        require(gen0Counter < CREATION_LIMIT_GEN0);

        gen0Counter++;

        // Gen0 have no owners they are owned by the contract
        _createKitty(0, 0, 0, _genes, address(this));
    }

    function _createKitty(
        uint256 _momId,
        uint256 _dadId,
        uint256 _generation,
        uint256 _genes,
        address _owner
    ) private returns (uint256) {
        Kitty memory _kitty = Kitty({
            genes: _genes,
            birthTime: uint64(now),
            momId: uint32(_momId),
            dadId: uint32(_dadId),
            generation: uint16(_generation)
        });

        uint256 newKittenId = kitties.push(_kitty) -1;

        emit Birth(_owner, newKittenId, _momId, _dadId, _genes);

        _transfer(address(0), _owner, newKittenId);

        return newKittenId;
    } 

    function getKitty(uint256 _id) external view returns (
        uint256 genes,
        uint256 birthTime,
        uint256 momId,
        uint256 dadId,
        uint256 generation
    ) 
    {
        Kitty storage kitty = kitties[_id];

        genes = kitty.genes;
        birthTime = uint256(kitty.birthTime);
        momId = uint256(kitty.momId);
        dadId = uint256(kitty.dadId);
        generation = uint256(kitty.generation);
    }

    function balanceOf(address owner) external view returns (uint256 balance) 
    {
        return ownershipTokenCount[owner];
    }

    function totalSupply() public view returns (uint256 total) {
        return kitties.length;    
    }

    function name() external view returns (string memory) 
    {
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol) 
    {
        return _symbol;
    }

    function ownerOf(uint256 _tokenId) external view returns (address) {
        return kittyIndexToOwner[_tokenId];
    }

    function transfer(address _to, uint256 _tokenId) external {
        require(_to != address(0));
        require(_to != address(this));
        require(_owns(msg.sender, _tokenId));

        _transfer(msg.sender, _to, _tokenId);
    }

    function _transfer(address _to, address _from, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;

        kittyIndexToOwner[_tokenId] = _to;
        
        if(_from != address(0)){
            ownershipTokenCount[_from]--;
        }
        // Emit transfer event
        emit Transfer(_from, _to, _tokenId);
    }

    function _owns(address _sender, uint256 _tokenId) internal view returns (bool) {
        return kittyIndexToOwner[_tokenId] == _sender;
    }
}