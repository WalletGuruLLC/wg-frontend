"use client";

import Link from "next/link";
import { ArrowRightLeft, Calendar, DollarSign, User } from "lucide-react";

import {
  useGetAuthedUserInfoQuery,
  useGetDashboardUsersTitleQuery,
} from "~/lib/data-access";
import { useAccessLevelGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { SimpleTitle } from "../_components/dashboard-title";

export default function ReportsPage() {
  const userData = useGetAuthedUserInfoQuery(undefined);
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
      <div className="flex h-[83vh] flex-col space-y-10 pb-4">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />
        {/*
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
        */}
      </div>
    );
  } else
    return (
      <div className="flex h-[83vh] flex-col space-y-10 pb-4">
        <SimpleTitle
          title={`${title ?? ""} ${values["dashboard.reports.title"]}`}
          showLoadingIndicator={isLoadingTitle}
        />

        <div className="flex w-full flex-wrap">
          {/* 
          <TermsAndConditionsDialog
            trigger={
              <div className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <FileText size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.terms-and-conditions"]}
                </span>
              </div>
            }
          />
          <PrivacyPolicyDialog
            trigger={
              <div className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <FileCheck size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.privacy-policy"]}
                </span>
              </div>
            }
          />

          <Link
            href={`/dashboard/settings/exchange-rates`}
            className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
          >
            <Shuffle size={32} strokeWidth={0.75} color="#3678B1" />
            <span className="text-2xl">
              {values["service-providers.settings.sections.exchange-rates"]}
            </span>
          </Link>
          <WalletRootDialog
            trigger={
              <div className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center">
                <Wallet size={32} strokeWidth={0.75} color="#3678B1" />
                <span className="text-2xl">
                  {values["dashboard.settings.wallet-root"]}
                </span>
              </div>
            }
          />
          */}
        </div>
      </div>
    );
}
/*
function TermsAndConditionsDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const errors = useErrors();
  const settingId = "SWG001";
  const settingKey = "terms-condition";
  const { data: termConditionsSetting } = useGetSettingQuery({
    key: settingKey,
  });
  const form = useForm({
    schema: settingsValidator,
    defaultValues: {
      value: String(termConditionsSetting?.value),
    },
  });
  const { mutate, isPending } = useEditSettingMutation(settingId, settingKey, {
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(
        values[`dashboard.settings.term-conditions.dialog.toast.success`],
      );
      close();
    },
  });

  useEffect(() => {
    if (termConditionsSetting) {
      form.reset({
        value: termConditionsSetting.value,
      });
    }
  }, [termConditionsSetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        form.reset();
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
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="value"
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
            <Button className="h-12 w-full" type="submit" disabled={isPending}>
              {
                values[
                  isPending
                    ? "loading"
                    : `dashboard.settings.terms-and-conditions.save`
                ]
              }
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

function PrivacyPolicyDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const errors = useErrors();
  const settingId = "SWG002";
  const settingKey = "privacy-police";
  const { data: privacySetting } = useGetSettingQuery({
    key: settingKey,
  });
  const form = useForm({
    schema: settingsValidator,
    defaultValues: {
      value: String(privacySetting?.value),
    },
  });
  const { mutate, isPending } = useEditSettingMutation(settingId, settingKey, {
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(
        values[`dashboard.settings.privacy-policy.dialog.toast.success`],
      );
      close();
    },
  });
  useEffect(() => {
    if (privacySetting) {
      form.reset({
        value: privacySetting.value,
      });
    }
  }, [privacySetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        form.reset();
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
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="value"
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
            <Button className="h-12 w-full" type="submit" disabled={isPending}>
              {
                values[
                  isPending
                    ? "loading"
                    : `dashboard.settings.privacy-policy.save`
                ]
              }
            </Button>
          </form>
        </Form>
      </div>
    </Dialog>
  );
}

function WalletRootDialog(props: { trigger: ReactNode }) {
  const { values } = useI18n();
  const [isOpen, _, close, toggle] = useBooleanHandlers();
  const errors = useErrors();
  const settingId = "SWG003";
  const settingKey = "url-wallet";
  const { data: walletSetting } = useGetSettingQuery({
    key: settingKey,
  });
  const form = useForm({
    schema: settingsValidator,
    defaultValues: {
      value: String(walletSetting?.value),
    },
  });
  const { mutate, isPending } = useEditSettingMutation(settingId, settingKey, {
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      toast.success(
        values[`dashboard.settings.wallet-root.dialog.toast.success`],
      );
      close();
    },
  });
  useEffect(() => {
    if (walletSetting) {
      form.reset({
        value: walletSetting.value,
      });
    }
  }, [walletSetting, form]);
  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={() => {
        form.reset();
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
            onSubmit={form.handleSubmit((data) => mutate(data))}
            className="space-y-9"
          >
            <FormField
              control={form.control}
              name="value"
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
            <Button className="h-12 w-full" type="submit" disabled={isPending}>
              {
                values[
                  isPending ? "loading" : `dashboard.settings.wallet-root.save`
                ]
              }
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
  */
("use client");

export default function ServiceProviderPage() {
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
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <User size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.transactions-by-user"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/created-by-provider`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <Calendar size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.transactions-by-provider"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/revenue`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <DollarSign size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.revenue"]}
          </span>
        </Link>
        <Link
          href={`/dashboard/reports/clear-payments`}
          className="m-3 flex h-[200px] min-w-60 flex-1 flex-col items-center justify-center space-y-3 rounded-2xl bg-[#F5F5F5] text-center"
        >
          <ArrowRightLeft size={32} strokeWidth={0.75} color="#3678B1" />
          <span className="text-2xl">
            {values["dashboard.reports.sections.clear-payments"]}
          </span>
        </Link>
      </div>
    </div>
  );
}
