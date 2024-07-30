'use client';

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
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    User name
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Email
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Phone
                </th>
                <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                    Access
                </th>
            </tr>

        </thead>
        <tbody>
            {users.map((user) => (
                <tr
                    key={user.id}
                    className="border-gray-200 border-b"
                >
                    <td>
                        {user.name}
                    </td>
                    <td>
                        {user.email}
                    </td>
                    <td>
                        {user.phone}
                    </td>
                    <td>
                        {user.access}
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}
