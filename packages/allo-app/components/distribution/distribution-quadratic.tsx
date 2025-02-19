"use client";

import { useMemo } from "react";
import { Address } from "viem";
import { TokenAmount } from "~/components/token/token-amount";
import { useAllocations } from "~/components/allocation/use-allocate";
import { useToken } from "~/components/token/use-token";
import { useInvalidate } from "~/hooks/use-invalidate";
import { MatchingFunds } from "~/components/allocation/matching-funds";
import { DistributeButton } from "~/components/allocation/distribute-button";
import { getContributions } from "~/lib/quadratic";
import { calculateQuadraticMatching } from "~/lib/quadratic";
import { useProjects } from "~/components/registration/use-register";
import { Grid } from "~/components/grid";
import { formatNumber } from "~/lib/format";
import { AllocationItem } from "~/components/allocation/allocation-item";
import { Registration } from "~/schemas";

export function QuadraticDistribution({
  strategyAddress,
  tokenAddress,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
}) {
  const invalidate = useInvalidate();

  // Get all donations to projects
  const allocations = useAllocations({
    where: {
      // Only fetch allocations for this strategy
      strategy_in: [strategyAddress],
      // Not any transfers to or from Strategy contract (fund / withdraw of matching)
      to_not_in: [strategyAddress],
      from_not_in: [strategyAddress],
    },
  });
  const donations = allocations.data?.items ?? [];

  const matchingToken = useToken(tokenAddress, strategyAddress);
  const matchingFunds = matchingToken.data?.balance ?? BigInt(0);

  const matching = calculateQuadraticMatching(donations, matchingFunds);

  // Fetch projects for the donations
  const { data: projects } = useProjects({
    where: {
      address_in: donations.map((alloc) => alloc.registration?.address),
    },
  });

  const voterCountById = getContributions(donations);
  const items = useMemo(
    () =>
      Object.entries(matching)
        .sort(([_, shareA], [__, shareB]) => Number(shareB) - Number(shareA))
        .map(([address, share]) => ({
          ...(projects?.items.find(
            (item) => item.address === address
          ) as Registration),
          share,
          voterCount: Object.keys(voterCountById[address as Address]).length,
        })),
    [matching, projects, voterCountById]
  );

  return (
    <div>
      <div className="py-4 mt-2 mb-4 border-y sm:flex items-center justify-between">
        Matching funds:{" "}
        <strong>
          <TokenAmount amount={matchingFunds} token={tokenAddress} />
        </strong>
        <MatchingFunds
          strategyAddress={strategyAddress}
          tokenAddress={tokenAddress}
        />
        <DistributeButton
          strategyAddress={strategyAddress}
          tokenAddress={tokenAddress}
          matching={matching}
          onSuccess={() =>
            invalidate([matchingToken.queryKey, allocations.queryKey])
          }
        />
      </div>
      <Grid
        columns={[1]}
        data={items}
        loadingItems={3}
        isPending={allocations.isPending}
        error={allocations.error}
        renderItem={(item, i) => (
          <AllocationItem
            {...item}
            key={item?.id}
            actions={
              <div className="text-sm flex items-center gap-4">
                <TokenAmount amount={item?.share ?? 0n} token={tokenAddress} />
                <div>{formatNumber(item.voterCount)} voters</div>
              </div>
            }
          />
        )}
      />
    </div>
  );
}
