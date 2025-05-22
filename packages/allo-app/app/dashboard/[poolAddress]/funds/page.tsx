"use client";
import { useParams } from "next/navigation";
import { Address } from "viem";
import { QuadraticDistribution } from "~/components/distribution/distribution-quadratic";
import { MintTokens } from "~/components/mint-tokens";
import { Page } from "~/components/page";
import { usePoolById } from "~/components/pool/use-pool";
import { PoolFunds } from "~/components/pool/pool-funds";
import { useContracts } from "~/hooks/use-contracts";

export default function DashboardFundsPage() {
  const { poolAddress } = useParams();
  const { ERC20Mock } = useContracts();

  const { data: pool } = usePoolById(poolAddress as Address);
  const tokenAddress = pool?.decodedData.matchToken ?? ERC20Mock?.address;

  return (
    <Page title="Pool Funds">
      <PoolFunds pool={pool} />
    </Page>
  );
}
