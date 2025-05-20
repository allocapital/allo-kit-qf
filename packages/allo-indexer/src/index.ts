import { Context, Event, ponder } from "ponder:registry";
import schemas from "ponder:schema";
import { Address, erc20Abi, Hex, zeroAddress } from "viem";
import pRetry from "p-retry";
import { cachedFetchWithRetry } from "./lib/fetch";

import { decodeData } from "@se-2/sdk/utils";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const PINATA_GATEWAY_URL = process.env.PINATA_GATEWAY_URL;
const PINATA_GATEWAY_KEY = process.env.PINATA_GATEWAY_KEY;

const MAX_RETRY_COUNT = 5;

// Whenever a new Pool is created.
ponder.on("PoolFactory:Deployed", async ({ event, context }) => {
  const { strategy, pool, name, owner, data, schema, metadataURI } = event.args;
  const { chainId } = context.network;
  console.log("PoolFactory:Deployed", event.args);
  const metadata = await fetchMetadata(metadataURI);
  await context.db
    .insert(schemas.pool)
    .values({
      address: pool,
      owner,
      name,
      chainId,
      schema,
      data,
      strategy,
      decodedData: decodeData(schema, data),
      metadataURI: metadataURI,
      metadata: metadata,
      createdAt: event.block.timestamp * 1000n,
      updatedAt: event.block.timestamp * 1000n,
    })
    .onConflictDoNothing();
});

ponder.on("Strategy:Deployed", async ({ event, context }) => {
  const { id, name, schema } = event.args;
  const { chainId } = context.network;

  console.log("Strategy:Deployed", event.args);

  await context.db
    .insert(schemas.strategy)
    .values({
      chainId,
      creator: event.args.creator,
      address: event.log.address,
      name,
      schema,
      createdAt: event.block.timestamp * 1000n,
      updatedAt: event.block.timestamp * 1000n,
    })
    .onConflictDoNothing();
});

ponder.on("Registry:Register", async ({ event, context }) => {
  const { chainId } = context.network;
  const { index, project, metadataURI, data } = event.args;
  const metadata = await fetchMetadata(metadataURI);
  await context.db
    .insert(schemas.registration)
    .values({
      id: registrationId(event),
      chainId,
      index,
      address: project,
      strategy: event.log.address,
      metadataURI,
      metadata,
      isApproved: false,
      data,
      createdAt: event.block.timestamp * 1000n,
      updatedAt: event.block.timestamp * 1000n,
    })
    .onConflictDoNothing();
});

ponder.on("Registry:Approve", async ({ event, context }) => {
  const review = await fetchMetadata(event.args.metadataURI);

  await context.db
    .update(schemas.registration, { id: registrationId(event) })
    .set(() => ({
      isApproved: true,
      updatedAt: event.block.timestamp * 1000n,
      review,
    }));
});

ponder.on("Allocator:Allocate", async ({ event, context }) => {
  const { chainId } = context.network;
  const { to, from, token, amount } = event.args;

  const [decimals, symbol] = await fetchToken(token, context.client);

  const tokenPrice = await fetchTokenPrice(symbol);
  const amountInUSD = toAmountInUSD(amount, tokenPrice);
  await context.db.insert(schemas.allocation).values({
    id: `${event.id}`,
    chainId,
    strategy: event.log.address,
    to,
    from,
    amount,
    amountInUSD,
    token: { address: token, decimals, symbol },
    tokenAddress: token,
    createdAt: event.block.timestamp * 1000n,
  });
});

// Registration IDs are a composite of project address, strategy, and applicationIndex
const registrationId = (event: Event) =>
  `${event.args.project}_${event.log.address}_${event.args.index}` as Hex;

async function fetchMetadata(cid: string) {
  console.log("Fetching metadata for:", cid);
  return cid
    ? cachedFetchWithRetry(
        `https://${PINATA_GATEWAY_URL}/ipfs/${cid}?pinataGatewayToken=${PINATA_GATEWAY_KEY}`
      ).catch((err) => {
        console.log("fetchMetadata error:", err);
        return {};
      })
    : {};
}

async function fetchToken(address: Address, client: Context["client"]) {
  if (address === zeroAddress) return [18, "ETH"] as const;

  console.log("Fetching token decimal and symbol for: ", address);
  return pRetry(
    () => {
      const tokenContract = {
        abi: erc20Abi,
        address,
        cache: "immutable",
      } as const;
      return Promise.all([
        client.readContract({ ...tokenContract, functionName: "decimals" }),
        client.readContract({ ...tokenContract, functionName: "symbol" }),
      ]);
    },
    { retries: MAX_RETRY_COUNT }
  );
}

async function fetchTokenPrice(symbol: string): Promise<string> {
  console.log("Fetching token price for symbol:", symbol);
  if (!ALCHEMY_API_KEY) {
    console.log("ALCHEMY_API_KEY not set. Cannot fetch token price.");
    return "0";
  }
  // Our ERC20Mock token used for testing
  if (symbol === "tUSD") symbol = "USDC";
  if (!ALCHEMY_API_KEY) return "0";
  return cachedFetchWithRetry<{
    data: { prices: { value: string }[] }[];
  }>(
    `https://api.g.alchemy.com/prices/v1/${ALCHEMY_API_KEY}/tokens/by-symbol?symbols=${symbol.toLowerCase()}`,
    { headers: { accept: "application/json" } }
  )
    .then((r) => String(r.data?.[0]?.prices[0]?.value ?? "0"))
    .catch((err) => {
      console.log("fetchTokenPrice error:", err);
      return "";
    });
}

function toSeconds(ms: number) {
  return Math.floor(ms / 1000);
}

const PRECISION = 18n; // Number of decimal places for fixed-point arithmetic
const SCALE = 10n ** PRECISION; // Scaling factor for fixed-point numbers

function toAmountInUSD(amount: string, tokenPrice: string) {
  // Convert token price to integer by removing decimal places
  const tokenPriceFloat = parseFloat(tokenPrice);
  const tokenPriceScaled = BigInt(Math.floor(tokenPriceFloat * Number(SCALE)));

  return (BigInt(amount) * tokenPriceScaled) / SCALE;
}
