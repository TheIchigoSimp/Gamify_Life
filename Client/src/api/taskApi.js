import axios from "axios";
import axiosClient from "./axiosClient";

export async function getTasks() {
    return axiosClient.get("/tasks");
}

export async function createTask(data) {
    return axiosClient.post("/tasks", data);
}

export async function updateTask(id, data) {
    return axiosClient.put(`/tasks/${id}`, data);
}

export async function deleteTask(id) {
    return axiosClient.delete(`/tasks/${id}`);
}

export async function toggleTaskCompletion(id) {
    return axiosClient.put(`/tasks/${id}/toggle`);
}