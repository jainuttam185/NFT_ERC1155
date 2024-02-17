// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721URIStorage, Ownable {

    uint public counter;

    constructor() ERC721("Spiderman","Spider") Ownable(msg.sender){}
    
    function mint(address _to,string calldata _uri) external onlyOwner{
            counter++;
            _mint(_to,counter);
            _setTokenURI(counter,_uri);
    }
}       

