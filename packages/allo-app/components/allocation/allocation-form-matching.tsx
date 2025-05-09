"use client";
import { ShoppingCart, XIcon } from "lucide-react";
import { Address } from "viem";
import { useAccount } from "wagmi";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  useAllocate,
  useAllocations,
} from "~/components/allocation/use-allocate";
import { buildAllocations, useCart } from "~/components/cart/use-cart";
import { AllowanceCheck } from "../token/allowance-check";
import { formatNumber } from "~/lib/format";
import { useToken } from "~/components/token/use-token";
import { useProjects } from "../registration/use-register";
import { Grid } from "../grid";
import { AllocationItem } from "./allocation-item";
import { formatTokenAmount, TokenAmount } from "../token/token-amount";
import { calculateQuadraticMatching } from "~/lib/quadratic";
import { Allocation } from "~/schemas";
import { NumberInput } from "../number-input";
import { useQuadraticMatching } from "~/hooks/use-quadratic-matching";
import { useEffect } from "react";

export function AllocationFormMatching({
  strategyAddress,
  tokenAddress,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
}) {
  const { address } = useAccount();
  const token = useToken(tokenAddress, address);
  const cart = useCart();
  const allocate = useAllocate({ strategyAddress });
  const projects = useProjects({
    where: {
      address_in: Object.keys(cart.items) as Address[],
    },
  });

  const {
    matching,
    estimateMatching,
    error: matchingError,
    isLoading,
    queryKeys,
  } = useQuadraticMatching({
    strategyAddress,
    tokenAddress,
  });
  useEffect(() => {
    if (!projects.data?.items) return;
    // Make sure the cart items are in the projects
    const missing =
      Object.keys(cart.items).filter(
        (item) => !projects.data?.items.some((p) => p.address === item)
      ) ?? [];

    missing.forEach(cart.remove);
  }, [projects.data?.items]);
  // Get all donations to projects
  // const allocations = useAllocations({
  //   where: {
  //     // Only fetch allocations for this strategy
  //     strategy_in: [strategyAddress],
  //     // Not any transfers to or from Strategy contract (fund / withdraw of matching)
  //     to_not_in: [strategyAddress],
  //     from_not_in: [strategyAddress],
  //   },
  // });
  // const donations = allocations.data?.items ?? [];

  // const matchingToken = useToken(tokenAddress, strategyAddress);
  // const matchingFunds = matchingToken.data?.balance ?? BigInt(0);

  // const existing = calculateQuadraticMatching(donations, matchingFunds);
  // const combined = [
  //   ...donations,
  //   ...(Object.entries(cart.items).map(([address, amount]) => ({
  //     amount: (amount ?? 0) * 10 ** (token.data?.decimals ?? 18),
  //     to: address,
  //     from: strategyAddress,
  //     tokenAddress,
  //     createdAt: Date.now(),
  //   })) as unknown as Allocation[]),
  // ];
  // const current = calculateQuadraticMatching(combined, matchingFunds);

  // console.log(current);
  const error = projects.error || allocate.error;

  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        const [recipients, amounts] = buildAllocations(
          cart.items,
          token.data?.decimals
        );

        allocate
          .mutateAsync([
            recipients,
            amounts,
            tokenAddress,
            recipients.map(() => "0x"), // Empty data
          ])
          .then(() => cart.reset());
      }}
    >
      <Grid
        columns={[1]}
        loadingItems={3}
        isPending={projects.isPending}
        data={projects.data?.items}
        error={error}
        emptyState={{
          title: "Cart Empty",
          description: "Add projects to your cart to allocate",
          icon: ShoppingCart,
        }}
        renderItem={(project, i) => {
          const estimated = estimateMatching([
            {
              amount:
                (cart.items[project?.address as Address] ?? 0) *
                10 ** (token.data?.decimals ?? 18),
              to: project?.address,
              from: strategyAddress,
            } as Allocation,
          ]);
          const amount = estimated[project?.address as Address];
          return (
            <AllocationItem
              {...project}
              key={project?.id}
              actions={
                <>
                  {amount ? (
                    <div className="p-2 text-sm">
                      Matching:{" "}
                      {formatTokenAmount(amount, token.data?.decimals ?? 18)}
                    </div>
                  ) : null}
                  <NumberInput
                    name={address}
                    className="sm:w-48 sm:mr-10"
                    placeholder="0"
                    allowNegative={false}
                    step={0.0000000001}
                    value={cart.items[project?.address as Address]}
                    onValueChange={({ floatValue }) =>
                      cart.set(project.address, floatValue)
                    }
                  />
                  <Button
                    className="absolute top-2 right-2"
                    tabIndex={-1}
                    size={"icon"}
                    icon={XIcon}
                    variant={"ghost"}
                    type="button"
                    onClick={() => cart.remove(project.address)}
                  />
                </>
              }
            />
          );
        }}
      />
      <div className="py-4 mt-2 mb-4 border-y sm:flex items-center justify-between">
        <div className="flex justify-end flex-1 mr-4 gap-1">
          Total: {formatNumber(Number(cart.sum))} /
          <strong>
            <TokenAmount amount={token.data?.balance!} token={tokenAddress} />
          </strong>
        </div>
        <div className="flex gap-1">
          <Button type="button" variant="outline" onClick={() => cart.reset()}>
            Reset Cart
          </Button>
          <AllowanceCheck
            amount={cart.sum}
            tokenAddress={tokenAddress}
            spenderAddress={strategyAddress}
          >
            <Button
              className="w-48"
              type="submit"
              disabled={!cart.list.length}
              isLoading={allocate.isPending}
            >
              Transfer tokens
            </Button>
          </AllowanceCheck>
        </div>
      </div>
    </form>
  );
}
