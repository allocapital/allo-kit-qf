# Allo Kit Extension for Scaffold-ETH 2

Allo Kit gets you up and running building Allocation Strategies in no time!

https://github.com/allocapital/allo-kit

## Features

- Register Project
- Browse Projects
- Directly Allocate tokens to Projects (currently configured to ERC20Mock)
- Quadratic Funding
  - Fund Matching Pool to SimpleGrants strategy contract
  - Client-side calculation of quadratic based on Allocations to Projects
  - Distribute Matching Pool to Projects based on quadratic shares
- Indexer
  - Project registration and approval events
  - Token transfers to and from addresses via Allocate
  - Token amounts also in USD amount at time of transfer

## Getting Started

### Update .env variables

Create `.env.local` files for both the allo app and the indexer.

```sh
cp packages/allo-app/.env.sample packages/allo-app/.env.local
cp packages/allo-indexer/.env.sample packages/allo-indexer/.env.local
```

Update the Pinata variables. This is needed for the creation and fetching of metadata to work properly.

```sh
PINATA_GATEWAY_KEY=
PINATA_JWT=
PINATA_GATEWAY_URL=
```

Update the Alchemy key. This is needed to fetch the token price in USD.

```sh
ALCHEMY_API_KEY=
```

### Development

```sh
yarn chain          # Run hardhat node
yarn deploy         # Deploy contracts
yarn allo:indexer   # Run indexer
yarn allo:dev       # Run app
yarn app            # Run contract debugger

open localhost:3000
```

Make sure Ponder schema has been generated. Regenerate by navigating to `packages/allo-indexer` and run `npm run codegen`.

# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`

## Allo Kit Extension

### Start the development server

Run `yarn allo:dev`
Run `yarn allo:indexer`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.
