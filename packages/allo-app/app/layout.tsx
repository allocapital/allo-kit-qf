import "@rainbow-me/rainbowkit/styles.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ConnectButton } from "~/components/connect-button";
import Link from "next/link";
import { Toaster } from "~/components/ui/toaster";
import { Button } from "~/components/ui/button";
import { FaucetButton } from "~/components/faucet-button";
import { NetworkSelector } from "~/components/network-selector";

import { SidebarProvider, SidebarTrigger } from "~/components/ui/sidebar";
import { AppSidebar } from "~/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allo App",
  description: "Generated by Scaffold-Eth-2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              <header className="p-2 items-center flex justify-between border-b">
                <SidebarTrigger />

                <div className="flex gap-1">
                  <ConnectButton />
                  <FaucetButton />
                </div>
              </header>
              {/* 
              <header className="p-2 items-center flex justify-between border-b">
                <div className="flex items-center">
                  <div className="text-sm font-bold tracking-wider mr-12">
                    AlloKit
                  </div>
                  <Link href="/">
                    <Button variant={"link"}>Discover Projects</Button>
                  </Link>
                  <Link href="/project/create">
                    <Button variant={"link"}>Register Project</Button>
                  </Link>

                  <Link href="/checkout">
                    <Button variant={"link"}>Checkout</Button>
                  </Link>
                  <Link href="/distribute">
                    <Button variant={"link"}>Quadratic Funding</Button>
                  </Link>
                </div>
                <div className="flex gap-1">
                  <NetworkSelector />
                  <ConnectButton />
                  <FaucetButton />
                </div>
              </header> */}
              <div className="p-2">{children}</div>
            </main>
          </SidebarProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
