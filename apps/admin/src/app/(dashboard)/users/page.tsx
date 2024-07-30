import { UsersGrid } from "~/users";
import type { User } from "~/users/interfaces/users";




export default function UsersPage() {
  
  const users: User[] = [
    {
      id: "123",
      name: "john",
      email: "john@mail.com",
      phone: "565",
      access: "admin"
    },
    {
      id: "1",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "123-456-7890",
      access: "admin"
    },
    {
      id: "2",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      phone: "987-654-3210",
      access: "user"
    },
    {
      id: "3",
      name: "Carol White",
      email: "carol.white@example.com",
      phone: "555-123-4567",
      access: "moderator"
    }
  ];


  return (
    <div>
      <UsersGrid users={users}/>
    </div>
  );
}
