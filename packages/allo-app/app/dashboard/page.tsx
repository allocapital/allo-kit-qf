import Link from "next/link";
import { Page } from "~/components/page";

export default function DashboardPage() {
  return (
    <Page title="Dashboard">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
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
