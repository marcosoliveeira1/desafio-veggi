import Link from "next/link";
import { BsUiChecks, BsFillGearFill, BsFillTrashFill } from "react-icons/bs";

type User = { 
    id: string;
    name: string;
}
type UserProps = { 
    user: User,
    deleteUser: (user_id: string) => void,
    openModal: () => void,
    setName: (name: string) => void,
    setId: (id: string) => void,
};

export function UserItem({ user, deleteUser, openModal, setName, setId}: UserProps) {
  

  return (
    <tr>
      <th scope="row">{user.id}</th>
      <td>{user.name}</td>
      <td>
        <BsFillTrashFill
          className="me-3"
          onClick={() => {
            if (window.confirm("Você realmente deseja apagar esse usuário?")) {
              deleteUser(user.id);
            }
          }}
        />
        <BsFillGearFill
          className="me-3"
          onClick={() => {
            setId(user.id);
            setName(user.name);
            openModal();
          }}
        />
        <Link href={`user/${user.id}/tasks`}>
          <a>
            <BsUiChecks />
          </a>
        </Link>
      </td>
    </tr>
  );
}
