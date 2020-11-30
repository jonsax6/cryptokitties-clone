pragma solidity ^0.5.12;

import "./IERC721.sol";
import "./IERC721Receiver.sol";
import "./Ownable.sol";

contract Kittycontract is IERC721, Ownable {

    uint256 public constant CREATION_LIMIT_GEN0 = 100;
    string public constant _name = "JC_Kitties";
    string public constant _symbol = "JCK";
    
    bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
 
    event Birth(
        address owner, 
        uint256 kittenId,
        uint256 momId,
        uint256 dadId,
        uint256 genes
    );

    // @dev Emitted when `tokenId` token is transfered from `from` to `to`.
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    // @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    
    // @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

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
    
    mapping(uint256 => address) public kittyIndexToApproved;
    mapping (address => mapping (address => bool)) public _operatorApprovals;
    
    uint256 public gen0Counter;

    constructor() public {
        _createKitty(0,0,0, uint256(-1), address(0));
    }

    function breed(uint256 _dadId, uint256 _momId) public returns(uint256) {
        // check ownership
        require(_owns(msg.sender, _dadId) && _owns(msg.sender, _momId));

        // check that the kitty IDs are not the same (different cats);
        require(_dadId != _momId, "Kitty IDs must not be the same");

        // get the DNA and Generation from both parents
        (uint256 dadDna,,,,uint256 dadGen) = getKitty(_dadId);
        (uint256 momDna,,,,uint256 momGen) = getKitty(_momId);

        // control flow, makes kid generation the oldest parent +1, 
        // or if they are the same then dadGen +1 
        uint256 kidGen = 0;
        if(dadGen > momGen){
            kidGen = dadGen + 1;
        } else if(dadGen < momGen){
            kidGen = momGen + 1;
        } else {
            kidGen = dadGen + 1;
        }

        // using the _mixDna function to create the newDna
        uint256 newDna = _mixDna(dadDna, momDna);

        // now use the new kitty params to make a new cat on the blockchain and send to msg.sender
        _createKitty(_momId, _dadId, kidGen, newDna, msg.sender);
    }

    bytes4 private constant _INTERFACE_ID_ERC721 = 0x80ac58cd;
    bytes4 private constant _INTERFACE_ID_ERC165 = 0x01ffc9a7;

    function supportsInterface(bytes4 _interfaceId) external view returns (bool) {
        return (_interfaceId == _INTERFACE_ID_ERC721 || _interfaceId == _INTERFACE_ID_ERC165);
    }

    function createKittyGen0(uint256 _genes) public onlyOwner {
        // cannot have more gen 0 cats than the creation limit
        require(gen0Counter < CREATION_LIMIT_GEN0);
        
        // make sure genes are 16 digits minimum
        require(_genes >= 1000000000000000, "genes must be a minimum of 16 digits");

        gen0Counter++;

        // Gen0 cats are owned by the contract owner
        _createKitty(0, 0, 0, _genes, msg.sender);
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

    function getKitty(uint256 _id) public view returns (
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

    function getKittiesByUser(address user) public view returns (uint[] memory) { 
        uint[] memory userTokenIds = new uint[](ownershipTokenCount[user]);
        uint counter = 0;
        for(uint i = 0; i < kitties.length; i++){
            if(kittyIndexToOwner[i] == user){
                userTokenIds[counter] = i;
                counter++;
            }
        }
        return userTokenIds;
    } 

    function approve(address approved, uint256 tokenId) external {
        require(_owns(msg.sender, tokenId));
        kittyIndexToApproved[tokenId] = approved;  
        emit Approval(msg.sender, approved, tokenId);  
    }

    function setApprovalForAll(address operator, bool approved) external {
        require(operator != msg.sender);
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved); 
    }

    function getApproved(uint256 tokenId) external view returns (address) {
        require(tokenId < kitties.length); // verifies the tokenId is somewhere in the array
        return kittyIndexToApproved[tokenId]; 
    }

    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    function balanceOf(address owner) external view returns (uint256 balance) {
        return ownershipTokenCount[owner];
    }

    function totalSupply() public view returns (uint256 total) {
        return kitties.length;    
    }

    function name() external view returns (string memory) {
        return _name;
    }

    function symbol() external view returns (string memory tokenSymbol) {
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

    function _transfer(address _from, address _to, uint256 _tokenId) internal {
        ownershipTokenCount[_to]++;

        kittyIndexToOwner[_tokenId] = _to;
        
        if(_from != address(0)){
            ownershipTokenCount[_from]--;
            delete kittyIndexToApproved[_tokenId];
        }
        // Emit transfer event
        emit Transfer(_from, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) public {
        require(_to != address(0));
        require(msg.sender == _from || _approvedFor(msg.sender, _tokenId) || isApprovedForAll(_from, msg.sender));
        require(_owns(_from, _tokenId));
        require(_tokenId < kitties.length);
        
        _transfer(_from, _to, _tokenId);
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public {
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) public {
        require(_isApprovedOrOwner(msg.sender,_from, _to, _tokenId));
        _safeTransfer(_from, _to, _tokenId, data);
    }

    function _safeTransfer(address _from, address _to, uint256 _tokenId, bytes memory _data) internal {
        _transfer(_from, _to, _tokenId);
        require(_checkERC721Support(_from, _to, _tokenId, _data));
    }

    function _owns(address _sender, uint256 _tokenId) internal view returns (bool) {
        return kittyIndexToOwner[_tokenId] == _sender;
    }

    function _approve(uint256 _tokenId, address _approved) internal {
        kittyIndexToApproved[_tokenId] = _approved;
    }

    function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return kittyIndexToApproved[_tokenId] == _claimant;
    }

    function _checkERC721Support(address _from, address _to, uint256 _tokenId, bytes memory _data) internal returns (bool) {
        if(!_isContract(_to)){
            return true;
        }
        bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data);
        return returnData == MAGIC_ERC721_RECEIVED;

        // call onERC721Received in the _to contract
        // check return value
    }

    function _isContract(address _to) view internal returns (bool) {
        uint32 size;
        assembly{
            size := extcodesize(_to)
        }
        return size > 0;
    }

    function _isApprovedOrOwner(address _spender, address _from, address _to, uint256 _tokenId) internal view returns (bool) {
        require(_tokenId < kitties.length);  // token must exist
        require(_to != address(0)); // to address not zero address
        require(_owns(_from, _tokenId)); // from owns the token

        // spender is from OR spender is approved for tokenId OR spender is operator for from
        return(_spender == _from || _approvedFor(_spender, _tokenId) || isApprovedForAll(_from, _spender));
    }

    function _mixDna(uint256 _dadDna, uint256 _momDna) internal returns (uint256) {
        uint256[8] memory geneArray;

        uint8 random = uint8(now % 255); // pseudo-random 8 bit integer 00000000 - 11111111
        uint8 rand100 = uint8(now % 100);
        uint8 rand10 = uint8(now % 10);
        uint256 i; // i declaration for the binary 'slot' below
        uint256 index = 7;

        for(i = 1; i <= 128; i = i*2){ // each time through the loop the "1" moves over to the next binary slot 
            if(index == 2){ // at index 2 we need a totally random number here (eye color)
                geneArray[2] = uint8((now % 88) + 10); // random number between 10 and 98 for eye color
            }
            else if(index == 4){ // this is 'eye shape' and 'markings shape'
                if((rand10 < 8 && rand10 > 0) && (rand100 >= 10 && rand100 < 80)){ // only numbers less than 80 (for the 'tens' digit) 
                                                                                // AND less than 8 (for the 'ones' digit) are eligible.  
                                                                                // (87 or 78 return false for example).
                    geneArray[4] = rand100; // if above is true, then these two settings are random
                } 
                else if(rand10 > 4){ // if rand10 is 5 - 9 use momDna
                    geneArray[4] = uint8(_momDna % 100); 
                } 
                else { // if rand10 is 0 - 4 use _dadDna 
                    geneArray[4] = uint8(_dadDna % 100); 
                } 
            }
            else if(random & i != 0 && index != 2 && index != 4){ // the bitwise operator "&" compares the random 8bit to "1" at every 
                                                                  //  slot and returns 1 (true) or 0 (false) for all 'index' vals except 2 or 4
                geneArray[index] = uint8(_momDna % 100); // the % 100 => the last two digits of the dna number as the remainder
            }
            else if(index != 2 && index != 4){
                geneArray[index] = uint8(_dadDna % 100); // same but uses the dadDna if (random & i != 0) returns "false" above
            }
            _momDna = _momDna / 100; // dividing by 100 turns the last two digits of DNA numbers into decimals,
            _dadDna = _dadDna / 100; // since we are working with integers, they disappear
            index = index - 1; // now move to index 6 (from 7) and so on...
        }
        uint256 newGene; // newGene declaration

        for(i = 0; i < 8; i++){ // loop through index 0 - 7 of the geneArray[]
            newGene = newGene + geneArray[i]; // build the newGene number two digits at a time
            if(i != 7){ // after index 6, we don't want to increase newGene by 100, we do addition, but not * 100.
                newGene = newGene * 100;    // newGene (##) becomes (##00), so next loop the two new index digits 
                                            // get added at 1 and 10 slots (## + the new digit take the place of "00").
            } 

        }
        return newGene;
    }
}