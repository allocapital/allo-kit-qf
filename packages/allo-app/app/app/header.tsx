"use client";

import { Search, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { ConnectButton } from "~/components/connect-button";
import { FaucetButton } from "~/components/faucet-button";
import { Logo } from "~/components/logo";
import { NetworkSelector } from "~/components/network-selector";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";

export function Header() {
  return (
    <div className="border-b">
      <header className="max-w-screen-xl mx-auto flex items-center justify-between p-2">
        <Logo href="/" />
        <div className="flex items-center">
          <NavLink href="/app/pools">Pools</NavLink>
          <NavLink href="/app/checkout">Checkout</NavLink>
          {/* <NavLink href="/app/strategies">Strategies</NavLink> */}
        </div>
        <div className="flex items-center gap-1">
          {/* <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-8"
            />
          </div> */}
          {/* 
        <ConnectButton />
        <FaucetButton /> */}
          {/* 
          <div>
            <Link href="/app/checkout" prefetch>
              <Button icon={ShoppingBag} variant={"ghost"} size="icon" />
            </Link>
          </div> */}
          {/* <NetworkSelector /> */}
          <ConnectButton />
          <FaucetButton />
        </div>
      </header>
    </div>
  );
}

function NavLink({ href, children }: { href: string; children: string }) {
  const segment = useSelectedLayoutSegment();
  const isActive =
    href === "/" ? segment === null : href.substring(1) === segment;

  return (
    <Link href={href} passHref prefetch>
      <Button
        variant={"link"}
        size="lg"
        className={cn({ ["underline"]: isActive })}
      >
        {children}
      </Button>
    </Link>
  );
}
