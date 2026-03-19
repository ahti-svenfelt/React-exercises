import { useState } from "react";

export interface CardProps {
    name: string;
    role: string;
}

export default function TeamCard({ name, role }: CardProps) {
    const [votes, setVotes] = useState(0);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 w-64 flex flex-col items-center">
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-600 mb-4">{role}</p>

            <p className="text-lg font-medium mb-2">Votes: {votes}</p>

            <button onClick={() => setVotes(votes + 1)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Vote
                </button>
        </div>
    );
}