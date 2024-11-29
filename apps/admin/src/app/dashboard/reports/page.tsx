"use client";

import Link from "next/link";
import {
  Calendar,
  DollarSign,
  FileText,
  Landmark,
  TrendingUp,
  Users,
} from "lucide-react";

import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { SimpleTitle } from "../_components/dashboard-title";

export default function ReportsPage() {
  const userData = useGetAuthedUserInfoQuery(undefined);
  const { data: accessLevelData } =
    useGetAuthedUserAccessLevelsQuery(undefined);

  const loading = useAccessLevelGuard({
    general: {
      module: "reports",
    },
  });
  const { values } = useI18n();
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);

  if (loading) return null;

  if (userData.data?.type === "PROVIDER") {
    return (
      <div className="flex w-full flex-wrap">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />
        <div className="grid h-full w-full grid-cols-4 gap-4">
          {accessLevelData?.general.transactionsByUser.includes("view") && (
            <Link
              href={`/dashboard/reports/transactions-by-user`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <Users size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.transactions-by-user"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.transactionsByProvider.includes("view") && (
            <Link
              href={`/dashboard/reports/transactions-by-provider`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <Calendar size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.transactions-by-provider"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.fees.includes("view") && (
            <Link
              href={`/dashboard/reports/fee`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <DollarSign size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.fee"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.paymentSummary.includes("view") && (
            <Link
              href={`/dashboard/reports/payments-summary`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <Landmark size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.paymentSummary"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.refunds.includes("view") && (
            <Link
              href={`/dashboard/reports/refunds`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <FileText size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.refunds"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.reservedFunds.includes("view") && (
            <Link
              href={`/dashboard/reports/reserved-funds`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <TrendingUp size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.reservedFunds"]}
              </span>
            </Link>
          )}
        </div>
      </div>
    );
  } else
    return (
      <div className="flex w-full flex-wrap">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />
        <div className="grid h-full w-full grid-cols-4 gap-4">
          {accessLevelData?.general.transactionsByUser.includes("view") && (
            <Link
              href={`/dashboard/reports/transactions-by-user`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <Users size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.transactions-by-user"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.transactionsByProvider.includes("view") && (
            <Link
              href={`/dashboard/reports/transactions-by-provider`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <Calendar size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.transactions-by-provider"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.revenue.includes("view") && (
            <Link
              href={`/dashboard/reports/revenue`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <DollarSign size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.revenue"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.clearPayments.includes("view") && (
            <Link
              href={`/dashboard/reports/clear-payments`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <TrendingUp size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.clear-payments"]}
              </span>
            </Link>
          )}
          {accessLevelData?.general.disputes.includes("view") && (
            <Link
              href={`/dashboard/reports/disputes`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <FileText size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.disputes"]}
              </span>
            </Link>
          )}{" "}
          {accessLevelData?.general.reservedFunds.includes("view") && (
            <Link
              href={`/dashboard/reports/reserved-funds`}
              className="flex h-[200px] flex-col items-center justify-center rounded-2xl bg-[#F5F5F5] p-2 text-center"
            >
              <TrendingUp size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["dashboard.reports.sections.reservedFunds"]}
              </span>
            </Link>
          )}
        </div>
      </div>
    );
}
