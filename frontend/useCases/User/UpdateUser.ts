import { api } from "../../services/api";

type User = { id: string; name: string; };

export async function UpdateUser(id: string, user: Omit<User, 'id'>): Promise<User> {
    try {
        const response = await api.put(`/users/${id}`, user);
        return response.data;
    } catch (err) {
        throw new Error("Erro ao atualizar o usuário!");
    }
}