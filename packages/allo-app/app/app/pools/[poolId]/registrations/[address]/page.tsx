"use client";

import { Address } from "viem";

import { useParams, useRouter } from "next/navigation";
import { BackgroundImage } from "~/components/background-image";
import { Page } from "~/components/page";
import { Button } from "~/components/ui/button";

import { useCart } from "~/components/cart/use-cart";
import { useProjectById } from "~/components/registration/use-register";
import { AllocationsTable } from "~/components/allocation/allocations-table";
import { Markdown } from "~/components/markdown";
import { ApprovedBadge } from "~/components/registration/approved-badge";

export default function RegistrationDetailsPage() {
  const params = useParams();
  const address = params.address as Address;
  const cart = useCart();
  const router = useRouter();
  const { data: project } = useProjectById(address);

  return (
    <Page
      title={
        <div className="flex gap-2 items-center">
          {project?.metadata?.title!}{" "}
          <ApprovedBadge isApproved={project?.isApproved} />
        </div>
      }
      actions={
        <div className="flex gap-1">
          <Button
            onClick={() => {
              cart.set(project?.id!, cart.items[project?.id!] || 1);
              router.push(`/app/pools/${params.poolId}/checkout`);
            }}
          >
            Add To Cart
          </Button>
        </div>
      }
    >
      <BackgroundImage
        src={project?.metadata.image}
        className="h-40 bg-gray-200"
      />
      <div className="py-8">
        <Markdown>{project?.metadata.description}</Markdown>
      </div>

      <h3 className=" font-semibold">Allocations</h3>
      <AllocationsTable
        query={{
          orderBy: "createdAt",
          orderDirection: "desc",
          where: { to_in: [address] },
        }}
      />
    </Page>
  );
}
