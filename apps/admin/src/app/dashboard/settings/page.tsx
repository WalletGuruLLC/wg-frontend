"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import {
  ArrowRightLeft,
  FileCheck,
  FileText,
  KeySquare,
  Shuffle,
  Wallet,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  useForm,
} from "@wg-frontend/ui/form";

import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import {
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
  useGetProviderKeysQuery,
  useGetSettingQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import {
  privacyPolicyValidator,
  termsAndConditionsValidator,
  walletRootValidator,
} from "~/lib/validators";
import Dialog from "../_components/dashboard-dialog";
import { FormLabel } from "../_components/dashboard-form";
import { Input } from "../_components/dashboard-input";
import { SimpleTitle } from "../_components/dashboard-title";

export default function SettingsPage() {
  const userData = useGetAuthedUserInfoQuery(undefined);
  const loading = useAccessLevelGuard({
    general: {
      module: "settings",
    },
  });
  const { values } = useI18n();
  const { data: title, isLoading: isLoadingTitle } =
    useGetDashboardUsersTitleQuery(undefined);

  if (loading) return null;

  if (userData.data?.type === "PROVIDER") {
    return (
      <div className="flex h-[83vh] flex-col space-y-10 pb-4">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.settings.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />
        <div className="flex w-full">
          <Link
            href={`/dashboard/settings/payment-parameters`}
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
  } else
    return (
      <div className="flex h-[83vh] flex-col space-y-10 pb-4">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.settings.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />
        <div className="flex w-full flex-wrap">
          <TermsAndConditionsDialog
            trigger={
              <div className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <FileText size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.terms-and-conditions"]}
                </span>
              </div>
            }
          />
          <PrivacyPolicyDialog
            trigger={
              <div className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <FileCheck size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.privacy-policy"]}
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
          <WalletRootDialog
            trigger={
              <div className="m-3 flex h-[200px] flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <Wallet size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.wallet-root"]}
                </span>
              </div>
            }
          />
        </div>
      </div>
    );
}

function TermsAndConditionsDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const { data: termConditionsSetting } = useGetSettingQuery({
    key: "terms-condition",
  });
  const form = useForm({
    schema: termsAndConditionsValidator,
    defaultValues: {
      termsAndConditionsLink: String(termConditionsSetting?.value),
    },
  });
  useEffect(() => {
    if (termConditionsSetting) {
      form.reset({
        termsAndConditionsLink: termConditionsSetting.value,
      });
    }
  }, [termConditionsSetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="terms-and-conditions-dialog"
    >
      <div className="space-y-9 p-3">
        <h1 className="text-3xl font-light">
          {values[`dashboard.settings.terms-and-conditions.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="termsAndConditionsLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`dashboard.settings.terms-and-conditions.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="h-12 w-full" onClick={toggle}>
              {values["dashboard.settings.terms-and-conditions.save"]}
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

function PrivacyPolicyDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const { data: privacySetting } = useGetSettingQuery({
    key: "privacy-police",
  });
  const form = useForm({
    schema: privacyPolicyValidator,
    defaultValues: {
      privacyPolicyLink: privacySetting?.value,
    },
  });
  useEffect(() => {
    if (privacySetting) {
      form.reset({
        privacyPolicyLink: privacySetting.value,
      });
    }
  }, [privacySetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="privacy-policy-dialog"
    >
      <div className="space-y-9 p-3">
        <h1 className="text-3xl font-light">
          {values[`dashboard.settings.privacy-policy.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="privacyPolicyLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`dashboard.settings.privacy-policy.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="h-12 w-full" onClick={toggle}>
              {values["dashboard.settings.privacy-policy.save"]}
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

function WalletRootDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, _close, toggle] = useBooleanHandlers();
  const { data: walletSetting } = useGetSettingQuery({
    key: "url-wallet",
  });
  const form = useForm({
    schema: walletRootValidator,
    defaultValues: {
      walletRootLink: walletSetting?.value,
    },
  });
  useEffect(() => {
    if (walletSetting) {
      form.reset({
        walletRootLink: walletSetting.value,
      });
    }
  }, [walletSetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        toggle();
      }}
      trigger={props.trigger}
      ariaDescribedBy="wallet-root-dialog"
    >
      <div className="space-y-9 p-3">
        <h1 className="text-3xl font-light">
          {values[`dashboard.settings.wallet-root.title`]}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => console.log(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="walletRootLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {values[`dashboard.settings.wallet-root.label`]}
                  </FormLabel>
                  <FormControl>
                    <Input required {...field} />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm font-normal">
                    {values["dashboard.settings.wallet-root.information.label"]}
                  </p>
                </FormItem>
              )}
            />

            <Button className="h-12 w-full" onClick={toggle}>
              {values["dashboard.settings.wallet-root.save"]}
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
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
