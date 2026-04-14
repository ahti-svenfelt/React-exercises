import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/adminApi";
import { useAuthStore } from "../store/useAuthStore";

export default function AdminLogin() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setErrorMsg('');

        try {
            const data = await loginAdmin(username, password);
            login(data.token);
            navigate('/admin');
        } catch (err) {
            console.error(err);
            setErrorMsg('Incalid username or password');
        }
    }
    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Username</label>
                    <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>
                </form>

                {errorMsg && (
                <p className="mt-4 text-red-600 text-center font-semibold">{errorMsg}</p>
                )}
            </div>
        </div>
    );
}