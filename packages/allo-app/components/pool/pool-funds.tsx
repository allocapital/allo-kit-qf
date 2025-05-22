import { ArrowUpRight, DollarSign, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Progress } from "~/components/ui/progress";
import { Button } from "~/components/ui/button";
import { Pool } from "~/schemas/pool";
import { Address } from "viem";
import { TokenAmount } from "../token/token-amount";
import { useQuadraticMatching } from "~/hooks/use-quadratic-matching";
import { EnsName } from "../ens";
import { MatchingFunds } from "../allocation/matching-funds";
import { MintTokens } from "../mint-tokens";
import { useAllocations } from "../allocation/use-allocate";

export function PoolFunds({ pool }: { pool: Pool }) {
  // Calculate some mock data for the funding progress

  const tokenAddress = pool?.decodedData.matchToken as Address;

  const Contributions = useAllocations({
    where: {
      pool_in: [pool?.address],
      to_in: [pool?.address],
    },
  });

  const { donations, matchingFunds, matching } = useQuadraticMatching({
    strategyAddress: pool?.address,
    tokenAddress,
  });
  const targetFunds = 5_000 * 10 ** 18;
  const progressPercentage =
    (Number(matchingFunds ?? 0) / Number(targetFunds ?? 0)) * 100;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Funding Progress</CardTitle>
            <CardDescription>Current funding status and target</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div>
                  Current:{" "}
                  <TokenAmount token={tokenAddress} amount={matchingFunds} />
                </div>
                <div>
                  Target:{" "}
                  <TokenAmount token={tokenAddress} amount={targetFunds} />
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm font-medium">Matching Pool</p>
                <div className="flex items-center">
                  <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">
                    {/* ${(pool.totalFunds * 0.4).toLocaleString()} */}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  40% of total funds allocated for matching
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Matching Ratio</p>
                <div className="flex items-center">
                  <TrendingUp className="mr-1 h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-bold">
                    {/* {pool.matchingRatio}x */}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  For every $1 contributed
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <MatchingFunds
                strategyAddress={pool?.address}
                tokenAddress={tokenAddress}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Contributions</CardTitle>
            <CardDescription>Latest funding transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Contributions.data?.items?.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      <EnsName address={tx.from} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <TokenAmount token={tokenAddress} amount={tx.amount} />
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ArrowUpRight className="h-3 w-3" />
                      <span className="sr-only">View transaction</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div>
        <MintTokens tokenAddress={tokenAddress} />
      </div>
    </div>
  );
}
