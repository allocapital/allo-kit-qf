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
// PoolFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const poolFactoryAbi = [
  { type: 'error', inputs: [], name: 'ERC1167FailedCreateClone' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'strategy',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'pool', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'metadataURI',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
      { name: 'data', internalType: 'bytes', type: 'bytes', indexed: false },
      {
        name: 'schema',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Deployed',
  },
  {
    type: 'function',
    inputs: [
      { name: 'implementation', internalType: 'address', type: 'address' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'deploy',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
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
    name: 'Update',
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
      { name: 'owner', internalType: 'address', type: 'address' },
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
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SimpleGrants
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const simpleGrantsAbi = [
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
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
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
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'schema',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Deployed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
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
    name: 'Update',
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
    name: 'id',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
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
      { name: 'owner', internalType: 'address', type: 'address' },
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
    name: 'schema',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
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
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Strategy
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const strategyAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_name', internalType: 'string', type: 'string' },
      { name: '_schema', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  { type: 'error', inputs: [], name: 'InvalidInitialization' },
  { type: 'error', inputs: [], name: 'NotInitializing' },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'id', internalType: 'bytes32', type: 'bytes32', indexed: false },
      { name: 'name', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'creator',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'schema',
        internalType: 'string',
        type: 'string',
        indexed: false,
      },
    ],
    name: 'Deployed',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'version',
        internalType: 'uint64',
        type: 'uint64',
        indexed: false,
      },
    ],
    name: 'Initialized',
  },
  {
    type: 'function',
    inputs: [],
    name: 'id',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'initialize',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'schema',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolFactoryAbi}__
 */
export const useWritePoolFactory = /*#__PURE__*/ createUseWriteContract({
  abi: poolFactoryAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link poolFactoryAbi}__ and `functionName` set to `"deploy"`
 */
export const useWritePoolFactoryDeploy = /*#__PURE__*/ createUseWriteContract({
  abi: poolFactoryAbi,
  functionName: 'deploy',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolFactoryAbi}__
 */
export const useSimulatePoolFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: poolFactoryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link poolFactoryAbi}__ and `functionName` set to `"deploy"`
 */
export const useSimulatePoolFactoryDeploy =
  /*#__PURE__*/ createUseSimulateContract({
    abi: poolFactoryAbi,
    functionName: 'deploy',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolFactoryAbi}__
 */
export const useWatchPoolFactoryEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: poolFactoryAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link poolFactoryAbi}__ and `eventName` set to `"Deployed"`
 */
export const useWatchPoolFactoryDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: poolFactoryAbi,
    eventName: 'Deployed',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"update"`
 */
export const useWriteRegistryUpdate = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: 'update',
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
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"update"`
 */
export const useSimulateRegistryUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: 'update',
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
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link registryAbi}__ and `eventName` set to `"Update"`
 */
export const useWatchRegistryUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: registryAbi,
    eventName: 'Update',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__
 */
export const useReadSimpleGrants = /*#__PURE__*/ createUseReadContract({
  abi: simpleGrantsAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"id"`
 */
export const useReadSimpleGrantsId = /*#__PURE__*/ createUseReadContract({
  abi: simpleGrantsAbi,
  functionName: 'id',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"owner"`
 */
export const useReadSimpleGrantsOwner = /*#__PURE__*/ createUseReadContract({
  abi: simpleGrantsAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"projects"`
 */
export const useReadSimpleGrantsProjects = /*#__PURE__*/ createUseReadContract({
  abi: simpleGrantsAbi,
  functionName: 'projects',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"schema"`
 */
export const useReadSimpleGrantsSchema = /*#__PURE__*/ createUseReadContract({
  abi: simpleGrantsAbi,
  functionName: 'schema',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"strategyName"`
 */
export const useReadSimpleGrantsStrategyName =
  /*#__PURE__*/ createUseReadContract({
    abi: simpleGrantsAbi,
    functionName: 'strategyName',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__
 */
export const useWriteSimpleGrants = /*#__PURE__*/ createUseWriteContract({
  abi: simpleGrantsAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"allocate"`
 */
export const useWriteSimpleGrantsAllocate =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'allocate',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteSimpleGrantsApprove = /*#__PURE__*/ createUseWriteContract(
  { abi: simpleGrantsAbi, functionName: 'approve' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"distribute"`
 */
export const useWriteSimpleGrantsDistribute =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteSimpleGrantsInitialize =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"register"`
 */
export const useWriteSimpleGrantsRegister =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteSimpleGrantsRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteSimpleGrantsTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: simpleGrantsAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"update"`
 */
export const useWriteSimpleGrantsUpdate = /*#__PURE__*/ createUseWriteContract({
  abi: simpleGrantsAbi,
  functionName: 'update',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__
 */
export const useSimulateSimpleGrants = /*#__PURE__*/ createUseSimulateContract({
  abi: simpleGrantsAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"allocate"`
 */
export const useSimulateSimpleGrantsAllocate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'allocate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateSimpleGrantsApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"distribute"`
 */
export const useSimulateSimpleGrantsDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'distribute',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateSimpleGrantsInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"register"`
 */
export const useSimulateSimpleGrantsRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateSimpleGrantsRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateSimpleGrantsTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link simpleGrantsAbi}__ and `functionName` set to `"update"`
 */
export const useSimulateSimpleGrantsUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: simpleGrantsAbi,
    functionName: 'update',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__
 */
export const useWatchSimpleGrantsEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: simpleGrantsAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Allocate"`
 */
export const useWatchSimpleGrantsAllocateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Allocate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Approve"`
 */
export const useWatchSimpleGrantsApproveEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Approve',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Deployed"`
 */
export const useWatchSimpleGrantsDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Deployed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchSimpleGrantsInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Initialized',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchSimpleGrantsOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Register"`
 */
export const useWatchSimpleGrantsRegisterEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Register',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link simpleGrantsAbi}__ and `eventName` set to `"Update"`
 */
export const useWatchSimpleGrantsUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: simpleGrantsAbi,
    eventName: 'Update',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__
 */
export const useReadStrategy = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"id"`
 */
export const useReadStrategyId = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
  functionName: 'id',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"schema"`
 */
export const useReadStrategySchema = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
  functionName: 'schema',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"strategyName"`
 */
export const useReadStrategyStrategyName = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
  functionName: 'strategyName',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link strategyAbi}__
 */
export const useWriteStrategy = /*#__PURE__*/ createUseWriteContract({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"initialize"`
 */
export const useWriteStrategyInitialize = /*#__PURE__*/ createUseWriteContract({
  abi: strategyAbi,
  functionName: 'initialize',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link strategyAbi}__
 */
export const useSimulateStrategy = /*#__PURE__*/ createUseSimulateContract({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"initialize"`
 */
export const useSimulateStrategyInitialize =
  /*#__PURE__*/ createUseSimulateContract({
    abi: strategyAbi,
    functionName: 'initialize',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link strategyAbi}__
 */
export const useWatchStrategyEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: strategyAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link strategyAbi}__ and `eventName` set to `"Deployed"`
 */
export const useWatchStrategyDeployedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: strategyAbi,
    eventName: 'Deployed',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link strategyAbi}__ and `eventName` set to `"Initialized"`
 */
export const useWatchStrategyInitializedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: strategyAbi,
    eventName: 'Initialized',
  })
