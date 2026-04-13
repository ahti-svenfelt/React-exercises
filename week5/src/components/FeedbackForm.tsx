import React, { useState} from "react";
import { sendFeedback } from "../services/api";

export default function FeedbackForm() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [responseId, setResponseId] = useState<number | null>(null);

    const submitFeedback = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        try {
            const data = await sendFeedback(title, message);
            setResponseId(data.id);
            setIsSubmitted(true);
            
        } catch (err) {
            console.error("Error submitting feedback:", err);
        }
    };

    if (isSubmitted) {
        return (
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border">
                <h2 className="text-xl font-bold mb-2 text-green-600">Thank you!</h2>
                <p>Your message was saved with ID: <strong>{responseId}</strong></p>
            </div>
        );
    }

    return (
        <form 
            onSubmit={submitFeedback}
            className="flex flex-col gap-4 bg-white p-8 rounded-xl shadow-lg border"
        >
            <h2 className="text-xl font-bold mb-2">Send Feedback</h2>
        
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border p-2 rounded"
                required
            />

            <textarea
                placeholder="Your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="border p-2 rounded h-32"
                required
            />

            <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded font-bold"
            >
                Submit
            </button>
        </form>
    );
}