"use client";

import * as React from "react";
import {
  BarChartIcon,
  Check,
  ChevronsUpDown,
  Coins,
  Home,
  ListTodo,
  Plus,
  SettingsIcon,
  ShieldUser,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";
import { Logo } from "~/components/logo";
import { NavItem } from "~/components/sidebar/nav-item";
import { usePools } from "~/components/pool/use-pool";
import { useAccount } from "wagmi";
import { cn } from "~/lib/utils";
import { Address } from "viem";
import { BackgroundImage } from "~/components/background-image";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useSidebar } from "~/components/ui/sidebar";
import { Pool } from "~/schemas/pool";
import Link from "next/link";
import { NetworkSelector } from "~/components/network-selector";
import { useRouter, useParams } from "next/navigation";

const menu = {
  sections: [
    {
      name: "",
      items: [
        {
          title: "Dashboard",
          href: "",
          icon: Home,
        },
        {
          title: "Applications",
          href: "/applications",
          icon: ListTodo,
        },
        {
          title: "Pool Funds",
          href: "/funds",
          icon: Coins,
        },
        {
          title: "Voters",
          href: "/voters",
          icon: ShieldUser,
        },
        {
          title: "Team",
          href: "/team",
          icon: Users,
        },
        {
          title: "Settings",
          href: "/settings",
          icon: SettingsIcon,
        },
      ],
    },
  ],
};

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { poolAddress } = useParams();
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Logo href="/" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <PoolSwitcher />
          </SidebarGroupContent>
        </SidebarGroup>
        {menu.sections.map((section) => (
          <SidebarGroup key={section.name}>
            <SidebarGroupContent className="flex flex-col gap-2">
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <NavItem
                      {...item}
                      href={`/dashboard/${poolAddress}/${item.href}`}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NetworkSelector />
      </SidebarFooter>
    </Sidebar>
  );
}

export function PoolSwitcher() {
  const { address } = useAccount();
  const { poolAddress } = useParams();
  const router = useRouter();
  const { data: pools } = usePools(
    { where: { owner_in: [address as Address] } },
    { enabled: Boolean(address) }
  );

  const activePool = pools?.items?.find((pool) => pool.address === poolAddress);
  const { isMobile } = useSidebar();
  // const [activePool, setActivePool] = React.useState<Pool | null>(null);

  // const activePool = pools?.items?.[0];
  // if (!activePool) {
  //   return null;
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <BackgroundImage
                src={activePool?.metadata?.image}
                className="size-8 bg-gray-300 rounded-lg aspect-square"
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {activePool?.metadata?.title ?? "Select a pool"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Pools
            </DropdownMenuLabel>
            {pools?.items?.map((pool, index) => (
              <DropdownMenuItem
                key={pool.address}
                onClick={() => {
                  router.push(`/dashboard/${pool.address}`);
                }}
                className="gap-2 p-2"
              >
                <BackgroundImage
                  src={pool.metadata?.image}
                  className="size-6 bg-gray-300 rounded aspect-square"
                />

                {pool.metadata?.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <Link href="/dashboard/create-pool">
              <DropdownMenuItem className="gap-2 p-2">
                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                  <Plus className="size-4" />
                </div>
                <div className="font-medium text-muted-foreground">
                  Create new pool
                </div>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
