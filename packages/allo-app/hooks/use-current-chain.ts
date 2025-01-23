"use client";
import { defaultChain } from "~/config";
import { createGlobalState } from "./use-global-state";

const useNetworkState = createGlobalState<string>(
  global.localStorage?.getItem("network") ?? defaultChain
);

export function useCurrentChainName() {
  const [network] = useNetworkState();
  return network ?? defaultChain;
}

export function useSetNetwork() {
  const [, set] = useNetworkState();
  return (network: string) => {
    set(network);
    global.localStorage?.setItem("network", network);
  };
}
