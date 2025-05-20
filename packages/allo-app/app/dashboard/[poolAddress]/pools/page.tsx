import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Page } from "~/components/page";
import { Button } from "~/components/ui/button";
import { PoolFilter } from "./_components/pool-filter";
import { PoolExplorer } from "./_components/pool-explorer";
import { PoolList } from "~/components/pool/pool-list";
export default function Pools() {
  return (
    <Page
      title="Pools"
      description="Browse and discover funding pools"
      actions={
        <Link href="/dashboard/pools/create" prefetch>
          <Button icon={PlusIcon}>Create New Pool</Button>
        </Link>
      }
    >
      <PoolFilter />
      <PoolList query={{}} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Link href="/dashboard/pools/1" key={index}>
            <PoolCardSkeleton key={index} />
          </Link>
        ))}
      </div>
    </Page>
  );
}

function PoolCardSkeleton() {
  return <div className="aspect-video rounded-xl bg-muted/50" />;
}
