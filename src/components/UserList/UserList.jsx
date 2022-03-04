import { User } from '../User/User.jsx'

export const UserList = ({ users }) => {
  return (
    <ul>
      {users.length &&
        users.map((u) => {
          return <User user={u} key={u.id} />
        })}
    </ul>
  )
}
