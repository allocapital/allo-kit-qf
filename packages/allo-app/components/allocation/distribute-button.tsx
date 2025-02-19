"use client";

import { Address } from "viem";
import { Button } from "~/components/ui/button";
import { useDistribute } from "~/components/allocation/use-allocate";
import { buildAllocations } from "~/components/cart/use-cart";
import { MatchingResult } from "~/lib/quadratic";

export function DistributeButton({
  strategyAddress,
  tokenAddress,
  matching,
  disabled,
  onSuccess,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
  matching: MatchingResult;
  disabled?: boolean;
  onSuccess: () => void;
}) {
  const distribute = useDistribute({ strategyAddress });
  return (
    <Button
      disabled={disabled}
      isLoading={distribute.isPending}
      onClick={() => {
        const [recipients, amounts] = buildAllocations(matching, 0);
        distribute
          .mutateAsync([recipients, amounts, tokenAddress, ["0x"]])
          .then(() => {
            onSuccess();
          });
      }}
    >
      Distribute Matching
    </Button>
  );
}
