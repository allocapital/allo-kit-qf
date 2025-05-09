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
    ,
    error: matchingError,
    isLoading,
    queryKeys,
  } = useQuadraticMatching({
    strategyAddress,
    tokenAddress,
  });
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
          const amount = 0n;

          // (current[project?.address as Address] ?? BigInt(0)) -
          // (existing[project?.address as Address] ?? BigInt(0));

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
