"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ icon, path, title }: Props) => {
  const pathName = usePathname();
  return (
    <li>
      <Link
        href={path}
        className={
          path == pathName
            ? "relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-950 to-cyan-400 px-4 py-3 text-white"
            : "group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
        }
      >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  );
};
