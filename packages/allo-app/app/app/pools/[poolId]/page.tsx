"use client";

import { Address } from "viem";

import { useParams, useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { BackgroundImage } from "~/components/background-image";
import { Badge } from "~/components/ui/badge";
import { Page } from "~/components/page";
import { Button } from "~/components/ui/button";

import { useCart } from "~/components/cart/use-cart";
import { usePoolById } from "~/components/pool/use-pool";
import { AllocationsTable } from "~/components/allocation/allocations-table";
import { Markdown } from "~/components/markdown";
import { ProjectsList } from "~/components/registration/projects-list";
import Link from "next/link";
import { NetworkBadge } from "~/components/network-badge";
function PoolActions({ poolId }: { poolId: Address }) {
  return (
    <div className="flex gap-1 items-center">
      <Link prefetch href={`/app/pools/${poolId}/apply`}>
        <Button>Apply to Pool</Button>
      </Link>
      <Link prefetch href={`/dashboard/pools/${poolId}`}>
        <Button variant="outline" icon={Pencil}>
          Manage Pool
        </Button>
      </Link>
    </div>
  );
}

export default function PoolDetailsPage() {
  const params = useParams();
  const poolId = params.poolId as Address;
  const cart = useCart();
  const router = useRouter();
  // const pool = { metadata: { title: "Pool title" } };
  const { data: pool } = usePoolById(poolId);

  return (
    <Page
      title={
        <div className="flex gap-2 items-center">{pool?.metadata.title}</div>
      }
      actions={<PoolActions poolId={poolId} />}
    >
      <div className="flex gap-2 items-center mb-2">
        <NetworkBadge chainId={pool?.chainId} />
        <Badge variant="outline">{pool?.strategy.name}</Badge>
      </div>
      <BackgroundImage
        src={pool?.metadata.image}
        className="min-h-48 bg-gray-200"
      />
      <div className="py-8">
        <Markdown className="">{pool?.metadata.description}</Markdown>
      </div>

      <h3 className=" font-semibold">Projects</h3>
      <ProjectsList
        query={{
          where: { pool_in: [poolId] },
        }}
      />
    </Page>
  );
}

function ApprovedBadge({ isApproved }: { isApproved?: boolean }) {
  return typeof isApproved === "undefined" ? null : (
    <Badge variant={isApproved ? "success" : "outline"}>
      {isApproved ? "Approved" : "Pending"}
    </Badge>
  );
}
