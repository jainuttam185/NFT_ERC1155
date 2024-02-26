// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;


import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract nft is ERC1155, ERC1155Burnable, ERC1155Supply {

    uint256 public counter;
    uint256 public totalSupplyy;
    uint256 listPrice = 0.001 ether;
    mapping(uint256 => address) public tokenOwner;
    mapping(address => uint[]) public countOfTokenId;

    uint256 maxSupply;
    constructor(string memory _uri, uint256 _maxSupply) ERC1155(_uri)
    {
        maxSupply = _maxSupply;
    }

    function getListPrice() public view returns (uint) {
        return listPrice;
    }

    function Price() public view returns (uint256) {
        if (totalSupplyy == 0) {
            return 100000000000000;
        }
        uint256 price = 1000000000000000000*(totalSupplyy)**2 / 8000;
        return price;
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function BuurnPrice() public view returns (uint){
        if(totalSupplyy==0){
            return 0;
        }
        uint burnsupply=totalSupplyy-1;
        if (burnsupply == 0) {
            return 100000000000000;
        }
        uint pricee = 1000000000000000000*(burnsupply)**2 / 8000;
        return pricee;
    }

    function NumberOfTokens() public view returns (uint){
        uint count = countOfTokenId[msg.sender].length;
        return count;
    }

    function mint() external payable {
        uint256 mintPrice = Price();
        require(msg.value == mintPrice, "please enter correct amount");
        counter++;
        totalSupplyy++;
        _mint(msg.sender, 0, 1, "");
        tokenOwner[counter] = msg.sender;
        countOfTokenId[msg.sender].push(counter);
    }

    function burn() external payable {
        require(countOfTokenId[msg.sender].length>0,"Sorry don't have enough tokens,Please mint");
        uint length = countOfTokenId[msg.sender].length;
        uint _tokenId = countOfTokenId[msg.sender][length-1];                           
        totalSupplyy--;
        burn(msg.sender, 0, 1);
        countOfTokenId[msg.sender].pop();
        payable(msg.sender).transfer(Price());
    }

    function _update(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values
    ) internal override(ERC1155, ERC1155Supply) {
        super._update(from, to, ids, values);
    }

}
