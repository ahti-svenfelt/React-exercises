import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { addProduct } from "../services/adminApi";

export default function AdminDashboard() {
    const navigate = useNavigate();
    const token = useAuthStore((state) => state.token);

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState<number | ''>('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if(!token) {
            navigate('/login', { replace: true });
        }
    }, [token, navigate]);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if(!token) return;

        try {
            const product = await addProduct(title, Number(price), token);
            setSuccessMessage(`Product created! ID: ${product.id}`);
            setTitle('');
            setPrice('');
        } catch (err) {
            console.error(err);
            setSuccessMessage('Failed to create product.');
        }
    }

    return(
        <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-20 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium mb-1">Title</label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                </div>

                <div>
                    <label className="block font-medium mb-1">Price</label>
                    <input
                    type="number"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:ring focus:ring-blue-300"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Add Product
                </button>
                </form>

                {successMessage && (
                <p className="mt-4 text-green-600 font-semibold text-center">
                    {successMessage}
                </p>
                )}
            </div>
        </div>
    );
}