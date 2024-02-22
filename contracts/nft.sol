// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract nft is ERC721URIStorage, Ownable {
    uint256 public counter;
    uint256 public totalSupply;
    uint256 listPrice = 0.001 ether;
    mapping(uint256 => address) public tokenOwner;

    constructor() ERC721("Spiderman", "Spider") Ownable(msg.sender) {}

    function getListPrice() public view returns (uint) {
        return listPrice;
    }

    function Price() public view returns (uint256) {
        if (totalSupply == 0) {
            return 100000000000000;
        }
        uint256 price = 1000000000000000000*(totalSupply)**2 / 8000;
        return price;
    }

    function mint(string calldata _uri) external payable {
        uint256 mintPrice = Price();
        require(msg.value == mintPrice, "please enter correct amount");
        counter++;
         totalSupply++;
        _mint(msg.sender, counter);
        _setTokenURI(counter, _uri);
        tokenOwner[counter] = msg.sender;
    }

    function burn(uint256 _tokenId) external payable {
        require(
            tokenOwner[_tokenId] == msg.sender,
            "You are not the owner of contract"
        );
        totalSupply--;
        _burn(_tokenId);
        payable(msg.sender).transfer(Price());
    }
}
