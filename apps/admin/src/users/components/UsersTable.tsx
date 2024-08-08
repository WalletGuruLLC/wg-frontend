"use client";

import type { User } from "../interfaces/users";

interface Props {
  users?: User[];
}

export const UsersTable = ({ users = [] }: Props) => {
  console.log(users);
  return (
    <table className="min-wfull">
      <thead className="bg-gray-200">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            User name
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Phone
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Access
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} className="border-b border-gray-200">
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
            <td>{user.access}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
