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
import { useQuadraticMatching } from "~/hooks/use-quadratic-matching";

export function QuadraticDistribution({
  strategyAddress,
  tokenAddress,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
}) {
  const invalidate = useInvalidate();

  const {
    donations,
    matchingFunds,
    matching,
    error: matchingError,
    isLoading,
    queryKeys,
  } = useQuadraticMatching({
    strategyAddress,
    tokenAddress,
  });

  // Fetch projects for the donations
  const { data: projects } = useProjects({
    where: {
      address_in: donations.map((alloc) => alloc.to),
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
          onSuccess={() => invalidate(Object.values(queryKeys))}
        />
      </div>
      <Grid
        columns={[1]}
        data={items}
        loadingItems={3}
        isPending={isLoading}
        error={matchingError}
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
