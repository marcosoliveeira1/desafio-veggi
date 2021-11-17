import { api } from "../../services/api";

type User = { id: string; name: string; };

export async function AddUser(user: Omit<User, 'id'>): Promise<User> {
    try {       
        const response = await api.post("/users", user);
        return response.data;
    } catch (err) {
        throw new Error("Erro ao inserir o usuário!");
    }
}