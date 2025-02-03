"use client";

import { useIndexer, IndexerQuery } from "~/hooks/use-indexer";
import { Strategy } from "~/schemas";
import { STRATEGIES_QUERY } from "./queries";

export function useStrategies(variables: IndexerQuery) {
  return useIndexer<Strategy>({
    queryKey: ["strategies", variables],
    variables,
    query: STRATEGIES_QUERY,
    queryFn: async (r) => r.strategys,
  });
}
