"use client";

import Link from "next/link";
import { CirclePlus as CiAdd } from "lucide-react";

import type { User } from "../interfaces/users";
import { UsersTable } from "./UsersTable";

interface Props {
  users?: User[];
}

export const UsersGrid = ({ users = [] }: Props) => {
  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        <div className="... col-span-4"></div>
        <div className="...">
          <Link
            href="/user/add"
            className="relative flex items-center space-x-4 rounded-xl bg-gradient-to-r from-blue-950 to-cyan-400 px-3 py-2 text-white"
          >
            <CiAdd />
            <span className="group-hover:text-white-700">Add new user</span>
          </Link>
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-2">
        <UsersTable users={users} />
      </div>
    </div>
  );
};
