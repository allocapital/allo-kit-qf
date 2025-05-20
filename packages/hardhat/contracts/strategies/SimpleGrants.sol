//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

import {Allocator} from "../extensions/Allocator.sol";
import {Registry, IRegistry} from "../extensions/Registry.sol";
import {Strategy} from "../base/Strategy.sol";

/**
 * A simple Strategy contract that allows ERC20 transfers to multiple recipients
 * @author AlloCapital
 */

struct PoolConfig {
    address owner;
    address token;
    uint256 maxAmount;
    string metadataURI;
}

contract SimpleGrants is Strategy, Allocator, Registry, Ownable {
    // Init the Strategy with a Name and a Schema
    constructor(address owner) Strategy("SimpleGrants", "address token, uint256 maxAmount") Ownable(owner) {}
    // constructor(address owner) Strategy("SimpleGrants", "string param, uint256 amount") Ownable(owner) {}

    function initialize(address owner, bytes calldata data) public override {
        super.initialize(owner, data);
        
        // (string memory param, uint256 amount) = abi.decode(data, (string, uint256));
    }
}
// contract SimpleGrants is Strategy, Allocator, Registry, Ownable {
//     constructor(address owner) Strategy("SimpleGrants") Ownable(owner) {}

//     function register(address project, string memory metadataURI, bytes memory data) public override {
//         _register(project, metadataURI, data);
//         _approve(project, 0, "", ""); // Auto-approve projects
//     }
// }

