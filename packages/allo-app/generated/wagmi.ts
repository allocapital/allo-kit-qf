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
    name: '_allocate',
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
    name: '_distribute',
    outputs: [],
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
        name: 'approver',
        internalType: 'address',
        type: 'address',
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
        name: 'owner',
        internalType: 'address',
        type: 'address',
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
        name: 'updater',
        internalType: 'address',
        type: 'address',
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
    name: '_approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'project', internalType: 'address', type: 'address' },
      { name: 'metadataURI', internalType: 'string', type: 'string' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: '_register',
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
    name: '_update',
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
      { name: 'metadataURI', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'view',
  },
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
      { name: '_metadataURI', internalType: 'string', type: 'string' },
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
      {
        name: 'metadataURI',
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
    name: 'metadataURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"_allocate"`
 */
export const useWriteAllocatorAllocate = /*#__PURE__*/ createUseWriteContract({
  abi: allocatorAbi,
  functionName: '_allocate',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"_distribute"`
 */
export const useWriteAllocatorDistribute = /*#__PURE__*/ createUseWriteContract(
  { abi: allocatorAbi, functionName: '_distribute' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__
 */
export const useSimulateAllocator = /*#__PURE__*/ createUseSimulateContract({
  abi: allocatorAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"_allocate"`
 */
export const useSimulateAllocatorAllocate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: allocatorAbi,
    functionName: '_allocate',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link allocatorAbi}__ and `functionName` set to `"_distribute"`
 */
export const useSimulateAllocatorDistribute =
  /*#__PURE__*/ createUseSimulateContract({
    abi: allocatorAbi,
    functionName: '_distribute',
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
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_approve"`
 */
export const useWriteRegistryApprove = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: '_approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_register"`
 */
export const useWriteRegistryRegister = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: '_register',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_update"`
 */
export const useWriteRegistryUpdate = /*#__PURE__*/ createUseWriteContract({
  abi: registryAbi,
  functionName: '_update',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__
 */
export const useSimulateRegistry = /*#__PURE__*/ createUseSimulateContract({
  abi: registryAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_approve"`
 */
export const useSimulateRegistryApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: '_approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_register"`
 */
export const useSimulateRegistryRegister =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: '_register',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link registryAbi}__ and `functionName` set to `"_update"`
 */
export const useSimulateRegistryUpdate =
  /*#__PURE__*/ createUseSimulateContract({
    abi: registryAbi,
    functionName: '_update',
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link strategyAbi}__ and `functionName` set to `"metadataURI"`
 */
export const useReadStrategyMetadataUri = /*#__PURE__*/ createUseReadContract({
  abi: strategyAbi,
  functionName: 'metadataURI',
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
