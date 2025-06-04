"use client";

import { IndexerQuery } from "~/hooks/use-indexer";
import { Grid } from "../grid";
import { useRegistrations } from "./use-register";
import { ApproveItem } from "./approve-item";

export function ApplicationsList({ query }: { query: IndexerQuery }) {
  const { data, error, isPending } = useRegistrations(query);
  return (
    <Grid
      columns={[1]}
      data={data?.items}
      error={error}
      isPending={isPending}
      renderItem={(application) => (
        <ApproveItem
          {...application}
          key={application.address ?? application.id}
        />
      )}
    />
  );
}
