import type { User } from "../interfaces/users"

interface Props {
    user: User;
}

export const UserItem = ({ user }: Props) => {
  return (
    <div>{user.name}</div>
  )
}
