"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  HandCoins,
  HeartPulse,
  Home,
  Loader,
  Loader2,
  LogOut,
  Menu,
  RectangleEllipsis,
  Settings,
  SquareUserRound,
  Upload,
  User,
  Users,
  Wallet,
  HeartPulse,
} from "lucide-react";

import { useBooleanHandlers } from "@wg-frontend/hooks/use-boolean-handlers";
import { cn } from "@wg-frontend/ui";
import { Avatar, AvatarFallback, AvatarImage } from "@wg-frontend/ui/avatar";
import { Form, FormField, useForm } from "@wg-frontend/ui/form";
import { Label } from "@wg-frontend/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@wg-frontend/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@wg-frontend/ui/select";
import { Separator } from "@wg-frontend/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@wg-frontend/ui/sheet";
import { toast } from "@wg-frontend/ui/toast";

import type { ModuleId } from "~/lib/data-access";
import { Button } from "~/components/button";
import { FormMessage } from "~/components/form";
import Metatags from "~/components/metatags";
import { SelectTrigger } from "~/components/select";
import {
  useGetAuthedUserAccessLevelsQuery,
  useGetAuthedUserInfoQuery,
  useGetCountryCodesQuery,
  useGetSidebarItemsQuery,
  useLogoutMutation,
  useUpdateUserPhoneNumberMutation,
  useUploadUserImageMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAuthGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";
import { updateUserPhoneNumberValidator } from "~/lib/validators";
import Dialog from "./_components/dashboard-dialog";
import { FormItem, FormLabel } from "./_components/dashboard-form";
import { Input } from "./_components/dashboard-input";

const NAV = [
  {
    Icon: HandCoins,
    i18nTitleKey: "dashboard.layout.nav.wallet-users",
    path: "/dashboard/wallet-users",
    moduleId: "walletUsers" satisfies ModuleId,
  },
  {
    Icon: Wallet,
    i18nTitleKey: "dashboard.layout.nav.wallet-management",
    path: "/dashboard/wallet-management",
    moduleId: "wallets" satisfies ModuleId,
  },
  {
    Icon: User,
    i18nTitleKey: "dashboard.layout.nav.service-providers",
    path: "/dashboard/service-providers",
    moduleId: "serviceProviders" satisfies ModuleId,
  },
  {
    Icon: Users,
    i18nTitleKey: "dashboard.layout.nav.users",
    path: "/dashboard/users",
    moduleId: "users" satisfies ModuleId,
  },
  {
    Icon: Activity,
    i18nTitleKey: "dashboard.layout.nav.reports",
    path: "/dashboard/reports",
    id: "reports",
    moduleId: "reports" satisfies ModuleId,
  },
  {
    Icon: SquareUserRound,
    i18nTitleKey: "dashboard.layout.nav.roles",
    path: "/dashboard/roles",
    moduleId: "roles" satisfies ModuleId,
  },
  {
    Icon: HeartPulse,
    i18nTitleKey: "dashboard.layout.nav.health",
    path: "/dashboard/health-check",
    moduleId: "healthCheck" satisfies ModuleId,
  },
  {
    Icon: Settings,
    i18nTitleKey: "dashboard.layout.nav.settings",
    path: "/dashboard/settings",
    moduleId: "settings" satisfies ModuleId,
  },
  {
    Icon: Activity,
    i18nTitleKey: "dashboard.layout.nav.reports",
    path: "/dashboard/reports",
    moduleId: "users" satisfies ModuleId,
  }
] as const;

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const loading = useAuthGuard();

  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  const { data: userData } = useGetAuthedUserInfoQuery(undefined);
  const { data: sidebarData } = useGetSidebarItemsQuery(undefined);

  const pathname = usePathname();
  const { values } = useI18n();
  const errors = useErrors();

  const { mutate } = useLogoutMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("email");
      window.location.href = "/login"; // not using nextjs router because it does not invalidate the login page cache and i need to force the user to login again
    },
  });

  if (loading || isLoading) return null;

  return (
    <main>
      <Metatags />

      <div className="grid max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden h-screen bg-black text-white md:block">
          <div className="flex h-full flex-col gap-2">
            <div className="flex h-24 items-center px-4">
              <Link href="/" className="flex items-center gap-2 font-normal">
                <Image
                  src="/logos/imagotype.png"
                  alt="Logo"
                  width={225}
                  height={52}
                />
              </Link>
            </div>
            <Separator className="ml-4 w-1/2" />
            <div className="flex-1 pt-5">
              <nav className="grid items-start gap-4 px-4">
                <Link
                  href="/dashboard"
                  className={cn(
                    "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                    "/dashboard" === pathname &&
                      "border-transparent bg-[#3678B1]",
                  )}
                >
                  <Home className="size-6" strokeWidth={0.75} />
                  {values["dashboard.layout.nav.home"]}
                </Link>
                {sidebarData?.map((sidebarItem) => {
                  if (!data?.general[sidebarItem.id]?.includes("view"))
                    return null;

                  const navItem = NAV.find(
                    (nav) => nav.moduleId === sidebarItem.id,
                  );

                  const Icon = navItem?.Icon ?? Loader;

                  return (
                    <Link
                      key={sidebarItem.id}
                      href={navItem?.path ?? "/dashboard"}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                        navItem?.path === pathname &&
                          "border-transparent bg-[#3678B1]",
                      )}
                    >
                      <Icon className="size-6" strokeWidth={0.75} />
                      {navItem
                        ? values[navItem.i18nTitleKey]
                        : sidebarItem.description}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <Separator className="ml-4 w-1/2" />
            <div className="px-7 py-4 pb-12">
              <div
                className="flex cursor-pointer flex-row items-center gap-3 text-xs font-light"
                onClick={() => void mutate(null)}
              >
                <LogOut className="size-6" strokeWidth={0.75} />
                {values["dashboard.layout.logout"]}
              </div>
            </div>
          </div>
        </div>
        <div className="flex max-h-screen flex-col">
          <header className="flex min-h-24 items-center gap-4 bg-black px-4 lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="shrink-0 border-none bg-transparent text-white md:hidden"
                >
                  <Menu className="h-8 w-8" strokeWidth={0.75} />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="flex flex-col bg-black text-white"
              >
                <nav className="grid gap-3 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 py-4 font-normal"
                  >
                    <Image
                      src="/logos/imagotype.png"
                      alt="Logo"
                      width={225}
                      height={52}
                    />
                  </Link>
                  <Link
                    href="/dashboard"
                    className={cn(
                      "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                      "/dashboard" === pathname &&
                        "border-transparent bg-[#3678B1]",
                    )}
                  >
                    <Home className="size-6" strokeWidth={0.75} />
                    {values["dashboard.layout.nav.home"]}
                  </Link>
                  {sidebarData?.map((sidebarItem) => {
                    if (!data?.general[sidebarItem.id]?.includes("view"))
                      return null;

                    const navItem = NAV.find(
                      (nav) => nav.moduleId === sidebarItem.id,
                    );

                    const Icon = navItem?.Icon ?? Loader;

                    return (
                      <Link
                        key={sidebarItem.id}
                        href={navItem?.path ?? "/dashboard"}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                          navItem?.path === pathname &&
                            "border-transparent bg-[#3678B1]",
                        )}
                      >
                        <Icon className="size-6" strokeWidth={0.75} />
                        {navItem
                          ? values[navItem.i18nTitleKey]
                          : sidebarItem.description}
                      </Link>
                    );
                  })}
                  <div className="px-3 py-12">
                    <div
                      onClick={() => void mutate(null)}
                      className="flex cursor-pointer flex-row items-center gap-3 text-xs font-light"
                    >
                      <LogOut className="size-6" strokeWidth={0.75} />
                      {values["dashboard.layout.logout"]}
                    </div>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1"></div>
            <ProfilePopover
              trigger={
                <Button className="rounded-full border-none bg-transparent">
                  <User strokeWidth={0.75} />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              }
              user={{
                name: userData
                  ? userData.firstName + " " + userData.lastName
                  : "",
                email: userData?.email ?? "",
                phone: userData?.phone ?? "",
                picture: userData?.picture,
                id: userData?.id ?? "",
              }}
            />
          </header>
          <div className="h-full px-4 pt-5">{props.children}</div>
        </div>
      </div>
    </main>
  );
}

interface DialogProps {
  trigger: React.ReactNode;
  user: {
    id: string;
    name: string;
    email: string;
    phone: string;
    picture?: string;
  };
}

function ProfileInfoDialog(props: DialogProps) {
  const errors = useErrors();
  const { values } = useI18n();
  const [isOpen, _, __, toggle] = useBooleanHandlers();
  const [isOpenPopover, ___, ____, togglePopover] = useBooleanHandlers();

  const { data: dataCountryCodes } = useGetCountryCodesQuery(undefined);

  const form = useForm({
    schema: updateUserPhoneNumberValidator,
    defaultValues: {
      phone: props.user.phone,
      userId: props.user.id,
    },
  });

  const { mutate: updatePhone, isPending: isUpdatingPhone } =
    useUpdateUserPhoneNumberMutation({
      onSuccess: () => {
        toast.success(
          values["dashboard.layout.profile-dialog.my-info.toast.success"],
        );
        close();
      },
      onError: (error) => {
        toast.error(errors[error.message], {
          description: "Error code: " + error.message,
        });
      },
    });

  const { mutate: uploadImage, isPending: isUploadingImage } =
    useUploadUserImageMutation({
      onSuccess: () => {
        togglePopover();
      },
    });

  return (
    <Dialog
      isOpen={isOpen}
      toggleOpen={toggle}
      trigger={props.trigger}
      ariaDescribedBy="profile-info-dialog"
    >
      <div className="space-y-4 p-4 text-center">
        <h1 className="text-2xl">
          {values["dashboard.layout.profile-dialog.my-info.title"]}
        </h1>
        <div className="flex flex-col items-center">
          <Popover open={isOpenPopover} onOpenChange={togglePopover}>
            <PopoverTrigger>
              <Avatar className="size-16 rounded-xl">
                <AvatarImage src={props.user.picture} alt={props.user.name} />
                <AvatarFallback className="rounded-xl">
                  {props.user.name[0]}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="rounded-xl border border-black">
              <Label
                htmlFor="picture"
                className={cn(
                  "cursor-pointer items-center justify-center space-y-4",
                  isUploadingImage && "pointer-events-none",
                )}
              >
                <p className="text-center text-[#A1A1A1]">
                  {
                    values[
                      isUploadingImage
                        ? "loading"
                        : "dashboard.layout.profile-dialog.my-info.picture.label"
                    ]
                  }
                </p>
                <div className="flex flex-row justify-center space-x-4">
                  <Upload strokeWidth={0.75} className="size-6 self-center" />
                  <Button
                    type="button"
                    className="pointer-events-none font-normal"
                  >
                    {
                      values[
                        "dashboard.layout.profile-dialog.my-info.picture.button"
                      ]
                    }
                  </Button>
                </div>
              </Label>
              <Input
                type="file"
                id="picture"
                disabled={isUploadingImage}
                name="picture"
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  const picture = e.target.files?.[0];
                  if (picture)
                    uploadImage({
                      picture,
                      userId: props.user.id,
                    });
                }}
                className="hidden"
              />
            </PopoverContent>
          </Popover>
          <p className="text-sm">{props.user.name}</p>
        </div>
        <div className="space-y-6 text-left">
          <div>
            <Label className="text-sm font-normal text-[#A1A1A1]">
              {values["dashboard.layout.profile-dialog.my-info.email.label"]}
            </Label>
            <Input disabled value={props.user.email} />
          </div>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit((data) => updatePhone(data))}
                className="space-y-9"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-normal">
                        {
                          values[
                            "dashboard.layout.profile-dialog.my-info.phone.label"
                          ]
                        }
                      </FormLabel>
                      <div className="flex flex-row items-center space-x-2">
                        <div>
                          <Select
                            onValueChange={(value) => {
                              field.onChange({
                                target: {
                                  value:
                                    value +
                                    "-" +
                                    (field.value.split("-")[1] ?? ""),
                                },
                              });
                            }}
                            defaultValue={field.value.split("-")[0]}
                          >
                            <SelectTrigger
                              className={cn(
                                "rounded-none border-transparent border-b-black",
                                !field.value.split("-")[0] && "text-[#A1A1A1]",
                              )}
                            >
                              <SelectValue className="h-full">
                                {field.value.split("-")[0]}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {!dataCountryCodes && (
                                <Loader2
                                  className="animate-spin"
                                  strokeWidth={0.75}
                                />
                              )}
                              {dataCountryCodes?.map((country) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.dial_code}
                                >
                                  {country.name} {country.dial_code}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex-1">
                          <Input
                            required
                            inputMode="numeric"
                            onChange={(e) => {
                              field.onChange({
                                target: {
                                  value:
                                    (field.value.split("-")[0] ?? "") +
                                    "-" +
                                    e.target.value,
                                },
                              });
                            }}
                            value={field.value.split("-")[1] ?? ""}
                          />
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="h-12 w-full"
                  type="submit"
                  disabled={isUpdatingPhone}
                >
                  {
                    values[
                      isUpdatingPhone
                        ? "loading"
                        : "dashboard.layout.profile-dialog.my-info.save"
                    ]
                  }
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

function ProfilePopover(props: DialogProps) {
  const { values } = useI18n();
  const errors = useErrors();
  const [isOpen, _, __, toggle] = useBooleanHandlers();

  const { mutate } = useLogoutMutation({
    onError: (error) => {
      toast.error(errors[error.message], {
        description: "Error code: " + error.message,
      });
    },
    onSuccess: () => {
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
      localStorage.removeItem("email");
      window.location.href = "/login"; // not using nextjs router because it does not invalidate the login page cache and i need to force the user to login again
    },
  });

  return (
    <Popover open={isOpen} onOpenChange={toggle}>
      <PopoverTrigger asChild>{props.trigger}</PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4">
          <ProfileInfoDialog
            trigger={
              <div className="flex cursor-pointer flex-row items-center space-x-2 border-b border-[#736E6E40] p-2">
                <User className="size-6" strokeWidth={0.75} />
                <p className="text-lg">
                  {values["dashboard.layout.profile-dialog.option.my-info"]}
                </p>
              </div>
            }
            user={props.user}
          />
          <Link
            href="/dashboard/change-password"
            onClick={toggle}
            className="flex cursor-pointer flex-row items-center space-x-2 border-b border-[#736E6E40] p-2"
          >
            <RectangleEllipsis className="size-6" strokeWidth={0.75} />
            <p className="text-lg">
              {values["dashboard.layout.profile-dialog.option.change-password"]}
            </p>
          </Link>
          <div
            className="flex cursor-pointer flex-row items-center space-x-2 border-b border-[#736E6E40] p-2"
            onClick={() => void mutate(null)}
          >
            <LogOut className="size-6" strokeWidth={0.75} />
            <p className="text-lg">
              {values["dashboard.layout.profile-dialog.option.logout"]}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
