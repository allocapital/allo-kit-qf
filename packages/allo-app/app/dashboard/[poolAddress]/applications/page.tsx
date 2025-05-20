"use client";
import { useParams } from "next/navigation";
import { Address } from "viem";
import { Page } from "~/components/page";
import { ApplicationsList } from "~/components/registration/applications-list";

export default function DashboardApplicationsPage() {
  const { poolAddress } = useParams();
  return (
    <Page title={`Applications`}>
      <ApplicationsList
        query={{
          where: {
            pool_in: [poolAddress as Address],
          },
        }}
      />
    </Page>
  );
}
