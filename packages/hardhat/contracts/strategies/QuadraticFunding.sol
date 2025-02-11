//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Allocator } from "../extensions/Allocator.sol";
import { Registry, IRegistry } from "../extensions/Registry.sol";
import { Strategy } from "../base/Strategy.sol";

/**
 * A simple QuadraticFunding contract that allows matching funds to be added to the Strategy and distributed
 * @author AlloCapital
 */
contract QuadraticFunding is Strategy, Allocator, Ownable {
    address public immutable donationToken;
    address public immutable matchingToken;

    constructor(
        address owner,
        address _donationToken,
        address _matchingToken
    ) Ownable(owner) Strategy("QuadraticFunding") {
        donationToken = _donationToken;
        matchingToken = _matchingToken;
    }

    // Override allocate function to check if tokens are either donation or matching based on the recipient
    function _allocate(address to, uint256 amount, address token, bytes memory data) internal override nonReentrant {
        if (to == address(this)) require(token == matchingToken, "Matching funds must be matching token");
        if (to != address(this)) require(token == donationToken, "Allocations to projects must be donation token");

        super._allocate(to, amount, token, data);
    }

    // Distribution of matching funds must be by owner
    function distribute(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public override onlyOwner {
        require(token == matchingToken, "Must be matching token");
        super.distribute(recipients, amounts, token, data);
    }
}
