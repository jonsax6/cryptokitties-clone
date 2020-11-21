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

    uint256 public activeOffers;

    function totalOffers() public view returns(uint256 numOffers) {
        numOffers = activeOffers;
        return numOffers;
    }

    address public instance;

    mapping(uint256 => Offer) tokenIdToOffer;

    // Set the current KittyContract address and initialize the instance of Kittycontract
    function setKittyContract(address _kittyContractAddress) public onlyOwner {
        _kittycontract = Kittycontract(_kittyContractAddress);
    }

    constructor(address _kittyContractAddress) public {
         setKittyContract(_kittyContractAddress);
    }

    // Get the details about an offer for _tokenId. Throws an error if there is no active offer for _tokenId.
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

    // Get all tokenId's that are currently for sale. Returns an empty array if none exist.
    function getAllTokenOnSale() public view returns(uint256[] memory listOfOffers){
        // check if there are any offers, if not return empty array
        if(activeOffers == 0){ 
            return new uint256[](0);
        }
        else{
            // sets the returned array to fixed length, which is length of 'activeOffers'.
            uint256[] memory offerList = new uint256[](activeOffers); 
            // loops through each index
            uint256 index = 0;
            for(uint256 i = 0; i < offers.length; i++){ 
                if(offers[i].active == true){
                    // assigns the token id at each index to the listOfOffers array at that same index.
                    offerList[index] = offers[i].tokenId; 
                    index++;
                }
            } 
            return offerList;
        }

    }
  
    // Creates a new offer for _tokenId for the price _price.
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
        
        // adds 1 to the activeOffers tracker.
        activeOffers++;

        emit MarketTransaction("Create offer", msg.sender, _tokenId);
    }

    function removeOffer(uint256 _tokenId) external{
        // finds the offer for _tokenId
        Offer memory _offer = tokenIdToOffer[_tokenId];
        
        // Only the seller of _tokenId can remove an offer.
        require(_offer.seller == msg.sender, "only seller can remove offer");

        // change the offer active status from offers array with index tokenIdToOffer[_tokenId].index
        offers[_offer.index].active = false;
        
        // now delete it from the mapping
        delete tokenIdToOffer[_tokenId];

        // subtract 1 from activeOffers tracker.
        activeOffers--;

        emit MarketTransaction("Remove offer", msg.sender, _tokenId);
    }

    function buyKitty(uint256 _tokenId) public payable{
        // local variable 'offer' points to the specific Offer
        Offer memory _offer = tokenIdToOffer[_tokenId]; 
        // The msg.value needs to equal the price of _tokenId
        require(msg.value == _offer.price, "payment amount must be the same as the price");
        // There must be an active _offer for _tokenId
        require(_offer.active == true, "no offer is active"); 
        
        delete tokenIdToOffer[_tokenId];
        offers[_offer.index].active = false;

        _offer.seller.transfer(_offer.price); 

        _kittycontract.transferFrom(_offer.seller, msg.sender, _tokenId);
        emit MarketTransaction("buy", owner, _tokenId);
    }
}