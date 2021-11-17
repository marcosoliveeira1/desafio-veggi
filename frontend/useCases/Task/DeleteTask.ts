import { api } from "../../services/api";

export async function DeleteTask(id: string): Promise<number> {
    try {
        const response = await api.delete(`tasks/${id}`);
    return response.status;
    } catch (err) {
        throw new Error("Erro ao deletar a tarefa!");
    }
}