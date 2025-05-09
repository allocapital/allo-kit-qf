"use client";

import { Registration } from "~/schemas";
import { EnsName } from "../ens";
import { BackgroundImage } from "../background-image";
import Link from "next/link";

export function AllocationItem({
  address,
  metadata,
  actions,
}: Registration & {
  actions?: React.ReactNode;
}) {
  return (
    <div className="relative sm:flex p-2 rounded">
      <div className="flex flex-1 items-center gap-2 pt-2">
        <BackgroundImage
          src={metadata?.image}
          className="size-10 bg-gray-100"
        />
        <div className="flex-1">
          <Link href={`/project/${address}`} tabIndex={-1}>
            <h3 className="hover:underline">{metadata?.title}</h3>
          </Link>
          <code className="text-xs">
            <Link
              tabIndex={-1}
              href={`/donations?from=${address}`}
              className="hover:underline"
            >
              <EnsName address={address} />
            </Link>
          </code>
        </div>
      </div>
      {actions}
    </div>
  );
}
