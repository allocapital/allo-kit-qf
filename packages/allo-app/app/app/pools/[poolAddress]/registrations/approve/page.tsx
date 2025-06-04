"use client";
import { Page } from "~/components/page";
import { ApplicationsList } from "~/components/registration/applications-list";
import { useContracts } from "~/hooks/use-contracts";

export default function RegistrationApprovePage() {
  const { SimpleGrants } = useContracts();

  return (
    <Page title="Approve Projects">
      <ApplicationsList
        query={{
          limit: 100,
          where: {
            strategy_in: [SimpleGrants?.address],
            // isApproved: false,
          },
        }}
      />
    </Page>
  );
}
