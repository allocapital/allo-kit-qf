"use client";

import { Button } from "~/components/ui/button";
import { useRegistrationById, useRegistryApprove } from "./use-register";
import { useInvalidate } from "~/hooks/use-invalidate";
import { Badge } from "../ui/badge";

export function RegistrationApproveButton({ id }: { id: string }) {
  const { data: registration, isPending, queryKey } = useRegistrationById(id);
  const invalidate = useInvalidate();

  const approve = useRegistryApprove({
    strategyAddress: registration?.strategy?.address!,
  });
  if (isPending) return null;
  if (registration?.isApproved)
    return <Badge variant="success">Approved</Badge>;

  return (
    <Button
      variant="outline"
      isLoading={approve.isPending}
      onClick={() =>
        approve
          .mutateAsync([
            registration?.address!,
            BigInt(registration?.index!),
            "",
            "0x",
          ])
          .then(() => invalidate([queryKey]))
      }
    >
      Approve
    </Button>
  );
}
