"use client";

import { Address } from "viem";
import { Button } from "~/components/ui/button";
import { useDistribute } from "~/components/allocation/use-allocate";
import { buildAllocations } from "~/components/cart/use-cart";

export function DistributeButton({
  strategyAddress,
  tokenAddress,
  disabled,
  onSuccess,
}: {
  strategyAddress: Address;
  tokenAddress: Address;
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
