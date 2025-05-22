//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/proxy/Clones.sol";
import { IStrategy } from "./base/Strategy.sol";


import "hardhat/console.sol";
contract PoolFactory {
    event Deployed(address indexed strategy, address indexed pool, address indexed owner, string name, string metadataURI, bytes data, string schema);

    /**
     * @dev Deploys a minimal proxy that points to `implementation`,
     *      then initializes it by calling `data`.
     *
     * @param implementation The address of the logic contract to clone.
     * @param metadataURI The metadataURI for initializing the pool.
     * @param data The calldata for initializing the pool.
     */
    function deploy(address implementation, string calldata metadataURI, bytes calldata data) external returns (address) {
        address strategyAddress = Clones.clone(implementation);

        emit Deployed(
            implementation,
            strategyAddress,
            msg.sender,
            IStrategy(implementation).strategyName(),
            metadataURI,
            data,
            IStrategy(implementation).schema()
        );
        IStrategy(strategyAddress).initialize(msg.sender, data);

        return strategyAddress;
    }
}
