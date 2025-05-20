"use client";

import { POOLS_SCHEMA } from "~/queries";
import { IndexerQuery, useIndexer } from "~/hooks/use-indexer";
import { Pool } from "~/schemas/pool";
import { Address } from "viem";

export function usePools(
  variables: IndexerQuery,
  { enabled }: { enabled?: boolean } = {}
) {
  return useIndexer<Pool>({
    queryKey: ["pools", variables],
    variables,
    query: POOLS_SCHEMA,
    queryFn: async (r) => r?.pools,
    enabled,
  });
}
export function usePoolById(address: Address) {
  const { data, ...rest } = usePools({ where: { address_in: [address] } });
  return { ...rest, data: data?.items?.[0] };
}
