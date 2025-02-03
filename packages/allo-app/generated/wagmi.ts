import {
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
  createUseReadContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Allocator
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const allocatorAbi = [
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Allocate',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'allocate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ERC20Mock
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const erc20MockAbi = [
  { type: 'constructor', inputs: [], stateMutability: 'nonpayable' },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Registry
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const registryAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'project',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Approve',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'project',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Register',
  },
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'projects',
    outputs: [
      { name: 'status', internalType: 'enum IRegistry.Status', type: 'uint8' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strategy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const strategyAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_name', internalType: 'string', type: 'string' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'strategyName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Initialize',
  },
  {
    type: 'function',
    inputs: [],
    name: 'strategyName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// YourStrategy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const yourStrategyAbi = [
  {
    type: 'constructor',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [{ name: 'target', internalType: 'address', type: 'address' }],
    name: 'AddressEmptyCode',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'AddressInsufficientBalance',
  },
  { type: 'error', inputs: [], name: 'FailedInnerCall' },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
  {
    type: 'error',
    inputs: [{ name: 'token', internalType: 'address', type: 'address' }],
    name: 'SafeERC20FailedOperation',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'token',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Allocate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'project',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Approve',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'strategyName',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Initialize',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'project',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'index',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
    ],
    name: 'Register',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'allocate',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipients', internalType: 'address[]', type: 'address[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'token', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes[]', type: 'bytes[]' },
    ],
    name: 'distribute',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'projects',
    outputs: [
      { name: 'status', internalType: 'enum IRegistry.Status', type: 'uint8' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'register',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'strategyName',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link allocatorAbi}__
 */
export const useWriteAllocator = /*#__PURE__*/ createUseWriteContract({
  abi: allocatorAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"allocate"`
 */
export const useWriteAllocatorAllocate = /*#__PURE__*/ createUseWriteContract({
  abi: allocatorAbi,
  functionName: 'allocate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"distribute"`
 */
export const useWriteAllocatorDistribute = /*#__PURE__*/ createUseWriteContract(
  { abi: allocatorAbi, functionName: 'distribute' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__
 */
export const useSimulateAllocator = /*#__PURE__*/ createUseSimulateContract({
  abi: allocatorAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"allocate"`
 */
export const useSimulateAllocatorAllocate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: allocatorAbi,
    functionName: 'allocate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"distribute"`
 */
export const useSimulateAllocatorDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: allocatorAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link allocatorAbi}__
 */
export const useWatchAllocatorEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: allocatorAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link allocatorAbi}__ and `eventName` set to `"Allocate"`
 */
export const useWatchAllocatorAllocateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: allocatorAbi,
    eventName: 'Allocate',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useReadErc20Mock = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadErc20MockAllowance = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'allowance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadErc20MockBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadErc20MockDecimals = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'decimals',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"name"`
 */
export const useReadErc20MockName = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadErc20MockSymbol = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadErc20MockTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: erc20MockAbi,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useWriteErc20Mock = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteErc20MockApprove = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteErc20MockMint = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteErc20MockTransfer = /*#__PURE__*/ createUseWriteContract({
  abi: erc20MockAbi,
  functionName: 'transfer',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteErc20MockTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: erc20MockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useSimulateErc20Mock = /*#__PURE__*/ createUseSimulateContract({
  abi: erc20MockAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateErc20MockApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateErc20MockMint = /*#__PURE__*/ createUseSimulateContract(
  { abi: erc20MockAbi, functionName: 'mint' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateErc20MockTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link erc20MockAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateErc20MockTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: erc20MockAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__
 */
export const useWatchErc20MockEvent = /*#__PURE__*/ createUseWatchContractEvent(
  { abi: erc20MockAbi },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchErc20MockApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20MockAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link erc20MockAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchErc20MockTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: erc20MockAbi,
    eventName: 'Transfer',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link registryAbi}__
 */
export const useReadRegistry = /*#__PURE__*/ createUseReadContract({
  abi: registryAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"projects"`
 */
export const useReadRegistryProjects = /*#__PURE__*/ createUseReadContract({
  abi: registryAbi,
  functionName: 'projects',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__
 */
export const useWriteRegistry = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteRegistryApprove = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"register"`
 */
export const useWriteRegistryRegister = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: 'register',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__
 */
export const useSimulateRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: registryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateRegistryApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateRegistryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link registryAbi}__
 */
export const useWatchRegistryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: registryAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link registryAbi}__ and `eventName` set to `"Approve"`
 */
export const useWatchRegistryApproveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: registryAbi,
    eventName: 'Approve',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link registryAbi}__ and `eventName` set to `"Register"`
 */
export const useWatchRegistryRegisterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: registryAbi,
    eventName: 'Register',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__
 */
export const useReadStrategy = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"strategyName"`
 */
export const useReadStrategyStrategyName = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
  functionName: 'strategyName',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link strategyAbi}__
 */
export const useWatchStrategyEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link strategyAbi}__ and `eventName` set to `"Initialize"`
 */
export const useWatchStrategyInitializeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: strategyAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yourStrategyAbi}__
 */
export const useReadYourStrategy = /*#__PURE__*/ createUseReadContract({
  abi: yourStrategyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"owner"`
 */
export const useReadYourStrategyOwner = /*#__PURE__*/ createUseReadContract({
  abi: yourStrategyAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"projects"`
 */
export const useReadYourStrategyProjects = /*#__PURE__*/ createUseReadContract({
  abi: yourStrategyAbi,
  functionName: 'projects',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"strategyName"`
 */
export const useReadYourStrategyStrategyName =
  /*#__PURE__*/ createUseReadContract({
    abi: yourStrategyAbi,
    functionName: 'strategyName',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__
 */
export const useWriteYourStrategy = /*#__PURE__*/ createUseWriteContract({
  abi: yourStrategyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"allocate"`
 */
export const useWriteYourStrategyAllocate =
  /*#__PURE__*/ createUseWriteContract({
    abi: yourStrategyAbi,
    functionName: 'allocate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteYourStrategyApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: yourStrategyAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"distribute"`
 */
export const useWriteYourStrategyDistribute =
  /*#__PURE__*/ createUseWriteContract({
    abi: yourStrategyAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"register"`
 */
export const useWriteYourStrategyRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: yourStrategyAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteYourStrategyRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: yourStrategyAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteYourStrategyTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: yourStrategyAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__
 */
export const useSimulateYourStrategy = /*#__PURE__*/ createUseSimulateContract({
  abi: yourStrategyAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"allocate"`
 */
export const useSimulateYourStrategyAllocate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'allocate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateYourStrategyApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"distribute"`
 */
export const useSimulateYourStrategyDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateYourStrategyRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateYourStrategyRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link yourStrategyAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateYourStrategyTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: yourStrategyAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__
 */
export const useWatchYourStrategyEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: yourStrategyAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__ and `eventName` set to `"Allocate"`
 */
export const useWatchYourStrategyAllocateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yourStrategyAbi,
    eventName: 'Allocate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__ and `eventName` set to `"Approve"`
 */
export const useWatchYourStrategyApproveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yourStrategyAbi,
    eventName: 'Approve',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__ and `eventName` set to `"Initialize"`
 */
export const useWatchYourStrategyInitializeEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yourStrategyAbi,
    eventName: 'Initialize',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchYourStrategyOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yourStrategyAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link yourStrategyAbi}__ and `eventName` set to `"Register"`
 */
export const useWatchYourStrategyRegisterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: yourStrategyAbi,
    eventName: 'Register',
  })
