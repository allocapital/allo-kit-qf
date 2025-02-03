"use client";
import { Page } from "~/components/page";
import { useStrategies } from "~/components/strategy/use-strategy";
import { Grid } from "~/components/grid";

export default function Strategies() {
  const { data, error, isPending } = useStrategies({});
  console.log(data);
  return (
    <Page title="Strategies">
      <Grid
        columns={[1]}
        data={data?.items}
        error={error}
        isPending={isPending}
        renderItem={(strategy) => (
          <div key={strategy.id} className="border-b py-2">
            <h3 className="">{strategy.name}</h3>
          </div>
        )}
      />
    </Page>
  );
}
