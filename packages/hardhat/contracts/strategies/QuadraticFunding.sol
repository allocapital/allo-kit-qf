//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Allocator } from "../extensions/Allocator.sol";
import { Registry, IRegistry } from "../extensions/Registry.sol";
import { Strategy } from "../base/Strategy.sol";

/**
 * A simple QuadraticFunding contract that allows matching funds to be added to the Strategy and distributed to projects by the owner
 * @author AlloCapital
 */
contract QuadraticFunding is Strategy, Allocator, Registry, Ownable {
    address public donationToken;
    address public matchingToken;

    constructor(
        address owner,
        string memory metadataURI
    ) Ownable(owner) Strategy("QuadraticFunding", "address donationToken, address matchingToken", metadataURI) {}

    function initialize(address owner, bytes calldata data) public override {
        _transferOwnership(owner);

        (address _donationToken, address _matchingToken) = abi.decode(data, (address, address));
        donationToken = _donationToken;
        matchingToken = _matchingToken;
    }

    function approve(address project, uint256 index, string memory metadataURI, bytes memory data) public onlyOwner {
        _approve(project, index, metadataURI, data);
    }

    function allocate(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public virtual {
        _allocate(recipients, amounts, token, data);
    }

    function distribute(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public virtual {
        _distribute(recipients, amounts, token, data);
    }

    // Override allocate function to check if tokens are either donation or matching based on the recipient
    function _beforeAllocate(address to, uint256 amount, address token, bytes memory data) internal view override {
        if (to == address(this)) require(token == matchingToken, "Matching funds to strategy must be matching token");
        if (to != address(this)) require(token == donationToken, "Allocations to projects must be donation token");
    }

    // Distribution of matching funds must be by owner
    function _beforeDistribute(address to, uint256 amount, address token, bytes memory data) internal view override {
        require(token == matchingToken, "Must be matching token");
    }
}
