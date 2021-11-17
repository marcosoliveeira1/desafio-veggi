import { api } from "../../services/api";

type User = { id: string; name: string; };


export async function DeleteUser(id: string): Promise<number> {
    try {
        const response = await api.delete(`users/${id}`);
        return response.status;
    } catch (err) {
        throw new Error("Erro ao deletar o usuário!");
    }
}