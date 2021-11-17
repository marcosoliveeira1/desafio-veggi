import { api } from "../../services/api";

type Task = {
    id: string;
    description: string;
    status: string;
    user_id: number;
};
export async function AddTask(user: Omit<Task, 'id'>): Promise<Task> {
    try {       
        const response = await api.post("/tasks", user);
        return response.data;
    } catch (err) {
        throw new Error("Erro ao inserir a tarefa!");
    }
}