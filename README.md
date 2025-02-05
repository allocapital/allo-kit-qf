# Allo Simple Grants

Allo Kit gets you up and running building Allocation Strategies in no time!

## Documentation (in progress)

[AlloKit Builders Telegram Group](https://t.me/+JUT-LKVo13dlN2Rh)  
[AlloKit Documentation](https://allo-kit-docs.vercel.app)

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

## Architecture

This document outlines the thought process of building SimpleGrants and AlloKit.
https://hackmd.io/@carlb/allogram

### Contracts

The contracts are designed to be minimal and modular. A Strategy contract can easily be created by composing extensions and gates.

### Indexer

The indexer is built with Ponder and can be easily extended to support new events.

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
