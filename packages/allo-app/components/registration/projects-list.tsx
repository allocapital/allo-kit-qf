"use client";

import { useCart } from "~/components/cart/use-cart";
import { IndexerQuery } from "~/hooks/use-indexer";
import { Grid } from "../grid";
import { RegistrationCard } from "./registration-card";
import { useProjects } from "./use-register";

export function ProjectsList({ query }: { query: IndexerQuery }) {
  const cart = useCart();
  const { data, error, isPending } = useProjects(query);

  console.log(cart);
  return (
    <Grid
      columns={[1, 2, 3, 4]}
      data={data?.items}
      error={error}
      isPending={isPending}
      renderItem={(project) => (
        <RegistrationCard
          {...project}
          key={project.id}
          inCart={cart.contains(project.address)}
          onSelect={() =>
            cart.contains(project.address)
              ? cart.remove(project.address)
              : cart.set(project.address, 1)
          }
        />
      )}
    />
  );
}
