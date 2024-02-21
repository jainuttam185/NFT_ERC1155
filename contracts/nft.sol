// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721URIStorage, Ownable {

    uint public counter;
    uint listPrice=0.0001 ether;
    mapping(uint256 counter => address) public tokenOwner;


    constructor() ERC721("Spiderman","Spider") Ownable(msg.sender){}
    
    function getListPrice() public view returns (uint){
        return listPrice;
    }

    function mint(string calldata _uri) external payable {
            require(msg.value == 0.0001 ether,"please enter correct amount");
            counter++;
            _mint(msg.sender,counter);
            _setTokenURI(counter,_uri);
            tokenOwner[counter]=msg.sender;
    }
    
    function burn(uint _tokenId) external payable {
          require(tokenOwner[_tokenId]==msg.sender,"You are not the owner of contract");
          _burn(_tokenId);
          payable(msg.sender).transfer(listPrice);
    }

}