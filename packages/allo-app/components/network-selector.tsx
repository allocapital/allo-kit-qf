"use client";

import { useEffect } from "react";
import { useChainId, useSwitchChain } from "wagmi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { chains } from "~/config";
import { useCurrentChainName, useSetNetwork } from "~/hooks/use-current-chain";

export function NetworkSelector() {
  const network = useCurrentChainName();
  const setNetwork = useSetNetwork();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();

  // Switch network in wallet
  useEffect(() => {
    const currentChainId = chains[network as string]?.id;
    if (currentChainId && currentChainId !== chainId) {
      switchChain({ chainId: currentChainId });
    }
  }, [network, chainId]);

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <div className="space-y-2">
        <Select
          value={String(network)}
          onValueChange={(value) => setNetwork(value)}
        >
          <SelectTrigger id="network-select" className="w-full">
            <SelectValue placeholder="Choose Network" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(chains).map(([name, network]) => (
              <SelectItem key={name} value={name}>
                {network.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
