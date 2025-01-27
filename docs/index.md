# AlloKit

AlloKit is a modular framework for rapidly building and experimenting with on-chain funding strategies. It is built on top of **[Scaffold-ETH 2](https://github.com/scaffold-eth/scaffold-eth-2)** and inspired by **OpenZeppelin**’s design principles of modularity, extensibility, and reuse.

## Project Goals

1. **Easy Setup & Quick Iteration**  
   AlloKit should be fun and straightforward for developers to clone, configure, and experiment with. Scaffold-ETH has mastered this approach after years of community feedback, so AlloKit benefits from that proven developer experience.

2. **Showcase Possibilities & Encourage Experimentation**  
   By providing a fast feedback loop for contract development and UI updates, AlloKit highlights potential funding strategies and encourages rapid prototyping.

3. **Inspirational Documentation**  
   The documentation is intended to spark curiosity—“Wow, that’s neat. Let me try it!”—and drive developers to immediately fork and explore new ideas.

## Getting Started

```bash
npx create-eth@latest -e allocapital/allo-app
```

This command sets up a fresh Scaffold-ETH 2 project with the following packages:

- **`/packages/hardhat`**  
  Contains the core **Starter Contract** at `contracts/YourStrategy.sol`.
- **`/packages/app`**  
  Houses the main Allo App React front-end.
- **`/packages/allo-indexer`**  
  Handles event indexing.
- **`/packages/nextjs`**  
  Offers a contract debugger and additional UI tools using Next.js.

### Example Usage

```tsx
// Render a registration form
<RegistrationForm strategyAddress="0xMyStrategyAddress" />;

// Or use the hook with your own form
const register = useRegister({ strategyAddress: "0xMyStrategyAddress" });

// List all the applications for your strategies
<ApplicationsList
  query={{
    where: { strategy_in_: ["0xMyStrategyAddress"] },
  }}
/>;
// List approved projects
<ProjectList
  query={{
    where: { strategy_in_: ["0xMyStrategyAddress"], isApproved: true },
  }}
/>;

// Both of these use the useRegistrations hook
const { data, error, isPending } = useRegistrations(query);
```

Look in the `/packages/allo-app/components` directory for more examples.

## Architecture Overview

AlloKit currently explores four example “strategies,” each providing unique funding patterns. By examining different function calls, we can discover common abstractions to unify these strategies under a single architecture.

You can find the example strategies in `/packages/hardhat/contracts/strategies/`.

1. **SimpleGrants**

   - Add projects to a “cart” and directly donate tokens.

2. **AlloIRL**

   - Quadratic voting for projects, match funding, and allow projects to claim those matching funds.

3. **AlloStaker**

   - Stake an ALLO token on chosen projects. Both the staker and the project receive rewards. Based on Synthetix Staking rewards contract.

By finding common patterns—such as `register`, `approve`, `allocate`, and `distribute`—we can create reusable interfaces and shared events, making the overall system more flexible and powerful. This is similar to how the ERC20 interface works.

One big advantage of this is that the indexer picks up all the events for all different types of strategies, so you can query for all the allocations, registrations, and approvals from the frontend.

### Example Contracts

Below are simplified examples showing how these strategies typically work. Notice their shared function signatures and events.

```solidity
contract SimpleGrants {
    // Register project
    function register(address project, string calldata metadataURI) public {}

    // Approve project
    function approve(address project, string calldata metadataURI, address token) public onlyOwner {}

    // Directly fund projects
    function allocate(address[] calldata projects, uint256[] calldata amounts) public {}
}

contract AlloIRL {
    // Register project
    function register(address project, string calldata metadataURI) public {}

    // Approve project
    function approve(address project, string calldata metadataURI) public onlyOwner {}

    // Fund + Vote for projects
    function allocate(address[] calldata projects, uint256[] calldata amounts, address token) public {}

    // Distribute matching funds
    function distribute(address[] calldata projects, uint256[] calldata amounts, address token) public {}
}

contract AlloStaker {
    // Register project
    function register(address project, string calldata metadataURI) public {}

    // Approve project
    function approve(address project, string calldata metadataURI) public onlyOwner {}

    // Stake tokens
    function allocate(address[] calldata projects, uint256[] calldata amounts) public {}

    // Unstake tokens
    function distribute(address project, uint256 amount) public {}

    // Claim staking rewards
    function claimRewards() public {}
}

// Common Events
event Register(address indexed project, string metadataURI);
event Approve(address indexed project, string metadataURI);

event Allocate(address indexed from, address indexed recipient, uint256 amount, address token);
event Distribute(address indexed from, address indexed recipient, uint256 amount, address token);
```

### Logical Flow

- **Register**  
  Projects, campaigns, or applications submit details for consideration.
- **Approve**  
  Designated reviewers or the contract owner confirm or reject these submissions.
- **Allocate**  
  Transfer tokens from a user to a project or hold them in the contract (for voting, staking, or direct funding).
- **Distribute**  
  Disburse tokens from the contract to final recipients (e.g., project owners).

By standardizing these functions (and their associated events), any strategy adhering to this interface can be indexed consistently, enabling a unified set of UI components and hooks.

## Composing Contracts

AlloKit encourages composable “strategy” contracts built from **extensions** (core functionality) and **gates** (access control and checks). This design is similar to how **OpenZeppelin** separates basic functionality from optional features.

We can pass data to a function call, which is useful for things like metadata or other data that you want to store on chain or handle in contract logic.

### Extensions

Extensions provide reusable internal logic (e.g., for registering, approving, allocating, etc.) while exposing public functions to your main contract.

#### Registry Extension

```solidity
event Register(address indexed project, string metadataURI);
event Approve(address indexed project, string metadataURI);

enum Status { Registered, Approved }
mapping(address => Status) public projects;

function _register(
    address recipient,
    string calldata metadataURI,
    bytes calldata data
) internal virtual;

function _approve(
    address recipient,
    string calldata metadataURI,
    bytes calldata data
) internal virtual;
```

#### Allocator Extension

Allows sending tokens to one or multiple recipients. By batching recipients in a single transaction, you avoid repeated function calls.

```solidity
event Allocate(address indexed from, address indexed recipient, uint256 amount, address token);
event Withdraw(address indexed from, address indexed recipient, uint256 amount, address token);

function allocate(
    address[] calldata recipients,
    uint256[] calldata amounts,
    address token,
    bytes[] calldata data
) public virtual;

function _allocate(address recipient) internal virtual;

function withdraw(
    address[] calldata recipients,
    uint256[] calldata amounts,
    address token,
    bytes[] calldata data
) public virtual;

function _withdraw(address recipient) internal virtual;
```

#### MerkleClaim Extension

A merkle-based approach for verifying off-chain proofs before allowing token claims.

```solidity
event MerkleSet(bytes32 root);
event Claim(address recipient, uint256 amount, address token);

function _setMerkle(bytes32 root) internal virtual;
function _verify(
    bytes32[] memory proof,
    address token,
    address recipient,
    uint256 amount
) internal virtual;

function claim(
    bytes32[] memory proof,
    address token,
    address recipient,
    uint256 amount
) public virtual;
```

### Gates

Gates add access control checks, inspired by _Ownable_ in OpenZeppelin but extended to other conditions.

#### TokenGate

Enforces that a user holds a minimum balance of a specified ERC-20 or ERC-721 token:

```solidity
modifier onlyToken(address account, address token, uint256 amount) {
    require(ITokenBalance(token).balanceOf(account) >= amount, "Insufficient balance");
    _;
}
```

##### Example: Gated Registry + MerkleClaim

```solidity
contract GatedRegistryWithMerkleClaim is Allocator, Registry, TokenGate, MerkleClaim {
    address private alloToken;
    address private guildNFT;

    constructor(address _alloToken, address _guildNFT) {
        alloToken = _alloToken;
        guildNFT = _guildNFT;
    }

    // Only holders of 1 Guild NFT can register projects
    function register(
        address project,
        string memory metadataURI,
        bytes memory data
    ) public override onlyToken(msg.sender, guildNFT, 1) {
        _register(project, metadataURI, data);
    }

    // Only holders of >=10 ALLO tokens can approve projects
    function approve(
        address project,
        string memory metadataURI,
        bytes memory data
    ) public override onlyToken(msg.sender, alloToken, 10e18) {
        _approve(project, metadataURI, data);
    }

    // Only Owner can update Merkle Root
    function setMerkle(bytes32 _root) public override onlyOwner {
        _setMerkle(_root);
    }

    // Public claim with off-chain proof verification
    function claim(
        bytes32[] memory proof,
        address token,
        address recipient,
        uint256 amount
    ) public override {
        if (_verify(proof, token, recipient, amount)) {
            IERC20(token).transfer(recipient, amount);
            emit Claim(recipient, amount, token);
        }
    }
}
```

#### EASGate

Checks whether an account has a valid attestation (EAS) from a recognized schema and attester:

```solidity
modifier onlyEAS(address account, bytes32 schemaUID, address attester) {
    // Implementation
    _;
}
```

#### SignatureGate

Restricts function calls to those providing a valid off-chain signature:

```solidity
modifier onlySignature(address account, bytes memory data) {
    // Implementation
    _;
}
```

## Indexer

AlloKit’s indexer watches for contract events emitted by these strategy extensions. You can query it using GraphQL.

### Querying Registrations

```graphql
{
  registrations(
    orderBy: "createdAt"
    orderDirection: "desc"
    limit: 100
    where: { isApproved: true }
  ) {
    items {
      address
      metadata # Project or Application details
      review # Review metadata
      createdAt
      updatedAt
      isApproved
      strategyAddress
      allocations {
        items {
          amount
        }
      }
    }
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
```

### Querying Allocations

```graphql
{
  allocations(
    orderBy: "amount"
    orderDirection: "desc"
    limit: 100
    where: { amount_gte: 100, token: "0xUSDCtoken" }
  ) {
    items {
      amount
      recipient
      from
      token
      createdAt
      strategyAddress
    }
  }
}
```

## React Components

AlloKit provides ready-made React components for typical workflows. You can mix and match them to build custom UIs quickly.

**Categories** include:

- **Registrations**: forms & lists for projects, campaigns, or applications
- **Approvals**: for reviewing registered entries
- **Allocations**: for voting, staking, donating, or distributing
- **Cart**: manages selected projects and amounts for batch allocation
- **ERC-20** utilities: display token balances, allowances, and approvals
- **Merkle**: handle generating proofs and making claims
- **Quadratic**: calculation for matching funds

### Example Components

1. **`<RegistrationForm />`**

   - Allows users to submit a new project, application, or campaign.
   - Uploads metadata (e.g., images, JSON).
   - Triggers `useRegister` to send data on-chain.

2. **`<ProjectsList />` / `<ApplicationsList />`**

   - Displays registered projects or applications with relevant details from your indexer.

3. **`<RegistrationApproval />`**

   - Enables owners or reviewers to approve or reject entries using `useApprove`.

4. **`<AllocationForm />`**
   - Allows batch allocation of tokens to multiple projects in one transaction.

---

# React Hooks

AlloKit offers a consistent set of React hooks to abstract indexer queries and contract interactions. These hooks simplify reading and writing contract data from your front-end.

```ts
function useRegister(strategyAddress: string) {
  // Returns a mutate function and state
}

function useApprove(strategyAddress: string) {
  // ...
}

function useRegistrations(query: IndexerQuery) {
  // ...
}

function useAllocate(strategyAddress: string) {
  // ...
}

function useAllocations(query: IndexerQuery) {
  // ...
}

// Allocations into Strategy (wraps useAllocations)
function useDeposits(strategyAddress: string, query: IndexerQuery) {
  // ...
}

// Allocations from Strategy (wraps useAllocations)
function useWithdraws(strategyAddress: string, query: IndexerQuery) {
  // ...
}
```

### Usage Example

```tsx
import { useRegister } from "your-allo-library";

function MyProjectRegistration() {
  const register = useRegister("0xMyStrategyAddress");

  function handleRegister() {
    register.mutate({
      project: "0xProjectAddress",
      metadataURI: "https://my-metadata.example/api/project.json",
      data: "0x...",
    });
  }

  if (register.isLoading) return <p>Registering...</p>;
  if (register.isError) return <p>Error: {register.error.message}</p>;

  return (
    <div>
      <button onClick={handleRegister}>Register Project</button>
    </div>
  );
}
```

## Next Steps

1. **Fork & Experiment**  
   Start with the example strategy contracts in `/packages/hardhat/contracts/Strategy.sol` to design your own logic.

2. **Compose Extensions & Gates**  
   Mix and match standard extensions (Registry, Allocator, MerkleClaim, etc.) with gates (TokenGate, EASGate, SignatureGate) to tailor your access controls.

3. **Leverage React Hooks & Components**  
   Quickly build UIs around your contracts. The faster you can build and iterate, the more you can focus on innovating unique funding mechanisms.

4. **Keep Contributing**  
   AlloKit is meant to evolve. Feel free to share feedback, propose improvements, or create your own strategy examples to expand the ecosystem.

Happy building! If you have any questions or want to show off what you’ve built, jump into the [AlloKit Telegram](https://t.me/c/2436853036/11) or open an issue on [GitHub](https://github.com/allocapital/allo-kit/issues).
