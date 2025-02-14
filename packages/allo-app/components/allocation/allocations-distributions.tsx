"use client";

import { Address } from "viem";
import { useProjects } from "~/components/registration/use-register";
import { TokenAmount } from "~/components/token/token-amount";
import { useAllocations } from "~/components/allocation/use-allocate";
import { useToken } from "~/components/token/use-token";
import { formatNumber } from "~/lib/format";
import { calculateQuadraticMatching, getContributions } from "~/lib/quadratic";
import { Grid } from "~/components/grid";
import { EnsName } from "~/components/ens";
import { useMemo } from "react";

export function AllocationsDistributions({
  strategyAddress,
  tokenAddress,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
}) {
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
          ...projects?.items.find((item) => item.address === address),
          share,
          voterCount: Object.keys(voterCountById[address as Address]).length,
        })),
    [matching, projects, voterCountById]
  );

  return (
    <Grid
      columns={[1]}
      data={items}
      loadingItems={3}
      isPending={allocations.isPending}
      error={allocations.error}
      renderItem={(item, i) => (
        <div
          key={i}
          className="flex justify-between items-center border-b py-2"
        >
          <div className="flex-1">
            <h3>{item?.metadata?.title}</h3>
            <div className="font-mono text-xs">
              <EnsName address={item?.address} />
            </div>
          </div>
          <div className="px-4">
            <TokenAmount amount={item?.share ?? 0n} token={tokenAddress} />
          </div>
          <div>{formatNumber(item.voterCount)} voters</div>
        </div>
      )}
    />
  );
}
