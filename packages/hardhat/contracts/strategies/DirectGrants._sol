//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strategy } from "../base/Strategy.sol";
import { Allocator } from "../extensions/Allocator.sol";
import { Registry, IRegistry } from "../extensions/Registry.sol";

/**
 * A simple DirectGrants contract that allows ERC20 transfers to multiple approved projects
 * @author AlloCapital
 */

contract DirectGrants is Strategy, Allocator, Registry, Ownable {
    constructor(address owner) Ownable(owner) Strategy("DirectGrants") {}

    function register(address project, string memory metadataURI, bytes memory data) public override {
        super.register(project, metadataURI, data);
    }

    function approve(
        address project,
        uint256 index,
        string memory metadataURI,
        bytes memory data
    ) public override onlyOwner {
        super.approve(project, index, metadataURI, data);
    }

    function allocate(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public override onlyOwner {
        super.allocate(recipients, amounts, token, data);
    }

    function _allocate(address to, uint256 amount, address token, bytes memory data) internal override {
        require(projects[to][0].status == IRegistry.Status.approved, "Project not approved");
        super._allocate(to, amount, token, data);
    }
}
