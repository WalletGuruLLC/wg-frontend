"use client";

import { BreadcrumbTitle } from "../../_components/dashboard-title";

export default function userDetailsPage() {
  return (
    <div>
      <BreadcrumbTitle
        sections={[
          {
            title: "<",
            href: "/dashboard/wallet-users",
            isLoading: false,
          },
        ]}
      />
      userDetailsPage
    </div>
  );
}
