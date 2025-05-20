"use client";

import { IndexerQuery } from "~/hooks/use-indexer";
import { Grid } from "../grid";
// import { PoolCard } from "./pool-card";
import { usePools } from "./use-pool";
import { PoolCard } from "./pool-card";

export function PoolList({ query }: { query: IndexerQuery }) {
  const { data, error, isPending } = usePools(query);

  return (
    <Grid
      columns={[1, 2, 2, 3]}
      data={data?.items}
      error={error}
      isPending={isPending}
      renderItem={(pool) => {
        return <PoolCard {...pool} key={pool.address ?? pool.id} />;
      }}
    />
  );
}
