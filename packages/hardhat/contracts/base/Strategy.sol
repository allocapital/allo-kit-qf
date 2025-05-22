// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";

interface IStrategy {
    // event Deployed(bytes32 id, string name, string schema);
    event Deployed(bytes32 id, string name, address creator, string schema, string metadataURI);

    function initialize(address owner, bytes calldata data) external;

    function strategyName() external returns (string memory);

    function schema() external returns (string memory);
}

contract Strategy is IStrategy, Initializable {
    bytes32 public id;
    string public strategyName;
    string public schema;
    string public metadataURI;

    constructor(string memory _name, string memory _schema, string memory _metadataURI) {
        strategyName = _name;
        schema = _schema;
        metadataURI = _metadataURI;
        id = keccak256(abi.encode(strategyName));
        emit Deployed(id, strategyName, msg.sender, schema, metadataURI);
    }

    function initialize(address owner, bytes calldata data) external virtual {}

    /**
     * Function that allows the contract to receive ETH
     */
    receive() external payable {}
}
