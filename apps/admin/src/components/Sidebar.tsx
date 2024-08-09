import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  LogOut as CiLogout,
  UserRoundCog,
  Wallet,
} from "lucide-react";

import { SidebarItem } from "./SidebarItem";

const menuitem = [
  {
    icon: <UserRoundCog size={30} />,
    title: "Users",
    path: "/users",
  },
  {
    icon: <Building2 size={30} />,
    title: "Service Providers",
    path: "/sp",
  },
  {
    icon: <Wallet size={30} />,
    title: "Wallets",
    path: "/wallets",
  },
];

export const Sidebar = () => {
  return (
    <aside className="fixed top-0 z-10 ml-[-100%] flex h-screen w-full flex-col justify-between border-r bg-white px-6 pb-3 transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="#" title="home">
            <Image
              src="/images/logo.png"
              className="mx-auto w-16"
              alt="Wallet Guru logo"
              width={50}
              height={50}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <span className="hidden text-gray-400 lg:block">Admin</span>
        </div>

        <ul className="mt-8 space-y-2 tracking-wide">
          {menuitem.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="-mx-6 flex items-center justify-between border-t px-6 pt-4">
        <Link
          href="/"
          className="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
        >
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </Link>
      </div>
    </aside>
  );
};
