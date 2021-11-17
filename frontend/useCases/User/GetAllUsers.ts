import { api } from "../../services/api";

type User = { id: string; name: string };

export async function GetAllUsers(): Promise<User[]> {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (err) {
        return [];
    }
}