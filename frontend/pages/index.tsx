import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";


import { UserItem, UserForm } from "../components/User";
import { Loading } from "../components/Loading";
import { EmptyResult } from "../components/EmptyResult";
import { GetAllUsers, AddUser, UpdateUser, DeleteUser } from "../useCases/User";
import { TableHead } from "../components/TableHead";

type User = { id: string; name: string };

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const userList = await GetAllUsers();
        setUsers(userList);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  async function saveUser() {
    if (name.trim() === "") {
      alert("Por favor insira um nome");
      return;
    }
    setLoading(true);
    try {
      if (id !== "") {
        const updatedUser = await UpdateUser(id, { name });
        setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
      } else {
        const newUser = await AddUser({ name });
        setUsers([...users, newUser]);
      }
    } catch (error: any) {
      alert(`${error.message} Tente novamente mais tarde`);
    }
    setName("");
    setId("");
    setModalIsOpen(false);
    setLoading(false);
  }

  async function deleteUser(user_id: string) {
    setLoading(true);
    try {
      const statusCode = await DeleteUser(user_id);
      if (statusCode === 204) {
        setUsers(users.filter((user) => user.id !== user_id));
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
    setName("");
    setModalIsOpen(false);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between border-bottom pb-2">
          <h3>Usuários</h3>
          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => openModal()}>
            Adicionar usuário
          </button>
        </div>
        <div>
          {!loading && users && !(users.length > 0) ? (
            <EmptyResult />
          ) : (
            <table className="table">
              <TableHead
                items={[
                  { content: "#", className: "sm-td" },
                  { content: "Nome", className: "" },
                  { content: "Opções", className: "sm-td" },
                ]}
              />
              <tbody>
                {users &&
                  users.map((user) => {
                    return (
                      <UserItem
                        key={user.id}
                        user={user}
                        deleteUser={deleteUser}
                        openModal={openModal}
                        setName={setName}
                        setId={setId}
                      />
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        { Modal.setAppElement("#modal-root") }
        <UserForm closeModal={closeModal} saveUser={saveUser} name={name} setName={setName} />
      </Modal>
    </>
  );
};

export default Home;
