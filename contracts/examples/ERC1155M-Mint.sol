// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "../ERC-1155M/ERC1155M.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract ERC1155MMint is ERC1155M, AccessControl {
    uint256 public mintPrice = 0.01 ether;
    uint256 public constant TOKENID_MEMBERSHIP = 0;

    constructor(string memory uri) {
        _setURI(uri);
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155SupplyNE, AccessControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(
        address to,
        uint256 id,
        bytes memory data
    ) public payable {
        require(mintPrice <= msg.value, "Not enough funds sent");
        _mintTokens(to, _asSingletonArray(id), _asSingletonArray(msg.value), data);
    }

    function _asSingletonArray(
        uint256 element
    ) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }

    function withdraw() external onlyRole(DEFAULT_ADMIN_ROLE) {
        uint256 _balance = address(this).balance;
        (bool success, ) = payable(msg.sender).call{value: _balance}('');
        require(success, "Unable to withdraw");
    }
}
