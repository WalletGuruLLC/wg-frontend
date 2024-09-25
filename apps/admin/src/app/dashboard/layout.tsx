"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  LogOut,
  Menu,
  SquareUserRound,
  User,
  Users,
  Wallet,
} from "lucide-react";

import { cn } from "@wg-frontend/ui";
import { Button } from "@wg-frontend/ui/button";
import { Separator } from "@wg-frontend/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@wg-frontend/ui/sheet";
import { toast } from "@wg-frontend/ui/toast";

import type { ModuleId } from "~/lib/data-access";
import Metatags from "~/components/metatags";
import {
  useGetAuthedUserAccessLevelsQuery,
  useLogoutMutation,
} from "~/lib/data-access";
import { useErrors } from "~/lib/data-access/errors";
import { useAuthGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";

const NAV = [
  {
    Icon: Home,
    i18nTitleKey: "dashboard.layout.nav.home",
    path: "/dashboard",
    id: "home",
    moduleId: null,
  },
  {
    Icon: Wallet,
    i18nTitleKey: "dashboard.layout.nav.wallet-management",
    path: "/dashboard/wallet-management",
    id: "wallet-management",
    moduleId: "wallets" satisfies ModuleId,
  },
  {
    Icon: User,
    i18nTitleKey: "dashboard.layout.nav.service-providers",
    path: "/dashboard/service-providers",
    id: "service-providers",
    moduleId: "serviceProviders" satisfies ModuleId,
  },
  {
    Icon: Users,
    i18nTitleKey: "dashboard.layout.nav.users",
    path: "/dashboard/users",
    id: "users",
    moduleId: "users" satisfies ModuleId,
  },
  {
    Icon: SquareUserRound,
    i18nTitleKey: "dashboard.layout.nav.roles",
    path: "/dashboard/roles",
    id: "roles",
    moduleId: "roles" satisfies ModuleId,
  },
] as const;

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const loading = useAuthGuard();

  const { data, isLoading } = useGetAuthedUserAccessLevelsQuery(undefined);

  const pathname = usePathname();
  const router = useRouter();
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
      router.replace("/login");
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
            <div className="flex-1 pt-8">
              <nav className="grid items-start gap-4 px-4">
                {NAV.map((page) => {
                  if (
                    page.moduleId &&
                    !data?.general[page.moduleId].includes("view")
                  )
                    return null;
                  return (
                    <Link
                      key={page.id}
                      href={page.path}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                        page.path === pathname &&
                          "border-transparent bg-[#3678B1]",
                      )}
                    >
                      <page.Icon className="size-6" strokeWidth={0.75} />
                      {values[page.i18nTitleKey]}
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
                  size="icon"
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
                  {NAV.map((page) => {
                    if (
                      page.moduleId &&
                      !data?.general[page.moduleId].includes("view")
                    )
                      return null;
                    return (
                      <Link
                        key={page.id}
                        href={page.path}
                        className={cn(
                          "flex items-center gap-3 rounded-lg border border-white bg-transparent px-3 py-2 text-sm",
                          page.path === pathname &&
                            "border-transparent bg-[#3678B1]",
                        )}
                      >
                        <page.Icon className="size-6" strokeWidth={0.75} />
                        {values[page.i18nTitleKey]}
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
            <Button
              size="icon"
              className="rounded-full border-none bg-transparent"
            >
              <User strokeWidth={0.75} />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </header>
          <div className="h-full px-4 pt-8">{props.children}</div>
        </div>
      </div>
    </main>
  );
}
