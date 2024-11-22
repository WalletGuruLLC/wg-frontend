"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRightLeft, KeySquare, Shuffle } from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";

import {
  useGetDashboardUsersTitleQuery,
  useGetProviderKeysQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import Dialog from "../../_components/dashboard-dialog";
import { SimpleTitle } from "../../_components/dashboard-title";

export default function ReservedFundsPage() {
  const loading = useAccessLevelGuard({
    general: {
      module: "settings", // DUDA
    },
  });
  const { values } = useI18n();
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);

  if (loading) return null;

  return (
    <div className="flex h-[83vh] flex-col space-y-10 pb-4">
      <SimpleTitle
        title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
        showLoadingIndicator={isLoadingTitle}
      />
      <div className="flex w-full">
        <Link
          href={`/dashboard/reports/created-by-user`}
          className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <ArrowRightLeft size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["service-providers.settings.sections.payment-parameters"]}
          </span>
        </Link>
        <KeyDialog
          trigger={
            <div className="m-3 flex h-[200px] flex-1 cursor-pointer flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
              <KeySquare size={32} strokeWidth={0.75} color="#3678B1" />
              <span className="text-2xl">
                {values["service-providers.settings.sections.key"]}
              </span>
            </div>
          }
        />
        <Link
          href={`/dashboard/settings/exchange-rates`}
          className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <Shuffle size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["service-providers.settings.sections.exchange-rates"]}
          </span>
        </Link>
      </div>
    </div>
  );
}

function KeyDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const { data: keys, isLoading } = useGetProviderKeysQuery(undefined);

  if (isLoading) return null;
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="key-dialog"
    >
      <div className="space-y-9 p-3">
        <h1 className="text-3xl font-light">
          {values[`service-providers.settings.key.dialog.title`]}
        </h1>

        <div className="columns-sm">
          <p></p>
          {values[`service-providers.settings.key.dialog.secretKey.label`]}
          <span className="mb-4">
            {keys?.secretKey
              ? keys.secretKey
              : values[`service-providers.settings.key.dialog.no-key`]}
          </span>
          <br />
          {values[`service-providers.settings.key.dialog.publicKey.label`]}
          <span>
            {keys?.publicKey
              ? keys.publicKey
              : values[`service-providers.settings.key.dialog.no-key`]}
          </span>
        </div>
      </div>
    </Dialog>
  );
}
