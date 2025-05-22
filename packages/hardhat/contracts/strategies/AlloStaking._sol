// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import { IERC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { SafeERC20 } from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import { Allocator } from "../extensions/Allocator.sol";
import { Registry } from "../extensions/Registry.sol";
import { Strategy } from "../base/Strategy.sol";
import { Math } from "@openzeppelin/contracts/utils/math/Math.sol";

/// @title Staking contract with reward distribution and recipient splits
/// @author AlloCapital
/// @notice Allows staking of tokens with reward distribution and recipient splits
/// @dev Based on Synthetix Staking rewards contract with modifications to allow staking into projects
contract AlloStaking is ERC20, Strategy, Allocator, Registry, Ownable {
    using Math for uint256;
    using SafeERC20 for IERC20;

    // Core token contracts
    IERC20 public immutable stakingToken;
    IERC20 public immutable rewardsToken;

    // Percentage of staked amount that goes to recipient (1-99)
    uint256 public recipientPercentage;

    // Reward distribution state
    uint256 public duration;
    uint256 public finishAt;
    uint256 public updatedAt;
    uint256 public rewardRate;
    uint256 public rewardPerTokenStored;

    // User reward tracking
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    event RecipientPercentageUpdated(uint256 oldPercentage, uint256 newPercentage);

    constructor(
        address owner,
        address _stakingToken,
        address _rewardsToken,
        uint256 _recipientPercentage
    ) Strategy("AlloStaking") Ownable(owner) ERC20("Staked Token", "STK") {
        stakingToken = IERC20(_stakingToken);
        rewardsToken = IERC20(_rewardsToken);
        recipientPercentage = _recipientPercentage;
    }

    /**
     * @notice Updates reward state before executing modified function
     * @param _account Address of the account to update rewards for
     */
    modifier updateReward(address _account) {
        rewardPerTokenStored = rewardPerToken();
        updatedAt = lastTimeRewardApplicable();

        if (_account != address(0)) {
            rewards[_account] = earned(_account);
            userRewardPerTokenPaid[_account] = rewardPerTokenStored;
        }
        _;
    }

    /**
     * @notice Sets the recipient percentage for staking rewards
     * @param _percentage New recipient percentage (1-99)
     */
    function setRecipientPercentage(uint256 _percentage) public onlyOwner {
        require(_percentage > 0 && _percentage < 100, "Percentage must be between 1-99");
        uint256 oldPercentage = recipientPercentage;
        recipientPercentage = _percentage;
        emit RecipientPercentageUpdated(oldPercentage, _percentage);
    }

    /**
     * @notice Override Allocator._allocate to handle staking logic and rewards
     * @param project Address of the project
     * @param amount Amount to allocate
     * @param token Address of the token to allocate
     * @param data Additional data for allocation
     */
    function _allocate(
        address project,
        uint256 amount,
        address token,
        bytes memory data
    )
        internal
        override
        // Update rewards for both accounts since their balances will change
        updateReward(_msgSender())
        updateReward(project)
    {
        require(amount > 0, "amount = 0");
        require(token == address(stakingToken), "Must be staking token");

        _handleTokens(project, amount, true);
        super._allocate(address(this), amount, token, data);
    }

    /**
     * @notice Override Allocator._distribute to handle unstaking logic and rewards
     * @param recipient Address of the recipient
     * @param amount Amount to withdraw
     * @param token Address of the token to withdraw
     * @param data Additional data for withdrawal
     */
    function _distribute(
        address recipient,
        uint256 amount,
        address token,
        bytes memory data
    )
        internal
        override
        // Update rewards for both accounts since their balances will change
        updateReward(_msgSender())
        updateReward(recipient)
    {
        require(amount > 0, "amount = 0");
        require(token == address(stakingToken), "Must be staking token");

        _handleTokens(recipient, amount, false);
        super._distribute(recipient, amount, token, data);
    }

    /**
     * @notice Handles token operations for both allocation and withdrawal
     * @param recipient Address of the recipient
     * @param amount Amount to handle
     * @param isAllocating Whether the operation is an allocation or withdrawal
     * @return stakerAmount Amount for staker
     * @return recipientAmount Amount for recipient
     */
    function _handleTokens(
        address recipient,
        uint256 amount,
        bool isAllocating
    ) private returns (uint256 stakerAmount, uint256 recipientAmount) {
        recipientAmount = (amount * recipientPercentage) / 100;
        stakerAmount = amount - recipientAmount;

        if (isAllocating) {
            _mint(_msgSender(), stakerAmount);
            _mint(recipient, recipientAmount);
        } else {
            _burn(_msgSender(), stakerAmount);
            _burn(recipient, recipientAmount);
        }
    }

    /**
     * @notice Calculates the earned rewards for a given account
     * @param _account Address of the account to calculate rewards for
     * @return Earned rewards for the account
     */
    function earned(address _account) public view returns (uint256) {
        return
            ((balanceOf(_account) * (rewardPerToken() - userRewardPerTokenPaid[_account])) / 1e18) + rewards[_account];
    }

    /**
     * @notice Claims rewards for a given account
     * @param _recipient Address of the recipient
     */
    function claimRewards(address _recipient) external updateReward(_msgSender()) updateReward(_recipient) {
        uint256 reward = rewards[_msgSender()];
        if (reward > 0) {
            rewards[_msgSender()] = 0;
            rewardsToken.safeTransfer(_msgSender(), reward);
        }
    }

    /**
     * @notice Sets the reward duration
     * @param _duration New reward duration
     */
    function setRewardsDuration(uint256 _duration) external onlyOwner {
        require(finishAt < block.timestamp, "reward duration not finished");
        duration = _duration;
    }

    /**
     * @notice Updates reward amount and rate, ensuring sufficient balance
     * @param _amount New reward amount
     */
    function notifyRewardAmount(uint256 _amount) external onlyOwner updateReward(address(0)) {
        if (block.timestamp >= finishAt) {
            rewardRate = _amount / duration;
        } else {
            uint256 remaining = finishAt - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (_amount + leftover) / duration;
        }

        require(rewardRate > 0, "reward rate = 0");
        require(rewardRate * duration <= rewardsToken.balanceOf(address(this)), "reward amount > balance");

        finishAt = block.timestamp + duration;
        updatedAt = block.timestamp;
    }

    /**
     * @notice Returns the last time rewards were applicable
     * @return Last time rewards were applicable
     */
    function lastTimeRewardApplicable() public view returns (uint256) {
        return finishAt.min(block.timestamp);
    }

    /**
     * @notice Returns the reward per token
     * @return Reward per token
     */
    function rewardPerToken() public view returns (uint256) {
        if (totalSupply() == 0) {
            return rewardPerTokenStored;
        }
        return rewardPerTokenStored + (rewardRate * (lastTimeRewardApplicable() - updatedAt) * 1e18) / totalSupply();
    }
}
