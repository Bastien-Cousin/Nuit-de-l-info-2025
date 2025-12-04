import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const signup = async (data) => {
    const res = await axios.post(`${API_URL}/signup`, data);
    return res.data;
};

export const login = async (data) => {
    const res = await axios.post(`${API_URL}/login`, data);
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return res.data.user;
};

// --- Récupérer profil ---
export const getProfile = async () => {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
};

// --- Mettre à jour profil ---
export const updateProfile = async (data) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API_URL}/me`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
    localStorage.setItem("user", JSON.stringify(res.data)); // mettre à jour localStorage
    return res.data;
};