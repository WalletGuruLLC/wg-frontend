"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LogOut, Menu, User, Users, Wallet } from "lucide-react";

import { useQueryClient } from "@wg-frontend/data-access";
import { cn } from "@wg-frontend/ui";
import { Button } from "@wg-frontend/ui/button";
import { Separator } from "@wg-frontend/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@wg-frontend/ui/sheet";

import Metatags from "~/components/metatags";
import { useAuthGuard } from "~/lib/hooks";
import { useI18n } from "~/lib/i18n";

const NAV = [
  {
    Icon: Home,
    i18nTitleKey: "dashboard.layout.nav.home",
    path: "/dashboard",
    id: "home",
  },
  {
    Icon: Wallet,
    i18nTitleKey: "dashboard.layout.nav.wallet-management",
    path: "/dashboard/wallet-management",
    id: "wallet-management",
  },
  {
    Icon: User,
    i18nTitleKey: "dashboard.layout.nav.service-providers",
    path: "/dashboard/service-providers",
    id: "service-providers",
  },
  {
    Icon: Users,
    i18nTitleKey: "dashboard.layout.nav.users",
    path: "/dashboard/users",
    id: "users",
  },
  {
    Icon: Users,
    i18nTitleKey: "dashboard.layout.nav.roles",
    path: "/dashboard/roles",
    id: "roles",
  },
] as const;

export default function DashboardLayout(props: { children: React.ReactNode }) {
  const cq = useQueryClient();
  const loading = useAuthGuard();

  const pathname = usePathname();
  const { values } = useI18n();

  if (loading) return null;

  return (
    <main>
      <Metatags />

      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden bg-black text-white md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-24 items-center px-4">
              <Link href="/" className="flex items-center gap-2 font-semibold">
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
                {NAV.map((page) => (
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
                ))}
              </nav>
            </div>
            <Separator className="ml-4 w-1/2" />
            <div className="px-7 py-4 pb-12">
              <Link
                href="login"
                className="flex flex-row items-center gap-3 text-xs font-light"
                onClick={() => {
                  localStorage.removeItem("access-token");
                  void cq.invalidateQueries({
                    queryKey: ["authed-user-info"],
                  });
                }}
              >
                <LogOut className="size-6" strokeWidth={0.75} />
                {values["dashboard.layout.logout"]}
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-24 items-center gap-4 bg-black px-4 lg:px-6">
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
                    className="flex items-center gap-2 py-4 font-semibold"
                  >
                    <Image
                      src="/logos/imagotype.png"
                      alt="Logo"
                      width={225}
                      height={52}
                    />
                  </Link>
                  {NAV.map((page) => (
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
                  ))}
                  <div className="px-3 py-12">
                    <Link
                      href="/login"
                      onClick={() => {
                        localStorage.removeItem("access-token");
                        void cq.invalidateQueries({
                          queryKey: ["authed-user-info"],
                        });
                      }}
                      className="flex flex-row items-center gap-3 text-xs font-light"
                    >
                      <LogOut className="size-6" strokeWidth={0.75} />
                      {values["dashboard.layout.logout"]}
                    </Link>
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
          {props.children}
        </div>
      </div>
    </main>
  );
}
