"use client";

import { MintTokens } from "~/components/mint-tokens";
import { Page } from "~/components/page";
import { TokenAmount } from "~/components/token/token-amount";
import { useAllocations } from "~/components/allocation/use-allocate";
import { useContracts } from "~/hooks/use-contracts";
import { useToken } from "~/components/token/use-token";
import { AllocationsTable } from "~/components/allocation/allocations-table";
import { useAccount } from "wagmi";
import { useInvalidate } from "~/hooks/use-invalidate";
import { MatchingFunds } from "~/components/allocation/matching-funds";
import { DistributeButton } from "~/components/allocation/distribute-button";
import { AllocationsDistributions } from "~/components/allocation/allocations-distributions";

export default function DistributePage() {
  const invalidate = useInvalidate();
  const { SimpleGrants, ERC20Mock } = useContracts();
  const strategyAddress = SimpleGrants?.address;
  const { address } = useAccount();
  const tokenAddress = ERC20Mock?.address;
  const allocations = useAllocations({
    where: {
      // Only fetch allocations for this strategy
      strategy_in: [strategyAddress],
      // Not any transfers to or from this contract (fund / withdraw)
      to_not_in: [strategyAddress],
      from_not_in: [strategyAddress],
    },
  });

  const token = useToken(tokenAddress, strategyAddress);
  const matchingFunds = token.data?.balance ?? BigInt(0);

  return (
    <Page
      title="Matching Funds"
      actions={
        <DistributeButton
          strategyAddress={strategyAddress}
          tokenAddress={tokenAddress}
          onSuccess={() => invalidate([token.queryKey, allocations.queryKey])}
        />
      }
    >
      <p className="pb-4 text-lg">
        Add matching funds to be distributed to projects based on quadratic
        voting.
      </p>

      <div className="pb-2 mt-2 mb-4 border-b sm:flex items-center justify-between">
        Matching funds:{" "}
        <TokenAmount amount={matchingFunds} token={tokenAddress} />
        <MatchingFunds
          strategyAddress={strategyAddress}
          tokenAddress={tokenAddress}
        />
      </div>
      <AllocationsDistributions
        strategyAddress={strategyAddress}
        tokenAddress={tokenAddress}
      />
      <AllocationsTable
        query={{
          where: {
            // Only fetch allocations for this strategy
            strategy_in: [strategyAddress],
            // Not any transfers to or from this contract (fund / withdraw)
            to_not_in: [address!],
            from_in: [strategyAddress],
          },
          orderBy: "createdAt",
          orderDirection: "desc",
        }}
      />
      <div className="mt-4">
        <MintTokens tokenAddress={tokenAddress} />
      </div>
    </Page>
  );
}
