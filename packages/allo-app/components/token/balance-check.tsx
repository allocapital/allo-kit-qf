import { PropsWithChildren } from "react";
import { useAccount, useBalance } from "wagmi";
import { Button } from "../ui/button";

export function BalanceCheck({
  children,
  amount = 0n,
}: PropsWithChildren<{ amount?: bigint }>) {
  const { address } = useAccount();
  const { data: { value = 0n } = {}, isPending } = useBalance({
    address,
  });

  if (isPending) return <Button variant={"outline"} isLoading />;

  if (value > amount) return <>{children}</>;

  return (
    <Button disabled variant="ghost">
      Insufficient balance
    </Button>
  );
}
