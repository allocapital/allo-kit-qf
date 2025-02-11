//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Allocator } from "../extensions/Allocator.sol";
import { Registry, IRegistry } from "../extensions/Registry.sol";
import { Strategy } from "../base/Strategy.sol";
import { EASGate } from "../gates/EASGate.sol";

/**
 * A simple RetroFunding contract that allows badgheholders to vote for projects
 * @author AlloCapital
 */

contract RetroFunding is Strategy, Allocator, EASGate, Ownable {
    bytes32 private immutable badgeholderSchemaUID;
    address private immutable badgeholderAttester;
    address public immutable matchingToken;

    constructor(
        address owner,
        address easIndexer,
        bytes32 _schemaUID,
        address _attester,
        address _matchingToken
    ) Ownable(owner) EASGate(easIndexer) Strategy("RetroFunding") {
        matchingToken = _matchingToken;
        badgeholderSchemaUID = _schemaUID;
        badgeholderAttester = _attester;
    }

    // Vote - onlyBadgeholder
    // Override allocate function to check if tokens are either donation or matching based on the recipient
    function _allocate(
        address to,
        uint256 amount,
        address token,
        bytes memory data
    ) internal override nonReentrant onlyEAS(badgeholderSchemaUID, badgeholderAttester, msg.sender) {
        super._allocate(to, amount, token, data);
    }

    // Distribution of matching funds must be by owner
    function distribute(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public override onlyOwner {
        super.distribute(recipients, amounts, token, data);
    }
}
