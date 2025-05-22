//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

import { Allocator } from "../extensions/Allocator.sol";
import { Registry, IRegistry } from "../extensions/Registry.sol";
import { Strategy } from "../base/Strategy.sol";

/**
 * A simple Strategy contract that allows ERC20 transfers to multiple recipients
 * @author AlloCapital
 */

struct PoolConfig {
    address owner;
    address voteToken;
    address matchToken;
    uint256 poolCap;
    string metadataURI;
}

contract SimpleGrants is Strategy, Allocator, Registry, Ownable {
    // Init the Strategy with a name, a schema, and a metadata URI
    constructor(
        address owner,
        string memory metadataURI
    ) Strategy("SimpleGrants", "address voteToken, address matchToken, uint256 poolCap", metadataURI) Ownable(owner) {}
    // constructor(address owner) Strategy("SimpleGrants", "string param, uint256 amount") Ownable(owner) {}

    function initialize(address owner, bytes calldata data) public override {
        // (string memory param, uint256 amount) = abi.decode(data, (string, uint256));
    }
}
