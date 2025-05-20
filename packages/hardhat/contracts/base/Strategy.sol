// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

interface IStrategy {
    // event Deployed(bytes32 id, string name, string schema);
    event Deployed(bytes32 id, string name, address creator,  string schema);

    function initialize(address owner, bytes calldata data) external;

    function strategyName() external returns (string memory);

    function schema() external returns (string memory);
}

 contract Strategy is IStrategy, Initializable {
    bytes32 public id;
    string public strategyName;
    string public schema;

    constructor(string memory _name, string memory _schema) {
        strategyName = _name;
        schema = _schema;
        id = keccak256(abi.encode(strategyName));
        emit Deployed(id, strategyName, msg.sender, schema);
    }

    function initialize(address owner, bytes calldata data) public virtual initializer {
        // emit Initialize(id, strategyName, owner, data, schema);
    }

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}


