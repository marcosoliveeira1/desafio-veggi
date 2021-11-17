import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { api } from "../services/api";

import { UserItem } from "../components/User/UserItem";
import { UserModal } from "../components/User/UserModal";
import { Loading } from "../components/Loading";
import { EmptyResult } from "../components/EmptyResult";

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
      const response = await api.get("/users");

      setUsers(response.data);
      setLoading(false);
    };
    fetchUsers();
  }, []);

  async function saveUser() {
    if(name.trim() === "") {
      alert("Por favor insira um nome")
      return;
    }
    setLoading(true);
    if (id !== "") {
      const response = await api.put(`/users/${id}`, { name });
      setUsers(users.map((user) => (user.id === id ? response.data : user)));
    } else {
      const response = await api.post("/users", { name });
      setUsers([...users, response.data]);
    }
    setName("");

    setModalIsOpen(false);
    setLoading(false);
  }

  async function deleteUser(user_id: string) {
    setLoading(true);
    const response = await api.delete(`users/${user_id}`);
    if (response.status === 204) {
      setUsers(users.filter((user) => user.id !== user_id));
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
          {!loading && !(users.length > 0) ? (
            <EmptyResult />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="sm-td">
                    #
                  </th>
                  <th scope="col">Nome</th>
                  <th scope="col" className="sm-td">
                    Opções
                  </th>
                </tr>
              </thead>
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

      <UserModal modalIsOpen={modalIsOpen} closeModal={closeModal} saveUser={saveUser} name={name} setName={setName} />
    </>
  );
};

export default Home;
