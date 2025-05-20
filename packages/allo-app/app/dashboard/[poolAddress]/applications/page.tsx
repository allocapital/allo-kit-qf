import { ApplicationsList } from "~/components/registration/applications-list";

export default function DashboardApplicationsPage() {
  return (
    <div>
      <ApplicationsList
        query={
          {
            // where: {
            //   strategy_in: [],
            // },
          }
        }
      />
    </div>
  );
}
