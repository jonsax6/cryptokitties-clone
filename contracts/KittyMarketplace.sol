pragma solidity ^0.5.12;

import "./Kittycontract.sol";
import "./Ownable.sol";
import "./IKittyMarketplace.sol";

contract KittyMarketPlace is Ownable, IKittyMarketPlace {
    Kittycontract private _kittycontract;

    struct Offer {
        address payable seller;
        uint256 price;
        uint256 index;
        uint256 tokenId;
        bool active;
    }

Offer[] offers;

address public instance;


mapping(uint256 => Offer) tokenIdToOffer;

    /**
    * Set the current KittyContract address and initialize the instance of Kittycontract.
    * Requirement: Only the contract owner can call.
     */
    function setKittyContract(address _kittyContractAddress) public onlyOwner {
        _kittycontract = Kittycontract(_kittyContractAddress);
    }

    constructor(address _kittyContractAddress) public {
         setKittyContract(_kittyContractAddress);
    }

    function getOffer(uint256 _tokenId) public view returns ( 
        address seller, 
        uint256 price, 
        uint256 index, 
        uint256 tokenId, 
        bool active
    )   {
        Offer storage _offer = tokenIdToOffer[_tokenId];
        return (
            _offer.seller,
            _offer.price,
            _offer.index,
            _offer.tokenId,
            _offer.active
        );
    }
 
    function getAllTokenOnSale() public view returns(uint256[] memory listOfOffers){
        uint256 numOffers = offers.length;
        require(numOffers > 0, "empty"); // requires that there are offers, empty error thrown if not

        uint256[] memory offerList = new uint256[](numOffers); // sets the returned array to fixed length, which is length of 'offers'.
        for(uint256 i = 0; i < offers.length; i++){ // loops through each index
            if(offers[i].active == true){
                offerList[i] = offers[i].tokenId; // assigns the token id at each index to the listOfOffers array at that same index.
            }
        } 
        return offerList;
    }

    function setOffer(uint256 _price, uint256 _tokenId) external{
        // only owner can create offer
        require(_kittycontract.ownerOf(_tokenId) == msg.sender, "only owner can sell tokenId"); 
        // There can only be one active offer for a token at a time
        require(tokenIdToOffer[_tokenId].active == false, "offer already exists"); 
        // Marketplace contract (this) needs to be an approved operator when the offer is created
        require(_kittycontract.isApprovedForAll(msg.sender, address(this)), "contract is not approved"); 
        Offer memory _offer = Offer({
            seller: msg.sender,
            price: _price,
            index: offers.length,
            tokenId: _tokenId,
            active: true
        });

        // update state variables
        tokenIdToOffer[_tokenId] = _offer;
        offers.push(_offer);

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) external{
        Offer memory _offer = tokenIdToOffer[_tokenId];
        // Only the seller of _tokenId can remove an offer.
        require(_offer.seller == msg.sender, "only seller can remove offer");

        // change the offer active status from offers array with index tokenIdToOffer[_tokenId].index
        offers[_offer.index].active = false;
        // now delete it from the mapping
        delete tokenIdToOffer[_tokenId];

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) public payable{
        // local variable 'offer' points to the specific Offer
        Offer memory _offer = tokenIdToOffer[_tokenId]; 
        // The msg.value needs to equal the price of _tokenId
        require(msg.value == _offer.price, "payment amount must be the same as the price");
        // There must be an active _offer for _tokenId
        require(_offer.active == true, "no _offer is active"); 
        
        _offer.seller.transfer(_offer.price); 

        _kittycontract.transferFrom(_offer.seller, msg.sender, _tokenId);
        emit MarketTransaction("buy", owner, _tokenId);
    }

}