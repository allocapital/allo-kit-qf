"use client";

import { useState } from "react";
import { Coins, FileText, HandCoins, Info, Share2, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
// import { PoolSelector } from "~/components/pool-selector";
import { PoolDetails } from "./pool-details";
import { PoolFunds } from "./pool-funds";
import { PoolVoters } from "./pool-voters";
import { PoolApplications } from "./pool-applications";
import { PoolDistribution } from "./pool-distribution";
import { Address } from "viem";
import { Pool } from "~/schemas/pool";
import { usePoolById } from "./use-pool";
import { useToken } from "../token/use-token";
import { TokenAmount } from "../token/token-amount";

// Mock data for funding pools
const pools = [
  {
    id: "1",
    name: "Community Development Fund",
    description: "Supporting local community projects and initiatives",
    createdAt: "2023-01-15",
    status: "Active",
    totalFunds: 50000,
    matchingRatio: 1.5,
    contributorsCount: 120,
    votersCount: 75,
    applicationsCount: 28,
    pendingApplications: 12,
    approvedApplications: 16,
    distributionMethod: "Quadratic",
  },
  {
    id: "2",
    name: "Tech Innovation Grant",
    description: "Funding for innovative technology solutions",
    createdAt: "2023-03-22",
    status: "Active",
    totalFunds: 75000,
    matchingRatio: 2.0,
    contributorsCount: 85,
    votersCount: 50,
    applicationsCount: 35,
    pendingApplications: 18,
    approvedApplications: 17,
    distributionMethod: "Linear",
  },
  {
    id: "3",
    name: "Environmental Projects",
    description: "Supporting sustainability and environmental initiatives",
    createdAt: "2023-05-10",
    status: "Pending",
    totalFunds: 35000,
    matchingRatio: 1.2,
    contributorsCount: 65,
    votersCount: 40,
    applicationsCount: 15,
    pendingApplications: 10,
    approvedApplications: 5,
    distributionMethod: "Custom",
  },
];

export function PoolDashboard({ poolAddress }: { poolAddress: Address }) {
  const [selectedPool, setSelectedPool] = useState(pools[0]);
  const [activeTab, setActiveTab] = useState("details");

  const { data: pool } = usePoolById(poolAddress);

  const matchingToken = useToken(
    pool?.decodedData?.matchToken as Address,
    pool?.address
  );
  const matchingFunds = matchingToken.data?.balance ?? BigInt(0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Funds</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <TokenAmount
                amount={matchingFunds}
                token={pool?.decodedData.matchToken as Address}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {"-"}
              {/* {selectedPool.applicationsCount} */}
            </div>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pool Funders</CardTitle>
            <HandCoins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{"-"}</div>
          </CardContent>
        </Card>
        <Card className="gap-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Voters</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{"-"}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Info className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="funds" className="flex items-center gap-2">
            <Coins className="h-4 w-4" />
            Pool Funds
          </TabsTrigger>
          <TabsTrigger value="applications" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Applications
          </TabsTrigger>
          <TabsTrigger value="distribution" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Distribution
          </TabsTrigger>
          <TabsTrigger value="voters" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Voters
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="space-y-4">
          <PoolDetails pool={pool} />
        </TabsContent>
        <TabsContent value="funds" className="space-y-4">
          <PoolFunds pool={selectedPool} />
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <PoolApplications pool={selectedPool} />
        </TabsContent>
        <TabsContent value="distribution" className="space-y-4">
          <PoolDistribution pool={selectedPool} />
        </TabsContent>
        <TabsContent value="voters" className="space-y-4">
          <PoolVoters pool={selectedPool} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Skeleton() {
  return <div className="aspect-video rounded-xl bg-muted/50" />;
}
