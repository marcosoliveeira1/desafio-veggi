import Link from "next/link";
import { BsUiChecks, BsFillGearFill, BsFillTrashFill } from "react-icons/bs";
import { api } from "../../services/api";
type Task = {
  id: string;
  description: string;
  status: string;
};
type TaskItemProps = {
  task: Task;
  openModal: () => void,
  setDescription: (description: string) => void,
  setStatus: (status: string) => void
  setId: (id: string) => void,
  deleteTasks: (task_id: string) => void;
};

export function TaskItem({ task, deleteTasks, setDescription, setStatus, setId, openModal} : TaskItemProps) {
  // async function deleteUser(user_id: string) {
  //   const { users, setUsers } = usersEffect;

  //   const response = await api.delete(`users/${user_id}`);
  //   if (response.status === 204) {
  //     setUsers(users.filter((user) => user.id !== user_id));
  //   }
  // }

  return (
    <tr>
      <th scope="row">{task.id}</th>
      <td>{task.description}</td>
      <td>{task.status}</td>
      <td>
        <BsFillTrashFill
          className="me-3"
          onClick={() => {
            if (window.confirm("Você realmente deseja apagar essa tarefa?")) {
              deleteTasks(task.id);
            }
          }}
        />
        <BsFillGearFill
          onClick={() => {
            setDescription(task.description);
            setStatus(task.status);
            setId(task.id);
            openModal();
          }}
        />
      </td>
    </tr>
  );
}
