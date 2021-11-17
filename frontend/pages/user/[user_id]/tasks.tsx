import type { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import { TaskItem, TaskForm } from "../../../components/Task/";

import { Loading } from "../../../components/Loading";
import { EmptyResult } from "../../../components/EmptyResult";
import { AddTask, DeleteTask, GetAllTasksByUser, UpdateTask } from "../../../useCases/Task";
import { TableHead } from "../../../components/TableHead";

type TaskType = {
  id: string;
  description: string;
  status: string;
  user_id: number;
};

const Task: NextPage = () => {
  const router = useRouter();
  const { user_id } = router.query;
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pendente");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchTasks = async () => {
      const tasksList = await GetAllTasksByUser(`${user_id}`);
      setTasks(tasksList);
      setLoading(false);
    };
    fetchTasks();
  }, [user_id]);

  async function saveTask() {
    if (description.trim() === "") {
      alert("Por favor insira uma descrição");
      return;
    }
    setLoading(true);
    try {
      if (id !== "") {
        const updateTaks = await UpdateTask(id, { description, status, user_id: Number(user_id) });
        setTasks(tasks.map((task) => (task.id === id ? updateTaks : task)));
      } else {
        const newTask = await AddTask({ description, status, user_id: Number(user_id) });
        setTasks([...tasks, newTask]);
      }
    } catch (error: any) {
      alert(`${error.message} Tente novamente mais tarde`);
    }
    setId("");
    setDescription("");
    setStatus("pendente");
    setModalIsOpen(false);
    setLoading(false);
  }

  async function deleteTasks(task_id: string) {
    setLoading(true);
    try {
      const statusCode = await DeleteTask(task_id);
      if (statusCode === 204) {
        setTasks(tasks.filter((task) => task.id !== task_id));
      }
    } catch (error: any) {
      alert(`${error.message} Tente novamente mais tarde`);
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
              <TableHead
                items={[
                  { content: "#", className: "sm-td" },
                  { content: "Descrição", className: "" },
                  { content: "Status", className: "" },
                  { content: "Opções", className: "sm-td" },
                ]}
              />
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
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        {Modal.setAppElement("#modal-root")}
        <TaskForm
          closeModal={closeModal}
          description={description}
          setDescription={setDescription}
          status={status}
          setStatus={setStatus}
          saveTask={saveTask}
        />
      </Modal>
    </>
  );
};

export default Task;
