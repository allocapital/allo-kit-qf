"use client";
import { useParams } from "next/navigation";
import { Address } from "viem";
import { QuadraticDistribution } from "~/components/distribution/distribution-quadratic";
import { MintTokens } from "~/components/mint-tokens";
import { Page } from "~/components/page";
import { usePoolById } from "~/components/pool/use-pool";
import { useContracts } from "~/hooks/use-contracts";

export default function DashboardDistributionPage() {
  const { poolAddress } = useParams();
  const { ERC20Mock } = useContracts();

  const { data: pool } = usePoolById(poolAddress as Address);
  const tokenAddress = pool?.decodedData.matchToken ?? ERC20Mock?.address;

  return (
    <Page title="Pool Distribution">
      <QuadraticDistribution
        strategyAddress={poolAddress as Address}
        tokenAddress={tokenAddress}
      />
      <MintTokens tokenAddress={tokenAddress} />
    </Page>
  );
}
