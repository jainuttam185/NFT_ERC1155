// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721 , Ownable{
   uint public mintPrice;
   uint public totalSupply;
   uint public maxSupply;
   uint public maxperWallet;
   bool public isPublicMintEnabled;
   string internal baseTokenUrl;
   address payable public withdrawFunds;
   mapping(address => uint) public walletMints;    


constructor() payable ERC721("Robopunks","RP") Ownable(msg.sender) {
    mintPrice=0.02 ether;
    totalSupply=0;
    maxSupply=1000;
    maxperWallet=3;
}

function IsPublicMintEnabled(bool _isPublicMintEnabled) external onlyOwner  {
   isPublicMintEnabled=_isPublicMintEnabled;
}

function setBaseTokenUrl(string calldata _basetokenUrl) external onlyOwner {
    baseTokenUrl = _basetokenUrl;
}

function tokenURI(uint _tokenId) public view override returns (string memory){
    require(_ownerOf(_tokenId) != address(0),"Token does not exist");
    return string(abi.encodePacked(baseTokenUrl,Strings.toString(_tokenId),".json"));
}

function withdraw() external onlyOwner{
    (bool success, )=withdrawFunds.call{value:address(this).balance}("");
    require(success,"wihdraw failed");
}
function mint(uint _quantity) public payable{
    require(isPublicMintEnabled,"minting not enabled");
    require(msg.value == _quantity * mintPrice,"wrong mint value");
    require(totalSupply+_quantity<=maxSupply,"sold out");
    require(walletMints[msg.sender]+_quantity<=maxperWallet,"exceed max wallet");

    for(uint i=0;i<_quantity;i++){
        uint newTokenId = totalSupply+1;
        totalSupply++;
        _safeMint(msg.sender,newTokenId);
    }
}


}