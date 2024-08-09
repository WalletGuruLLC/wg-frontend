"use client";

import Link from "next/link";
import { CirclePlus as CiAdd } from "lucide-react";

export const ServiceProvidersGrid = () => {
  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        <div className="... col-span-3"></div>
        <div className="...">
          <Link
            href="/sp/add"
            className="relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-950 to-cyan-400 px-3 py-2 text-white"
          >
            <CiAdd />
            <span className="group-hover:text-white-700">
              Add new Service Provider
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
