"use client";
import Link from "next/link";
import { Page } from "~/components/page";
import { PoolDashboard } from "~/components/pool/pool-dashboard";
import { useParams } from "next/navigation";
import { Address } from "viem";

export default function DashboardPoolPage() {
  const { poolAddress } = useParams();
  return (
    <Page
      title="Dashboard"
      description="Manage your funding pools and view detailed information."
    >
      <PoolDashboard poolAddress={poolAddress as Address} />
      {/* <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Link href="/dashboard/pools/1" key={index}>
            <PoolCardSkeleton key={index} />
          </Link>
        ))}
      </div> */}
    </Page>
  );
}

function PoolCardSkeleton() {
  return <div className="aspect-video rounded-xl bg-muted/50" />;
}
