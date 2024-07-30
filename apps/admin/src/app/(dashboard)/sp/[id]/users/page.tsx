"use client";

import { UsersGrid } from "~/users";
import type { User } from "~/users/interfaces/users";


export default function ServiceProvidersUsersPage() {
    const users: User[] = [
      {
        id: "123",
        name: "Andrew",
        email: "andrew@mail.com",
        phone: "45687453",
        access: "admin"
      },
      {
        id: "12434434",
        name: "Tom Johnson",
        email: "tom.johnson@example.com",
        phone: "123-456-7890",
        access: "admin"
      },
      {
        id: "2",
        name: "Mia Smith",
        email: "mia.smith@example.com",
        phone: "987-654-3210",
        access: "admin"
      },
      {
        id: "3",
        name: "Isabella White",
        email: "isabella.white@example.com",
        phone: "555-123-4567",
        access: "admin"
      }
    ];
  
  
    return (
      <div>
        <UsersGrid users={users}/>
      </div>
    );
}