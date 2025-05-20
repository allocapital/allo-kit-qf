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

interface PoolFundsProps {
  pool: {
    id: string;
    name: string;
    totalFunds: number;
    matchingRatio: number;
  };
}

export function PoolFunds({ pool }: PoolFundsProps) {
  // Calculate some mock data for the funding progress
  const targetFunds = pool.totalFunds * 1.5;
  const progressPercentage = (pool.totalFunds / targetFunds) * 100;

  // Mock transaction data
  const recentTransactions = [
    {
      id: "tx1",
      amount: 5000,
      contributor: "Acme Foundation",
      date: "2023-06-15",
    },
    { id: "tx2", amount: 2500, contributor: "John Smith", date: "2023-06-14" },
    {
      id: "tx3",
      amount: 1000,
      contributor: "Tech Innovators LLC",
      date: "2023-06-12",
    },
    {
      id: "tx4",
      amount: 750,
      contributor: "Community Group",
      date: "2023-06-10",
    },
    { id: "tx5", amount: 500, contributor: "Anonymous", date: "2023-06-08" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-7">
      <Card className="md:col-span-4">
        <CardHeader>
          <CardTitle>Funding Progress</CardTitle>
          <CardDescription>Current funding status and target</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div>Current: ${pool.totalFunds.toLocaleString()}</div>
              <div>Target: ${targetFunds.toLocaleString()}</div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm font-medium">Matching Pool</p>
              <div className="flex items-center">
                <DollarSign className="mr-1 h-4 w-4 text-muted-foreground" />
                <span className="text-2xl font-bold">
                  ${(pool.totalFunds * 0.4).toLocaleString()}
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
                  {pool.matchingRatio}x
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                For every $1 contributed
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline">View Details</Button>
            <Button>Add Funds</Button>
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
            {recentTransactions.map((tx) => (
              <div key={tx.id} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{tx.contributor}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(tx.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    ${tx.amount.toLocaleString()}
                  </span>
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
  );
}
