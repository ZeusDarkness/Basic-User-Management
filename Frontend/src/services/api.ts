/*
* Author: Hỏi Dân IT - @hoidanit   
* 
* This source code is developed for the course 
* "Java Spring RESTful APIs - Xây Dựng Backend với Spring Boot". 
* It is intended for educational purposes only. 
* Unauthorized distribution, reproduction, or modification is strictly prohibited. 
* 
* Copyright (c) 2025 Hỏi Dân IT. All Rights Reserved. 
*/

import axios from "axios";

const getUsersApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.get(url);
}

const createUserApi = (name: string, email: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.post(url, { name, email })
}

const updateUserApi = (id: number, name: string, email: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`;
    return axios.put(url, { id, name, email })
}

const deleteUserApi = (id: number) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users/${id}`;
    return axios.delete(url)
}

export {
    getUsersApi, createUserApi, updateUserApi, deleteUserApi
}