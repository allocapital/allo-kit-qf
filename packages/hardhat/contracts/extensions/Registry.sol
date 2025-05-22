// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IRegistry {
    enum Status {
        pending,
        approved
    }

    struct Registration {
        Status status;
        address owner;
        bytes data; // Data can contain information that can be accessed later
        string metadataURI;
    }

    event Register(address indexed project, uint256 indexed index, address indexed owner, string metadataURI, bytes data);
    event Approve(address indexed project, uint256 indexed index, address indexed approver, string metadataURI, bytes data);
    event Update(address indexed project, uint256 indexed index, address indexed updater, string metadataURI, bytes data);
}

contract Registry is IRegistry {
    mapping(address => mapping(uint256 => Registration)) public projects;
    mapping(address => uint256) private indexes;

    // MetadataURI can contain details about project / application / campaign
    function _register(address project, string memory metadataURI, bytes memory data) external virtual {
        uint256 index = indexes[project]++;
        require(projects[project][index].status == Status.pending, "Already registered");

        // When index is 0 we interpret it as the project registration.
        // This way we have a simple and flexible way to handle
        // project registration, applications, creation of campaigns etc.
        projects[project][index] = Registration(Status.pending, msg.sender, data, metadataURI);
        emit Register(project, index, msg.sender, metadataURI, data);
    }

    // MetadataURI can contain Review information
    function _approve(address project, uint256 index, string memory metadataURI, bytes memory data) public virtual {
        Registration memory registration = projects[project][index];
        require(registration.status == Status.pending, "Already approved or not registered yet");
        registration.status = Status.approved;
        emit Approve(project, index, msg.sender, metadataURI, data);
    }

    function _update(address project, uint256 index, string memory metadataURI, bytes memory data) public virtual {
        require(projects[project][index].owner == msg.sender, "Must be owner to update");
        emit Update(project, index, msg.sender, metadataURI, data);
    }
}
