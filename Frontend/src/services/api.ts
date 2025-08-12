import axios from "axios";

const getUsersApi = () => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.get(url);
};
const createUserApi = (name: string, email: string) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/users`;
    return axios.post(url, { name, email });
};
export { getUsersApi, createUserApi };
