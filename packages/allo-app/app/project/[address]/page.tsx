"use client";

import { Address } from "viem";

import { useParams, useRouter } from "next/navigation";
import { BackgroundImage } from "~/components/background-image";
import { Badge } from "~/components/ui/badge";
import { Page } from "~/components/page";
import { Button } from "~/components/ui/button";

import { useCart } from "~/components/cart/use-cart";
import { useProjectById } from "~/components/registration/use-register";
import { AllocationsTable } from "~/components/allocation/allocations-table";
import { Markdown } from "~/components/markdown";

export default function ProjectDetailsPage() {
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
              cart.set(address, cart.items[address] || 1);
              router.push("/checkout");
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

function ApprovedBadge({ isApproved }: { isApproved?: boolean }) {
  return typeof isApproved === "undefined" ? null : (
    <Badge variant={isApproved ? "success" : "outline"}>
      {isApproved ? "Approved" : "Pending"}
    </Badge>
  );
}
