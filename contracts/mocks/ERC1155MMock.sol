// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.13;

import "../ERC-1155M/ERC1155M.sol";

contract ERC1155MMock is ERC1155M {
    constructor(string memory uri) {
        _setURI(uri);
    }

    function enableMetatoken(IMetatoken1155 metatoken) external {
        _enableMetatoken(
            metatoken
        );
    }

    /**
     * @dev Disable a previously registered metatoken.
     */
    function disableMetatoken(IMetatoken1155 metatoken) external {
        _disableMetatoken(
            metatoken
        );
    }

    /**
     * @dev Register a metatoken extension.
     */
    function registerMetatoken(IMetatoken1155 metatoken, bool enabled) external {
        _registerMetatoken(
            metatoken,
            enabled
        );
    }

    /**
     * @dev Updates the implementation address for a metatoken.
     */
    function updateMetatokenImplementation(IMetatoken1155 metatoken, IMetatoken1155 implementation) external {
        _updateMetatokenImplementation(
            metatoken,
            implementation
        );
    }

    /**
     * @dev Updates the registered hooks for a given metatoken.
     */
    function updateMetatokenHooks(IMetatoken1155 metatoken, uint16 enabledHooks) external {
        _updateMetatokenHooks(
            metatoken,
            enabledHooks
        );
    }

    function allowMetatokenSelectors(uint256[] calldata selectors) external {
        _allowMetatokenSelectors(
            selectors
        );
    }

    function denyMetatokenSelectors(uint256[] calldata selectors) external {
        _denyMetatokenSelectors(
            selectors
        );
    }

    function setURI(string memory newuri) public {
        _setURI(newuri);
    }

    function mint(
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public {
        _mintTokens(to, _asSingletonArray(id), _asSingletonArray(value), data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public {
        _mintTokens(to, ids, values, data);
    }

    function burn(
        address owner,
        uint256 id,
        uint256 value
    ) public {
        _burnTokens(owner, _asSingletonArray(id), _asSingletonArray(value));
    }

    function burnBatch(
        address owner,
        uint256[] memory ids,
        uint256[] memory values
    ) public {
        _burnTokens(owner, ids, values);
    }

    function _asSingletonArray(uint256 element) private pure returns (uint256[] memory) {
        uint256[] memory array = new uint256[](1);
        array[0] = element;

        return array;
    }
}
