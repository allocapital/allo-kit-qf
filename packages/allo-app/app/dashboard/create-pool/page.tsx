"use client";

import { Page } from "~/components/page";
import { PoolForm } from "~/components/pool/pool-form";
import { useStrategies } from "~/components/strategy/use-strategy";
import { useContracts } from "~/hooks/use-contracts";
import { useToken } from "~/components/token/use-token";

export default function CreatePool() {
  const { ERC20Mock } = useContracts();
  const { data: strategies, isPending } = useStrategies({
    limit: 100,
  });
  const { data: token } = useToken(ERC20Mock?.address);
  const tokens = token ? [token] : [];

  return (
    <Page title="Create Pool">
      {isPending ? (
        <>loading...</>
      ) : (
        <PoolForm
          strategies={strategies?.items ?? []}
          tokens={tokens}
          defaultValues={{
            metadata: {
              title: "My Pool",
              image: "",
              description: "My Pool Description",
            },
            strategy: strategies?.items[0]?.address,
            token: ERC20Mock?.address,
            maxAmount: "100",
            admins: [],
          }}
        />
      )}
    </Page>
  );
}
