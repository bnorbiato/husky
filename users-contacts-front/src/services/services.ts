import api from "./api";
import IUserData from "../hooks/users";

export const getAllUsers = async () => {
    const response = await api.get<IUserData>(`users`);
    return response.data;
};

export const getUserById = async (id: string) => {
    const response = await api.get<IUserData>(`user/${id}`);
    return response.data;
};
