import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";

import Modal from "react-modal";
import { TaskItem } from "../../../components/Task/TaskItem";
import { TaskModal } from "../../../components/Task/TaskModal";

import { Loading } from "../../../components/Loading";
import { EmptyResult } from "../../../components/EmptyResult";

type Tasks = {
  id: string;
  description: string;
  status: string;
  user_id: number;
};

const Tasks: NextPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      const response = await api.get(`user/${user_id}/tasks`);
      console.log("tasks", response.data);

      setTasks(response.data);
      setLoading(false);
    };
    fetchTasks();
  }, [user_id]);

  async function saveTask() {
    if(description.trim() === "") {
      alert("Por favor insira uma descrição")
      return;
    }
    setLoading(true);
    if (id !== "") {
      const response = await api.put(`/tasks/${id}`, { description, status, user_id });
      setTasks(tasks.map((task) => (task.id === id ? response.data : task)));
    } else {
      const response = await api.post("/tasks", { description, status, user_id });
      setTasks([...tasks, response.data]);
    }

    setDescription("");
    setStatus("pendente")
    setModalIsOpen(false);
    setLoading(false);
  }

  async function deleteTasks(task_id: string) {
    setLoading(true);
    const response = await api.delete(`tasks/${task_id}`);
    if (response.status === 204) {
      setTasks(tasks.filter((task) => task.id !== task_id));
    }
    setLoading(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  Modal.setAppElement("#modal-root");

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between border-bottom pb-2">
          <h3>Tarefas</h3>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => openModal()}>
            Adicionar tarefa
          </button>
        </div>
        <div>
          {!loading && !(tasks.length > 0) ? (
            <EmptyResult />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="sm-td">
                    #
                  </th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Status</th>
                  <th scope="col" className="sm-td">
                    Opções
                  </th>
                </tr>
              </thead>
              <tbody>
                {tasks &&
                  tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      setDescription={setDescription}
                      setStatus={setStatus}
                      setId={setId}
                      openModal={openModal}
                      deleteTasks={deleteTasks}
                    />
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <TaskModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        description={description}
        setDescription={setDescription}
        status={status}
        setStatus={setStatus}
        saveTask={saveTask}
      />
    </>
  );
};

export default Tasks;
