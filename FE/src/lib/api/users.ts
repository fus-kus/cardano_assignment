import { User, UserSchema } from "@/DTOs/user";
import axios from "axios";
import { z } from "zod";

const BASE_URL = "http://localhost:8000"; // This would obviously not be hardcoded...

export const fetchUsers = (): Promise<User[]> => {
  return axios
    .get(`${BASE_URL}/users/`)
    .then((response) => z.array(UserSchema).parse(response.data));
};

export const fetchUser = (id: string): Promise<User> => {
  return axios
    .get(`${BASE_URL}/users/${id}`)
    .then((response) => UserSchema.parse(response.data));
};

export const createUser = (User: Omit<User, "id">): Promise<User> => {
  return axios
    .post(`${BASE_URL}/users/add/`, User)
    .then((response) => UserSchema.parse(response.data));
};

export const updateUser = async (
  id: string,
  User: Omit<User, "id">
): Promise<User> => {
  return axios
    .put(`${BASE_URL}/users/update/${id}`, User)
    .then((response) => UserSchema.parse(response.data));
};

export const deleteUser = async (id: string): Promise<User> => {
  return axios
    .delete(`${BASE_URL}/users/delete/${id}`)
    .then((response) => UserSchema.parse(response.data));
};
