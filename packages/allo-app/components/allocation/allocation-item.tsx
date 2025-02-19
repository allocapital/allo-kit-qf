"use client";

import { Registration } from "~/schemas";
import { EnsName } from "../ens";
import { BackgroundImage } from "../background-image";

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
          <h3 className="">{metadata?.title}</h3>
          <code className="text-xs">
            <EnsName address={address} />
          </code>
        </div>
      </div>
      {actions}
    </div>
  );
}
