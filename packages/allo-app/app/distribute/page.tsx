"use client";

import { useAccount } from "wagmi";
import { MintTokens } from "~/components/mint-tokens";
import { Page } from "~/components/page";
import { useContracts } from "~/hooks/use-contracts";
import { AllocationsTable } from "~/components/allocation/allocations-table";
import { QuadraticDistribution } from "~/components/distribution/distribution-quadratic";

export default function DistributePage() {
  const { SimpleGrants, ERC20Mock } = useContracts();
  const { address } = useAccount();
  const strategyAddress = SimpleGrants?.address;
  const tokenAddress = ERC20Mock?.address;

  return (
    <Page title="Matching Funds">
      <p className="pb-4 text-lg">
        Add matching funds to be distributed to projects based on quadratic
        voting.
      </p>
      <QuadraticDistribution
        strategyAddress={strategyAddress}
        tokenAddress={tokenAddress}
      />

      <h3 className="mt-8 mb-2 font-semibold">Distributed matching funds</h3>
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
      <div className="mt-32">
        <MintTokens tokenAddress={tokenAddress} />
      </div>
    </Page>
  );
}
