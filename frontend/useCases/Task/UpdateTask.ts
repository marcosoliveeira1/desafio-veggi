import { api } from "../../services/api";

type Task = {
    id: string;
    description: string;
    status: string;
    user_id: number;
};
export async function UpdateTask(id: string, task: Omit<Task, 'id'>): Promise<Task> {
    try {
        const response = await api.put(`/tasks/${id}`, task);
        return response.data;
    } catch (err) {
        throw new Error("Erro ao atualizar a tarefa!");
    }
}