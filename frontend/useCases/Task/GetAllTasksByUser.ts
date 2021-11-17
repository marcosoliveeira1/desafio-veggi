import { api } from "../../services/api";

type Task = {
    id: string;
    description: string;
    status: string;
    user_id: number;
};

export async function GetAllTasksByUser(id: string): Promise<Task[]> {
    try {
        const response = await api.get(`user/${id}/tasks`);
        return response.data;
    } catch (err) {
        return [];
    }
}