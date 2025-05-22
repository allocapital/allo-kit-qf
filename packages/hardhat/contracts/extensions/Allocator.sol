// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { ReentrancyGuard } from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import { Context } from "@openzeppelin/contracts/utils/Context.sol";


interface IAllocator {
    event Allocate(address indexed from, address indexed to, uint256 amount, address token, bytes data);

    function _allocate(
        address[] calldata recipients,
        uint256[] calldata amounts,
        address token,
        bytes[] calldata data
    ) external;

    function _distribute(
        address[] calldata recipients,
        uint256[] calldata amounts,
        address token,
        bytes[] calldata data
    ) external;


}

contract Allocator is IAllocator, Context {

    function _allocate(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public virtual {
        uint256 length = recipients.length;
        require(length > 0 && length == amounts.length, "Mismatched lengths");

        for (uint256 i = 0; i < length; i++) {
            bytes memory _data = i < data.length ? data[i] : bytes("");
            _beforeAllocate(recipients[i], amounts[i], token, _data);
            IERC20(token).transferFrom(_msgSender(), recipients[i], amounts[i]);
            emit Allocate(_msgSender(), recipients[i], amounts[i], token, _data);
        }
    }

    function _distribute(
        address[] memory recipients,
        uint256[] memory amounts,
        address token,
        bytes[] memory data
    ) public virtual {
        uint256 length = recipients.length;
        require(length > 0 && length == amounts.length, "Mismatched lengths");

        for (uint256 i = 0; i < length; i++) {
            bytes memory _data = i < data.length ? data[i] : bytes("");
            _beforeDistribute(recipients[i], amounts[i], token, _data);
            IERC20(token).transfer(recipients[i], amounts[i]);
            emit Allocate(address(this), recipients[i], amounts[i], token, _data);
        }
    }

    // Allocate transfers tokens from sender to recipients
    function _beforeAllocate(
        address to,
        uint256 amount,
        address token,
        bytes memory data
    ) internal virtual  {}

    // Distribute transfers tokens from the contract to recipients
    function _beforeDistribute(
        address to,
        uint256 amount,
        address token,
        bytes memory data
    ) internal virtual  {}
}
