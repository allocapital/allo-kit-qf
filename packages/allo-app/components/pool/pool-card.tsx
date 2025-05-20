"use client";

import Link from "next/link";
import { ComponentProps } from "react";

import { cn } from "~/lib/utils";
import { Pool } from "~/schemas/pool";
import { BackgroundImage } from "../background-image";
import { EnsName } from "../ens";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";

export function PoolCard({
  isLoading,
  ...pool
}: Pool & {
  isLoading?: boolean;
} & ComponentProps<"button">) {
  if (isLoading)
    return (
      <div className="aspect-video rounded-xl bg-muted/50 animate-pulse" />
    );
  return (
    <Link href={`/app/pools/${pool?.address}`} prefetch>
      <Card
        className={cn(
          "pt-0 shadow-none aspect-video hover:opacity-90 transition-opacity relative",
          {
            ["animate-pulse"]: isLoading,
          }
        )}
      >
        <Badge className="absolute top-2 right-2">{pool?.strategy?.name}</Badge>
        <BackgroundImage
          src={pool?.metadata?.image}
          className="size-16 bg-gray-200 rounded-xl h-16"
        />
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">{pool?.metadata?.title}</CardTitle>
          <div className="flex gap-1 items-center">
            <Badge variant="outline">Optimism</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p>{pool?.metadata?.description}</p>
          <Separator className="my-4" />
          <div className="flex gap-1 items-end">
            <div className="text-lg font-bold">$50,000</div>
            <div className="text-sm pb-0.5">USDC</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
